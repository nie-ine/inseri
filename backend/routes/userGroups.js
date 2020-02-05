const express = require('express');

const Action = require('../models/action');
const Page = require('../models/page');
const PageSet = require('../models/page-set');
const Query = require('../models/query');

const checkAuth = require('../middleware/check-auth');
const checkAuth2 = require('../middleware/check-auth-without-immediate-response');
const generatedHash = require('../middleware/hash-generator');

const router = express.Router();



router.post('', (req, res, next) => {

  res.status(200).json({
    message: 'next step: create the first user group'
  });

});

module.exports = router;
