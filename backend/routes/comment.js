const express = require('express');
const mongoose = require('mongoose');
const Action = require('../models/action');
const Page = require('../models/page');
const PageSet = require('../models/page-set');
const Query = require('../models/query');
const ObjectId = require('mongoose');
const Comment = require('../models/comment');
const checkAuth = require('../middleware/check-auth');
const checkAuth2 = require('../middleware/check-auth-without-immediate-response');

const router = express.Router();

router.post('', checkAuth, (req, res, next) => {
  console.log( req.body );
  const newComment = new Comment({
    commentText: req.body.commentText,
    page: req.body.page,
    action: req.body.action,
    creator: req.userData.userId,
    date: req.body.date,
    params: req.body.params
  });
  newComment.save()
    .then (resultComment => {
      res.status(201).json({
        message: 'Comment was created successfully',
        query: resultComment
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Creating comment failed',
        error: error
      })
    });
});

router.get('/:pageId', checkAuth, (req, res, next) => {
  console.log( req.params );
  Comment.find( {page: req.params.pageId } )
    .then(comments => {
      console.log( comments );
      let message;
      if (comments.length === 0) {
        message = 'No comment were found'
      } else if (comments.length === 1) {
        message = 'One comment was found'
      } else {
        message = 'All comments were found'
      }
      res.status(200).json({
        message: message,
        comments: comments
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching queries failed',
        error: error
      })
    })
});

router.get('', checkAuth, (req, res, next) => {
  Comment.find(
    {
      creator: req.userData.userId
    })
    .then(comments => {
      console.log( comments );
      let message;
      if (comments.length === 0) {
        message = 'No comment were found'
      } else if (comments.length === 1) {
        message = 'One comment was found'
      } else {
        message = 'All comments were found'
      }
      res.status(200).json({
        message: message,
        comments: comments
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching queries failed',
        error: error
      })
    })
});

router.delete('/:id', checkAuth, (req, res, next) => {
  // Only deletes the query if it is not bound to a page
  Comment.deleteOne({
    _id: req.params.id
  })
    .then((deletedComment) => {
      if (deletedComment.n === 0) {
        return res.status(400).json({
          message: 'Comment cannot be deleted'
        });
      } else {
        res.status(200).json({
          message: 'Comment was deleted'
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Deleting comment failed',
        error: error
      })
    });
});

router.put('/:id', checkAuth, (req, res, next) => {
  Comment.update({ _id: req.params.id}, {
    commentText: req.body.updatedText
  }, {new:true})
    .then(updatedComment => {
      res.status(200).json({
        message: 'Comment was updated successfully',
        query: updatedComment
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Comment cannot be updated',
        error: error
      });
    })
});

module.exports = router;
