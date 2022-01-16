import express from 'express';
import Comment from '../models/comment';
import checkAuth from '../middleware/check-auth';
import checkAuth2 from '../middleware/check-auth-without-immediate-response';

const router = express.Router();

router.post('', checkAuth, (req, res, next) => {
  console.log( req.body );
  const newComment = new Comment({
    commentText: req.body.commentText,
    page: req.body.page,
    action: req.body.action,
    creator: req.userData.userId,
    date: req.body.date,
    params: req.body.params//,
    //creatorProfilePhotoUrl: req.body.creatorProfilePhotoUrl
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

router.get('/:pageId', checkAuth2, (req, res, next) => {
  console.log( req.params );
  Comment.find( {page: req.params.pageId } ).populate('creator')
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
      // console.log('comments of the page');
      // console.log(comments);
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
    }).populate('creator')
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
      // console.log('comments of the page');
      // console.log(comments);
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

export default router;
