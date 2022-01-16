import express from 'express';
import checkAuth from '../middleware/check-auth';
import request from 'request';
const router = express.Router();

router.post('/:microserviceAddress', checkAuth, (req, res, next) => {

  request.post({ url: req.params.microserviceAddress, json: req.body }, (err, httpResponse, body) => {

    // console.log( httpResponse, err );

    if ( err ) {
      return res.status(500).json({
        output: 'microservice not executed - ' + err,
        error: err
      });
    }

    return res.status(200).json({
      message: 'Microservice executed successfully',
      output: body
    });

  });

});

export default router;
