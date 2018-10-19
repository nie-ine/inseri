const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Action = require('../models/action');

const router = express.Router();

router.post('', (req, res, next) => {
  console.log('start action service in backend');
  const action = req.body;
  console.log(action);
  res.status(201).json({
    message: 'Action added successfully'
  });
});

module.exports = router;
