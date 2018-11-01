const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const PageSet = require('../models/page-set');
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post('', (req, res, next) => {
    console.log('Method: POST, Url: /pages');
    res.status(200).json({
      message: 'PageSet POST',
    });
  });

router.get('', (req, res, next) => {
  res.status(200).json({
      message: 'PageSet GET',
  });
});

router.get('/:hash', (req, res, next) => {
  res.status(200).json({
    message: 'PageSet GET ' + req.params.hash,
  });
});

router.put('/:id', (req, res, next) => {
  res.status(200).json({
    message: 'PageSet PUT ' + req.params.id,
  });
});

router.delete('/:id', (req, res, next) => {
  res.status(200).json({
      message: 'PageSet DELETE ' + req.params.id,
  });
});

module.exports = router;
