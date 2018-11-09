const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Action = require('../models/action');
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.put(
  '',
  checkAuth,
  (req, res, next) => {
    console.log( 'Action to be updated:' );
    console.log(req.body);
    Action.findOneAndUpdate({_id: req.body._id}, {
        hasPages: req.body.hasPages,
        hasPageSet: req.body.hasPageSet
      })
      .then((result) => {
        console.log( result );
        res.status(201).json({
          message: 'Action changed successfully',
          action: result
        });
      })
    .catch(error => {
      res.status(404).json({
        message: 'Action could not be changed'
      })
    })
  });

router.post(
  '',
  checkAuth,
  (req, res, next) => {
  const action = new Action({
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    creator: req.userData.userId
  });
  console.log(action);
  action.save();
  res.status(201).json({
    message: 'Action added successfully'
  });
});

router.get(
  '',
  checkAuth,
  (req, res, next) => {
  Action.find({
    creator: req.userData.userId
  })
    .then(documents => {
      console.log(documents);
      res.status(200).json({
        message: 'action returned in response',
        actions: documents
      });
    });
});

router.get('/:id', checkAuth, (req, res, next) => {
  Action.findById(req.params.id)
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: 'Action was found',
        action: result
      })
    })
    .catch(error => {
      res.status(404).json({
        message: 'Action was not found'
      })
    })
});

router.delete('/:id', (req, res, next) => {
  Action.deleteOne({
    _id: req.params.id
  })
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: 'Post deleted'
      });
    });

});

module.exports = router;
