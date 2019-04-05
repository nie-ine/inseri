const express = require('express');

const MyOwnJson = require('../models/myOwnJson');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/newJson', checkAuth, (req, res, next) => {
  console.log( 'Create New Json' );
  const myOwnJson = new MyOwnJson({
    creator: req.userData.userId
  });
  myOwnJson.save()
    .then(result => {
      res.status(201).json({
        message: 'myOwnJson was created',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    });
});

router.get('/getJson/:id', checkAuth, (req, res, next) => {
  console.log( 'Get my own Json' );
  MyOwnJson.findById(req.params.id)
    .then(result => {
      if (result) {
        res.status(200).json({
          message: 'MyOwnJson was found',
          result: result
        });
      } else {
        res.status(404).json({
          message: 'MyOwnJson was not found'
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching MyOwnJson failed',
        error: error
      })
    })
});

router.put('/updateJson/:id', checkAuth, (req, res, next) => {
  console.log( req.body );
  let keyValuesToUpdate = {};
  for ( key in req.body ) {
    if ( key !== '_id' && key !== 'creator' && key !== '__v' ) {
      console.log( key, req.body[key] );
      MyOwnJson.findByIdAndUpdate(
        {_id: req.body._id},
        {[key]: req.body[key]}
      );
    }
  }
  MyOwnJson.findById(req.params.id)
    .then(result => {
    if (result) {
      res.status(200).json({
        message: 'MyOwnJson was found',
        result: result
      });
    } else {
      res.status(404).json({
        message: 'MyOwnJson was not found'
      });
    }
  })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching MyOwnJson failed',
        error: error
      })
    })
});

module.exports = router;
