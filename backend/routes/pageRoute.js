const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Page = require('../models/pageMOdel');

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post(
  '',
  checkAuth,
  (req, res, next) => {
    if( req.body === undefined ) {
      const page = new Page({
      });
      page.save();
      res.status(201).json({
        message: 'Page added successfully',
        page: page
      });
    } else {
      console.log( req.body );
      const page = new Page({
        title: req.body.title,
        description: req.body.description
      });
      page.save();
      res.status(201).json({
        message: 'Page added successfully',
        page: page
      });
    }
  });

router.get(
  '/:id',
  checkAuth,
  (req, res, next) => {
    Page.findById(
      req.params.id
    )
      .then(documents => {
        console.log(documents);
        res.status(200).json({
          message: 'page returned in response',
          page: documents
        });
      });
  });

router.put(
  '',
  checkAuth,
  (req, res, next) => {
    console.log(req.body);
    Page.findOneAndUpdate({_id: req.body._id},
      {
        openApps: req.body.openApps
      })
      .then((result) => {
        console.log( result );
        res.status(201).json({
          message: 'Page changed successfully'
        });
      });
  });

module.exports = router;
