const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Action = require('../models/action');

const router = express.Router();

router.post('', (req, res, next) => {
  console.log('start action service in backend');
  const action = new Action({
    title: req.body.title,
    description: req.body.description
  });
  console.log(action);
  res.status(201).json({
    message: 'Action added successfully'
  });
});

module.exports = router;
