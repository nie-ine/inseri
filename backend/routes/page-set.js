const express = require('express');

const PageSet = require('../models/page-set');
const Page = require('../models/page');
const Query = require('../models/query');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();

// Nur zum TESTEN
router.get('', checkAuth, (req, res, next) => {
    PageSet.find()
        .then(pageSets => {
            let message;
            if (pageSets.length === 0) {
                message = 'No pagesets were found'
            } else if (pageSets.length === 1) {
                message = 'One pageset was found'
            } else {
                message = 'All pagesets were found'
            }
            res.status(200).json({
                message: message,
                pagesets: pageSets
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Fetching all pagesets failed',
                error: error
            })
        })
});

router.get('/:id', (req, res, next) => {
    PageSet.findById({_id: req.params.id})

        .then(pageSet => {
            if (pageSet) {
                res.status(200).json({
                    message: 'Pageset was found',
                    pageset: pageSet
                });
            } else {
                res.status(404).json({message: 'Pageset was not found'})
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Fetching pageset failed',
                error: error
            });
        });
});

router.put('/:id', checkAuth, (req, res, next) => {
    let messages = [];
    // Tests if title is undefined, null or is empty string
    if (!Boolean(req.body.title)) messages.push('Your title is invalid!');

    // Tests if description is undefined, null or is empty string
    if (!Boolean(req.body.description)) messages.push('Your description is invalid!');

    // Attaches error messages to the response
    if (messages.length > 0) return res.status(400).json({messages: messages});
    console.log( req.body );
    PageSet.findByIdAndUpdate({_id: req.params.id}, {
        title: req.body.title,
        description: req.body.description,
        linkToImage: req.body.linkToImage,
        hasPages: req.body.hasPages
    }, {new:true})
        .populate('hasPages')
        .then((resultPageSet) => {
            res.status(200).json({
                message: 'Pageset was updated successfully',
                pageset: resultPageSet
            });
        })
        .catch(error => {
            res.status(401).json({
                message: 'PageSet cannot be updated',
                error: error
            });
        });
});

router.post('/:id/pages', checkAuth, (req, res, next) => {
    let messages = [];
    // Tests if title is undefined, null or is empty string
    if (!Boolean(req.body.title)) messages.push('Your title is invalid!');

    // Tests if description is undefined, null or is empty string
    if (!Boolean(req.body.description)) messages.push('Your description is invalid!');

    // Attaches error messages to the response
    if (messages.length > 0) return res.status(400).json({messages: messages});
    PageSet.findById(req.params.id)
        .then(resultPageSet => {
            if (!resultPageSet) {
                return res.status(404).json({
                    message: 'Page set ID is not valid'
                });
            }

            const newPage = new Page({
                title: req.body.title,
                description: req.body.description,
                tiles: true,
                openApps: []
            });

            newPage.save()
                .then(newPageResult => {
                  console.log( resultPageSet );
                    PageSet.update({_id: resultPageSet._id}, { $push: { hasPages: newPageResult._id } })
                        .then(updatedPageSet => {
                            if (updatedPageSet.n > 0) {
                                res.status(201).json({
                                    message: 'Page in pageset was created successfully',
                                    page: newPage
                                });
                            } else {
                                res.status(400).json({
                                    message: 'Page cannot be created'
                                });
                            }
                        })
                        .catch(errorUpdatePageSet => {
                            res.status(500).json({
                                message: 'Creating page in pageset failed',
                                error: errorUpdatePageSet
                            });
                        });
                })
                .catch(errorPage => {
                    res.status(500).json({
                        message: 'Creating Page failed',
                        error: errorPage
                    });
                });
        })
        .catch(errorPageSet => {
            res.status(500).json({
                message: 'Fetching pageset failed',
                error: errorPageSet
            });
        });
});

router.put('/:id/pages/:pageID', checkAuth, (req, res, next) => {
    let messages = [];
    // Tests if title is undefined, null or is empty string
    if (!Boolean(req.body.title)) messages.push('Your title is invalid!');

    // Tests if description is undefined, null or is empty string
    if (!Boolean(req.body.description)) messages.push('Your description is invalid!');

    // Attaches error messages to the response
    if (messages.length > 0) return res.status(400).json({messages: messages});

    PageSet.findById({_id: req.params.id})
        .then(resultPageSet => {
            if (!resultPageSet) {
                return res.status(404).json({
                    message: 'Page set ID is not valid'
                });
            }

            if (resultPageSet.hasPages.filter(a => {return a._id == req.params.pageID}).length === 1) {
                Page.findByIdAndUpdate({_id: req.params.pageID}, {
                    title :req.body.title,
                    description: req.body.description
                },{new:true})
                    .then(resultPage => {
                        res.status(200).json({
                            message: 'Page was updated successfully',
                            page: resultPage
                        });
                    })
                    .catch(error => {
                        res.status(500).json({
                            message: 'Page cannot be updated',
                            error: error
                        });
                    });
            } else {
                res.status(404).json({
                    message: 'page was not listed in pageset'
                });
            }
        })
        .catch(error => {
            res.status(404).json({
                message: 'Fehler'
            })
        });
});

router.delete('/:pageSetID/pages/:pageID', checkAuth, (req, res, next) => {
    PageSet.findById(req.params.pageSetID)
        .then(resultPageSet => {
            if (!resultPageSet) {
                return res.status(404).json({
                    message: 'Page set ID is not valid'
                });
            }

            if (resultPageSet.hasPages.filter(a => {return a == req.params.pageID}).length === 1) {
                Page.findById({_id: req.params.pageID})
                    .then(result => {
                        // Updates the query so it will not be bound to a page
                        if (result.queries.length > 0) {
                            Query.updateMany({ _id: { $in: result.queries } }, { isBoundToPage: false})
                                .catch((error) => {
                                    console.log(error);
                                });
                        }

                        Page.deleteOne({_id: req.params.pageID})
                            .then((deletedPage) => {
                                if (deletedPage.n === 0) {
                                    return res.status(400).json({
                                        message: 'Page cannot be deleted'
                                    });
                                }

                                PageSet.update({_id: req.params.pageSetID}, {$pull: {hasPages:req.params.pageID}})
                                    .then(() => {
                                        res.status(200).json({
                                            message: 'Pageset updated successfully'
                                        });
                                    })
                                    .catch(error => {
                                        res.status(500).json({
                                            message: 'Updating pageSet failed',
                                            error: error
                                        });
                                    });
                            })
                            .catch(errorPage => {
                                res.status(500).json({
                                    message: 'Deleting page failed',
                                    error: errorPage
                                });
                            });
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(404).json({
                            message: 'queries not found'
                        });
                    });
            } else {
                res.status(404).json({
                    message: 'Page was not listed in pageset'
                });
            }
        })
        .catch(errorPageSet => {
            res.status(500).json({
                message: 'Fetching pageset failed',
                error: errorPageSet
            });
        });
});

module.exports = router;
