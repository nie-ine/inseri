import express from 'express';
import cors from 'cors';
const settings = require('../.settings/mailDetails');
import checkAuth from '../middleware/check-auth';
import nodemailer from 'nodemailer';
const router = express.Router();


router.post('', cors(), checkAuth, (req, res, next) => {
    const transporter = nodemailer.createTransport({
        // service: settings.type,
        // auth: {
        //      pass: settings.pw // Your password
        // }
      host: 'mailgateway.zhdk.cloud.switch.ch',
      port: 587
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

export default router;
