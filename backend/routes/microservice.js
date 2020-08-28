const express = require('express');
const Comment = require('../models/comment');
const checkAuth = require('../middleware/check-auth');
const request = require('request');
const http = require('http')
const router = express.Router();

router.post('/:microserviceAddress', checkAuth, (req, res, next) => {

  request.post({ url: req.params.microserviceAddress, form: req.body }, (err, httpResponse, body) => {

    console.log( body );

    return res.status(200).json({
      message: 'Microservice executed successfully',
      output: body
    });

  });

});

module.exports = router;
