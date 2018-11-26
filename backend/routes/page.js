const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Page = require('../models/page');
const PageSet = require('../models/page-set');

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

// Nur zum TESTEN
router.get('', checkAuth, (req, res, next) => {
  Page.find()
    .then(pages => {
      let message;
      if (pages.length === 0) {
        message = 'No pages were found'
      } else if (pages.length === 1) {
        message = 'One pages was found'
      } else {
        message = 'All pages were found'
      }
      res.status(200).json({
        message: message,
        pages: pages
      });
    });
});

router.get('/:id', checkAuth, (req, res, next) => {
    Page.findById(req.params.id)
      .then(result => {
        if (result) {
          res.status(200).json({
            message: 'Page was found',
            page: result
          });
        } else {
          res.status(404).json({
            message: 'Page was not found'
          });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: 'Fetching page failed',
          error: error
        })
      })
});

router.put('/:id', checkAuth, (req, res, next) => {
    Page.findByIdAndUpdate({_id: req.params.id}, {
        openApps: req.body.openApps
    }, {new:true})
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
});

module.exports = router;
