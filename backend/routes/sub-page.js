const express = require('express');
const Page = require('../models/page');
const SubPage=require('../models/sub-page');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();
//create sub-page
router.post('/New/:pageId',checkAuth, (req, res, next) => {
  const newSubPage = new SubPage({
    title: req.body.title,
    description: req.body.description
  });
  newSubPage.save()
    .then(resultQuery => {
      Page.update({_id: req.params.pageId}, { $push: { hasSubPages: resultQuery._id } })
        .then(updatedPage => {
          if (updatedPage.n > 0) {
            res.status(201).json({
              message: 'Sub-page was created successfully and linked to the page',
              subpage: newSubPage
            });
          } else {
            res.status(400).json({
              message: 'sub-page cannot be created'
            });
          }
        })
        .catch(errorUpdatePage => {
          res.status(500).json({
            message: 'Creating sub-page in page failed',
            error: errorUpdatePage
          });
        });
    })
    .catch(errorSubPage => {
      res.status(500).json({
        message: 'Creating sub-page failed',
        error: errorSubPage
      });
    });
});

//return subPage details'
router.get('/subPage/:subPageId', checkAuth, (req, res, next) => {

  SubPage.find({_id: req.params.subPageId})
    .then(subPages => {
      let message;
      if (subPages.length === 0) {
        message = 'No sub-page was found'
      } else {
        message = 'Sub-page details was found'
      }
      res.status(200).json({
        message: message,
        subPages: subPages
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Could not retrieve sub-page',
        error: error
      })
    })
});

/////return all subPages details' linked to a page
router.get('/sub-pages/:pageId', checkAuth, (req, res, next) => {
  Page.find({_id: req.params.pageId}, {_id: 0, hasSubPages: 1})
    .then(subPagesIds => {
      let message;
      if (subPagesIds.length === 0) {
        message = 'No sub-pages were found'
      } else {
        SubPage.find({_id: {$in: subPagesIds}})
          .then(subPagesDetails => {
            if (subPagesDetails.length === 0) {
              message = 'No sub-pages were found'
            } else {
              message = 'All sub-pages details were found.'
            }
            res.status(200).json({
              message: message,
              subPages: subPagesDetails
            });
          })
          .catch(error => {
            res.status(500).json({
              message: 'Could not retrieve sub-pages',
              error: error
            })
          });
      }
    }).catch(error => {
    res.status(500).json({
      message: 'Could not retrieve page',
      error: error
    })
  });
});

//delete sub-page
router.post('/:subPageId&:pageId',checkAuth, (req, res, next) => {
  SubPage.deleteOne({_id: req.params.subPageId})
    .then((deletedSubPage) => {
      if (deletedSubPage.n === 0) {
        return res.status(400).json({
          message: 'Sub-page cannot be deleted'
        });
      } else {
        Page.update({_id: req.params.pageId}, {$pull: {hasSubPages: req.params.subPageId}})
          .then((updatedPage) => {
            if(updatedPage.n !==0)
            res.status(200).json({
              message: 'Sub-page has been removed successfully from the page.'
            })
              .catch(error => {
                res.status(500).json({
                  message: 'Sub-page could not be removed from the page.',
                  error: error
                })
              });
          });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Deleting sub-page failed',
        error: error
      })
    });
  });

//updating sub-page details
router.post('/update/:subPageId',checkAuth, (req, res, next) => {
  SubPage.updateOne({_id: req.params.subPageId},
    {$set: {title: req.body.title, description: req.body.description}})
    .then(updateResult => {
      res.status(201).json({
        message: 'Sub-page updated',
        result: updateResult
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Error while updating the sub-page',
        error: error
      });
    })
});

