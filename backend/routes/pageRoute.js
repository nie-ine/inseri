const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Page = require('../models/pageMOdel');

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post(
  '',
  checkAuth,
  (req, res, next) => {
    console.log('Create new page');
    const page = new Page({
    });
    console.log(page);
    page.save();
    res.status(201).json({
      message: 'Page added successfully',
      page: page
    });
  });

module.exports = router;
