const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const PageSet = require('../models/page-set');
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post('', (req, res, next) => {
    console.log('Method: POST, Url: /pageset')
  });

router.get('', (req, res, next) => {
    console.log('Method: GET, Url: /pageset')
  });

router.delete('/:id', (req, res, next) => {
  console.log('Method: DELETE, Url: /pageset/id')
});

module.exports = router;
