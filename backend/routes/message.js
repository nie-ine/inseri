const express = require('express');
var cors = require('cors');
let settings = require('../.settings/mailDetails');

const checkAuth = require('../middleware/check-auth');
let nodemailer = require('nodemailer');
const router = express.Router();


router.post('', cors(), checkAuth, (req, res, next) => {
    const transporter = nodemailer.createTransport({
        service: settings.type,
        auth: {
             pass: settings.pw // Your password
        }
    });

    let recipient = settings.recipient;

    if ( req.body.recipient ) {
      recipient = req.body.recipient;
    }

    const mailOptions = {
        from: req.userData.email, // sender address
        to: recipient, // list of receivers
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
