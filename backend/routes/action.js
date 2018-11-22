const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Action = require('../models/action');
const Page = require('../models/page');
const PageSet = require('../models/page-set');
const checkAuth = require("../middleware/check-auth");
const generatedHash = require("../middleware/hash-generator");

const router = express.Router();

// Nur zum TESTEN
router.get('', checkAuth, (req, res, next) => {
  Action.find()
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
  Action.findById({_id:req.params.id})
    .populate('hasPage')
    .populate({
      path: 'hasPageSet',
      populate: {
        path: 'hasPages'
      }
    })
    .then(result => {
      if (result) {
        res.status(200).json({
          message: 'Action was found',
          action: result
        })
      } else {res.status(404).json({message: 'Action was not found'})}
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

    const action = new Action({
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      creator: req.userData.userId,
      isFinished: false,
      deleted: false
    });

    if (req.body.type === 'page-set') {
      const defaultTitle = 'Example pageSet 00';
      const defaultDescription = 'Dies als Beispiel für eine PageSet bei NIE-OS';
      const defaultLinkToImage = 'https://c8.alamy.com/comp/DX9AP3/open-book-vintage-accessories-old-letters-pages-photo-frames-glasses-DX9AP3.jpg';

      const newPageSet = new PageSet({
        title: defaultTitle,
        description: defaultDescription,
        linkToImage: defaultLinkToImage,
        hasPages: [],
        hash: generatedHash()
      });

      newPageSet.save()
        .then((resultPageSet) => {
          action.hasPageSet = resultPageSet._id;
          action.hasPage = null;
          action.save()
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
    } else if (req.body.type === 'page') {

      const defaultTitle = "Title for the new Page";
      const defaultDescription ="Description for the new Page";

      const newPage = new Page({
        title: defaultTitle,
        description: defaultDescription,
        openApps: []
      });

      newPage.save()
        .then(resultPage => {
          action.hasPage = resultPage._id;
          action.hasPageSet = null;
          action.save()
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

    Action.findByIdAndUpdate({_id: req.params.id}, {
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
        res.status(200).json({
          message: 'Action was updated successfully',
          action: resultAction
        });
      })
      .catch(error =>
        res.status(404).json({message: 'Action cannot be updated'})
      );
});

router.delete('/:id', checkAuth, (req, res, next) => {
  Action.findById({_id: req.params.id})
      .then((resultAction) => {
        if (resultAction.type === "page") {
          Page.deleteOne({_id: resultAction.hasPage})
            .then((deletedPage) => {
              if (deletedPage.n > 0) {
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
        } else if (resultAction.type === "page-set") {
          PageSet.findById(resultAction.hasPageSet._id)
            .then((resultPageSet) => {
              if (resultPageSet.hasPages.length !== 0) {
                const pageSize = resultPageSet.hasPages.length;
                Page.deleteMany({_id: {$in: resultPageSet.hasPages}})
                  .then(resultPages => {
                    console.log(resultPages);
                    if ((resultPages.n > 0) && (resultPages.n <= pageSize)) {
                      const p1 = PageSet.deleteOne({_id: resultPageSet._id});
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
                const p1 = PageSet.deleteOne({_id: resultPageSet._id});
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
            })
            .catch(error =>
              res.status(500).json({
                message: 'Cannot find pageset',
                error: error
              })
            );
        } else {
          res.status(400).json({message: 'Type is invalid'})
        }
      })
      .catch(error =>
        res.status(500).json({message: 'Fetching action failed'})
      );
});

module.exports = router;
