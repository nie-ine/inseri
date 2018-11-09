const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const PageSet = require('../models/page-set');
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post('', (req, res, next) => {
  const newPageSet = new PageSet({
    title: req.body.title,
    description: req.body.description,
    linkToImage: req.body.linkToImage,
    hasPages: req.body.hasPages,
    hash: req.body.hash
  });
  newPageSet.save(function(err,pageSet){
    const pageSetID = pageSet._id;
    PageSet.findById(pageSetID)
      .then(result => {
        res.status(201).json({
          message: 'PageSet added successfully',
          pageset: result
        });
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'PageSet couldn\'t be saved'
        });
      });
  });
});

router.get('/:id', (req, res, next) => {
  PageSet.findById(req.params.id)
    .then(pageSet => {
      console.log(pageSet);
      res.status(200).json({
        message: 'pageset returned in response',
        pageset: pageSet
      });
    });
});

router.put('/:id', (req, res, next) => {
  console.log(req.params.id);
  console.log(req.body);
  PageSet.findOneAndUpdate({_id: req.params.id},
    {
      title: req.body.title,
      description: req.body.description,
      linkToImage: req.body.linkToImage,
      hasPages: req.body.hasPages
    })
    .then(editedPageSet => {
      console.log(editedPageSet);
      res.status(200).json({
        message: 'PageSet PUT',
        pageset: req.body
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'PageSet couldn\'t be changed'
      });
    });

});

router.delete('/:id', (req, res, next) => {
  res.status(200).json({
      message: 'PageSet DELETE ' + req.params.id,
  });
});

module.exports = router;
