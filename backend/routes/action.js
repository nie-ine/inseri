const express = require('express');

const Action = require('../models/action');
const Page = require('../models/page');
const PageSet = require('../models/page-set');
const Query = require('../models/query');

const checkAuth = require('../middleware/check-auth');
const generatedHash = require('../middleware/hash-generator');

const router = express.Router();

// Nur zum TESTEN
router.get('', checkAuth, (req, res, next) => {
    Action.find()
      .populate('creator')
        .then(actions => {
            let message;
            if (actions.length === 0) {
                message = 'No actions were found'
            } else if (actions.length === 1) {
                message = 'One action was found'
            } else {
                message = 'All actions were found'
            }
            res.status(200).json({
                message: message,
                actions: actions
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Fetching all actions failed',
                error: error
            })
        })
});

router.get('/:id', checkAuth, (req, res, next) => {
    // Authorisation (only if user is also the creator of the action)
    Action.find({_id:req.params.id, creator: req.userData.userId})
        .populate('hasPage')
        .populate({
            path: 'hasPageSet',
            populate: {
                path: 'hasPages'
            }
        })
        .then(result => {
            if (result.length === 1) {
                res.status(200).json({
                    message: 'Action was found',
                    action: result[0]
                })
            } else {
                res.status(404).json({message: 'Action was not found'})
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Fetching action failed',
                error: error
            })
        })
});

router.post('', checkAuth, (req, res, next) => {
    // Checks if type is valid
    if ((req.body.type !== 'page-set') && (req.body.type !== 'page')) {
        return res.status(400).json({
            message: 'Type is invalid'
        })
    }

    let messages = [];
    // Tests if title is undefined, null or is empty string
    if (!Boolean(req.body.title)) messages.push('Your title is invalid!');

    // Tests if description is undefined, null or is empty string
    if (!Boolean(req.body.description)) messages.push('Your description is invalid!');

    // Attaches error messages to the response
    if (messages.length > 0) return res.status(400).json({ messages: messages });

    const newAction = new Action({
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        creator: req.userData.userId,
        isFinished: false,
        deleted: false
    });

    // Case 1: action has a page set
    if (req.body.type === 'page-set') {
        // Default values for the pageset
        const defaultTitle = 'Example pageSet 00';
        const defaultDescription = 'Dies als Beispiel für eine PageSet bei NIE-OS';
        const defaultLinkToImage = '../../../../assets/img/pageset.png';

        const newPageSet = new PageSet({
            title: defaultTitle,
            description: defaultDescription,
            linkToImage: defaultLinkToImage,
            hasPages: [],
            hash: generatedHash()
        });

        newPageSet.save()
            .then((resultPageSet) => {
                newAction.hasPageSet = resultPageSet._id;
                newAction.hasPage = null;
                newAction.save()
                    .then((resultAction) => {
                        res.status(201).json({
                            message: 'Action with PageSet was created successfully',
                            action: resultAction
                        });
                    })
                    .catch(errorAction => {
                        newPageSet.findByIdAndRemove({_id: resultPageSet._id})
                            .then(() => {
                                res.status(500).json({
                                    message: 'Action cannot be created',
                                    error: errorAction
                                });
                            })
                            .catch(errorPageSet => {
                                res.status(500).json({
                                    message: 'Fatal error! Page set with ID: ' + resultPageSet._id + ' cannot be deleted',
                                    error: errorPageSet
                                });
                            })
                    })
            })
            .catch(error => {
                res.status(500).json({
                    message: 'Creating PageSet failed',
                    error: error
                });
            });

    // Case 2: action has a page
    } else if (req.body.type === 'page') {
        // Default values for the page
        const defaultTitle = 'Title for the new Page';
        const defaultDescription ='Description for the new Page';

        const newPage = new Page({
            title: defaultTitle,
            description: defaultDescription,
            openApps: []
        });

        newPage.save()
            .then(resultPage => {
                newAction.hasPage = resultPage._id;
                newAction.hasPageSet = null;
                newAction.save()
                    .then((resultAction) => {
                        res.status(201).json({
                            message: 'Action with Page was created successfully',
                            action: resultAction
                        });
                    })
                    .catch(errorAction => {
                        newPage.findByIdAndRemove({_id: resultPage._id})
                            .then(() => {
                                res.status(500).json({
                                    message: 'Action cannot be created',
                                    error: errorAction
                                });
                            })
                            .catch(error => {
                                res.status(500).json({
                                    message: 'Fatal error! Page with ID: ' + resultPage._id + ' cannot be deleted'
                                });
                            })
                    })
            })
            .catch(error => {
                res.status(500).json({
                    message: 'Creating Page failed',
                    error: error
                });
            });
    }
});

router.put('/:id', checkAuth, (req, res, next) => {
    let messages = [];
    // Tests if title is undefined, null or is empty string
    if (!Boolean(req.body.title)) messages.push('Your title is invalid!');

    // Tests if description is undefined, null or is empty string
    if (!Boolean(req.body.description)) messages.push('Your description is invalid!');

    // Attaches error messages to the response
    if (messages.length > 0) return res.status(400).json({messages: messages});

    // Updates action and returns the updated action
    Action.findOneAndUpdate({_id: req.params.id, creator: req.userData.userId}, {
        title: req.body.title,
        description: req.body.description
    },{new:true})
        .populate('hasPage')
        .populate({
            path: 'hasPageSet',
            populate: {
                path: 'hasPages'
            }
        })
        .then(resultAction => {
          if (resultAction) {
            res.status(200).json({
              message: 'Action was updated successfully',
              action: resultAction
            });
          } else {
            res.status(200).json({
              message: 'Action cannot be updated'
            });
          }
        })
        .catch(error =>
            res.status(404).json({message: 'Update action failed'})
        );
});

router.delete('/:id', checkAuth, (req, res, next) => {
    Action.findOne({_id: req.params.id, creator: req.userData.userId})
        .populate({
            path: 'hasPage',
            populate: {
                path: 'queries'
            }
        })
        .populate({
            path: 'hasPageSet',
            populate: {
                path: 'hasPages',
                populate: {
                    path: 'queries'
                }
            }
        })
        .then((resultAction) => {
            // Checks if action ID is valid
            if (!resultAction) {
                return res.status(404).json({
                    message: 'Action ID is not valid'
                });
            }

            // Case 1: action has a page
            if (resultAction.type === 'page') {

                // Updates the query so it will not be bound to a page
                if (resultAction.hasPage.queries.length > 0) {

                    // Array with all the queries in the page which belongs to the action
                    const allQueries = resultAction.hasPage.queries.map(query => query._id);

                    // Sets the queries to unbound
                    Query.updateMany({ _id: { $in: allQueries } }, { isBoundToPage: false})
                        .catch((error) => {
                            console.log(error);
                        });
                }

                // Deletes the page of the action
                Page.deleteOne({_id: resultAction.hasPage})
                    .then((deletedPage) => {
                        if (deletedPage.n > 0) {
                            // Deletes the action
                            Action.deleteOne({_id: resultAction._id})
                                .then(deletedAction => {
                                    if (deletedAction.n > 0) {
                                        res.status(200).json({message: 'Action deleted'})
                                    } else {
                                        res.status(404).json({message: 'Action cannot be deleted'})
                                    }
                                })
                                .catch(errorAction =>
                                    res.status(500).json({
                                        message: 'Deleting Action failed',
                                        error: errorAction
                                    })
                                );
                        } else {
                            res.status(404).json({message: 'Page cannot be deleted'})
                        }
                    })
                    .catch(errorPage => {
                        res.status(500).json({
                            message: 'Deleting Page failed',
                            error: errorPage
                        })
                    });

            // Case 2: action has a page set
            } else if (resultAction.type === 'page-set') {
                // Checks if pageset has any pages
                const amountPages = resultAction.hasPageSet.hasPages.length;
                if (amountPages !== 0) {

                    // Array with all the queries from all the pages in the pageset which belongs to the action
                    const allQueries = resultAction.hasPageSet.hasPages.reduce((accumulator, page) => accumulator.concat(page.queries.map(query => query.id)), []);

                    // Array with all the pages in the pageset which belongs to the action
                    const allPages = resultAction.hasPageSet.hasPages.map(page => page._id);

                    // Sets the queries to unbound
                    Query.updateMany({ _id: { $in: allQueries } }, { isBoundToPage: false})
                        .catch((error) => {
                            console.log(error);
                    });

                    // Deletes all the pages in the pageset
                    Page.deleteMany({_id: {$in: allPages}})
                        .then(resultPages => {
                            if ((resultPages.n > 0) && (resultPages.n <= amountPages)) {
                                // Deletes the pageset and the action
                                const p1 = PageSet.deleteOne({_id: resultAction.hasPageSet._id});
                                const p2 = Action.deleteOne({_id: resultAction._id});

                                Promise.all([p1, p2])
                                    .then((values) => {
                                        console.log(values);
                                        if ((values[0].n > 0) && (values[1].n > 0)) {
                                            res.status(200).json({message: 'Action, page set and pages were deleted'});
                                        } else {
                                            res.status(400).json({message : 'Action or/and page set can\'t be deleted'})
                                        }
                                    })
                                    .catch(error => {
                                        res.status(500).json({
                                            message: 'Deleting action, page set and pages failed',
                                            error: error
                                        })
                                    });
                            } else {
                                res.status(400).json({message: 'Pages can\'t be deleted'})
                            }
                        })
                        .catch(error => {
                            res.status(500).json({
                                message: 'Deleting action, page set and pages failed',
                                error: error
                            })
                        })
                } else {
                    // Deletes the pageset and the action
                    const p1 = PageSet.deleteOne({_id: resultAction.hasPageSet._id});
                    const p2 = Action.deleteOne({_id: resultAction._id});

                    Promise.all([p1, p2])
                        .then((values) => {
                            console.log(values);
                            if ((values[0].n > 0) && (values[1].n > 0)) {
                                res.status(200).json({message: 'Action and page set were deleted'});
                            } else {
                                res.status(400).json({message : 'Action or/and page set can\'t be deleted'})
                            }
                        })
                        .catch(error => {
                            res.status(500).json({
                                message: 'Deleting action and page set failed',
                                error: error
                            })
                        });
                }
            } else {
                res.status(400).json({message: 'Type is invalid'})
            }
        })
        .catch(error =>
            res.status(500).json({message: 'Fetching action failed'})
        );
});

module.exports = router;
