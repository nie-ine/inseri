const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var settings = require('../.settings/mailDetails');


const checkAuth = require("../middleware/check-auth");
var nodemailer = require('nodemailer');
const router = express.Router();


router.post(
  '',
  checkAuth,
  (req, res, next) => {
    console.log(req.body);
    console.log(req.userData);
    var transporter = nodemailer.createTransport({
      service: settings.type,
      auth: {
        user: settings.emailAdress, // Your email id
        pass: settings.pw // Your password
      }
    });
    var mailOptions = {
      from: req.userData.email, // sender address
      to: settings.recipient, // list of receivers
      subject: 'NIEOS Feedback / Question from ' + req.userData.email, // Subject line
      text: req.body.message
    };
    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        console.log(error);
        res.json({yo: 'error'});
      }else{
        console.log('Message sent: ' + info.response);
        res.json({yo: info.response});
      };
    });
  });

module.exports = router;
