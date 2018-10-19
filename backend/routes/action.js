const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Action = require('../models/action');

const router = express.Router();

router.post('', (req, res, next) => {
  console.log('start action service in backend');
  const action = new Action({
    title: req.body.title,
    description: req.body.description,
    type: req.body.type
  });
  console.log(action);
  action.save();
  res.status(201).json({
    message: 'Action added successfully'
  });
});

router.get('', (req, res, next) => {
  Action.find()
    .then(documents => {
      console.log(documents);
      res.status(200).json({
        message: 'action returned in response',
        actions: documents
      });
    });
});

module.exports = router;
