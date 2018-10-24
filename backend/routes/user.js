const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const router = express.Router();

router.put('/:id', (req, res, next) => {
  console.log(req);
  User.findOneAndUpdate({_id: req.body.userId}, {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName})
    .then( (result) => {
      console.log(result);
      res.status(200).json({
        message: 'User updated'
      });
    }).catch(err => {
      res.status(500).json({
        error:err
      })
  });
});

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then( hash => {
      const user = new User({
        email: req.body.email,
        password: hash,
        lastName: req.body.lastName,
        firstName: req.body.firstName
      });
      user
        .save()
        .then(result => {
        res.status(201).json({
          message: 'User created',
          result: result
        });
      }).catch(err => {
        res.status(500).json({
        error: err
        })
      });
    });
});

router.post('/login', (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
  .then( user => {
    if (!user) {
      return res.status(401).json({
        message: 'Auth failed'
      })
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  })
    .then(result => {
      if(!result) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      const token = jwt.sign(
        {
          email: fetchedUser.email,
          userId: fetchedUser._id
        },
        'secret_that_should_be_longer',
        {
          expiresIn: '1h'
        });
      res.status(200).json({
        token: token,
        expiresIn: '3600',
        firstName: fetchedUser.firstName,
        userId: fetchedUser._id
      });
    })
    .catch(err =>{
      console.log(err);
      return res.status(401).json({
        message: 'Auth failed'
      });
    });
});

module.exports = router;
