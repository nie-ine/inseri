const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Action = require('../models/action');
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

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
