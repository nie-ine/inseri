const express = require('express');
let settings = require('../.settings/mailDetails');

const checkAuth = require("../middleware/check-auth");
let nodemailer = require('nodemailer');
const router = express.Router();


router.post('', checkAuth, (req, res, next) => {
    const transporter = nodemailer.createTransport({
        service: settings.type,
        auth: {
            user: settings.emailAdress, // Your email id
            pass: settings.pw // Your password
        }
    });

    const mailOptions = {
        from: req.userData.email, // sender address
        to: settings.recipient, // list of receivers
        subject: 'NIEOS Feedback / Question from ' + req.userData.email, // Subject line
        text: req.body.message
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.json({yo: 'error'});
        } else {
            console.log('Message sent: ' + info.response);
            res.json({yo: info.response});
        }
    });
});

module.exports = router;
