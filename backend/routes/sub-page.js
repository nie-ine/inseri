const express = require('express');
//const Page = require('../models/page');
const SubPage=require('../models/sub-page');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();
//create sub-page
router.post('/New/:pageId',checkAuth, (req, res, next) => {
  const newSubPage = new SubPage({
    title: req.body.title,
    description: req.body.description,
    page_id: req.params.page_Id
  });
  newSubPage.save()
    .then(resultQuery => {
      res.status(201).json({
        message: 'Sub-page successfully created.',
        query: resultQuery
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Creating sub-page failed',
        error: error
      })
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
        message: 'Could not retrieve sub-pages',
        error: error
      })
    })
});

/////return all subPages details linked to a page
router.get('/sub-pages/:pageId', checkAuth, (req, res, next) => {
  SubPage.find({page_id: req.params.pageId})
    .then(subPages => {
      let message;
      if (subPages.length === 0) {
        message = 'No sub-pages were found'
      } else {
        message = 'All sub-pages were found'
      }
      res.status(200).json({
        message: message,
        subPages: subPages
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Could not retrieve sub-pages',
        error: error
      })
    })
});
//delete sub-page
router.post('/:subPageId',checkAuth, (req, res, next) => {
  SubPage.deleteOne({
    _id: req.params.subPageId
  })
    .then((deletedSubPage) => {
      if (deletedSubPage.n === 0) {
        return res.status(400).json({
          message: 'Sub-page cannot be deleted'
        });
      } else {
        res.status(200).json({
          message: 'Sub-page has been deleted successfully.'
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

