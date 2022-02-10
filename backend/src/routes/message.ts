import express from 'express';
import cors from 'cors';
import checkAuth from '../middleware/check-auth';
import nodemailer from 'nodemailer';
const router = express.Router();
const {MAIL_EMAIL_ADDRESS, MAIL_PW, MAIL_RECIPIENT, MAIL_TYPE} = process.env;

router.post('', cors(), checkAuth, (req, res, next) => {
    const transporter = nodemailer.createTransport({
        // service: MAIL_TYPE,
        // auth: {
        //      pass: MAIL_PW // Your password
        // }
      host: 'mailgateway.zhdk.cloud.switch.ch',
      port: 587
    });

    let recipient = MAIL_RECIPIENT;

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
