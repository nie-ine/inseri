const express = require('express');
const User = require('../models/user');
const UserGroup=require('../models/userGroups');
const checkAuth = require('../middleware/check-auth');
const checkAuth2 = require('../middleware/check-auth-without-immediate-response');
//const generatedHash = require('../middleware/hash-generator');
const router = express.Router();
router.post('',checkAuth, (req, res, next) => {
  console.log(req.body);
  UserGroup.find({title: req.body.title, owner:req.userData.userId})
    .then((result) => {
      // Checks if other owner has the same group name
      if (result.length > 0) {
        return res.status(409).json({
          message: 'Group already exists!'
        });
      }
      const newGroup = new UserGroup({
        title: req.body.title,
        description: req.body.description,
        users:req.body.users,
        owner:req.userData.userId
      });
      newGroup.save()
        .then (resultQuery => {
          res.status(201).json({
            message: 'Group was created successfully',
            query: resultQuery
          });
        })
        .catch(error => {
          res.status(500).json({
            message: 'Creating group failed',
            error: error
          })
        });
    });
});
router.get('', checkAuth, (req, res, next) => {
  UserGroup.find({$or: [
      {owner: req.userData.userId},
      {owner: {$in: UserGroup.users}}
    ]
  })
    .then(groups => {
      let message;
      if (groups.length === 0) {
        message = 'No groups were found'
      } else {
        message = 'All groups were found'
      }
      res.status(200).json({
        message: message,
        groups: groups
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching all groups failed',
        error: error
      })
    })
});

router.post('/addMember', (req, res, next) => {
  console.log(req.body);

  User.findOne({email: req.body.memberToAdd})
    .then((result) => {
      let message;
      if (result.length === 0) {
        message = 'User not found'
        console.log(message);
      } else {
        message = 'User has been found'
        console.log(req.body.memberToAdd);
        UserGroup.update({_id: req.body.groupId}, {$push: {users: req.body.memberToAdd}})
          .then(result => {
            res.status(201).json({
              message: 'User group updated',
            });
          })
          .catch(error => {
            res.status(500).json({
              message: 'Error while updating the group',
              error: error
            });
          })
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Error while retrieving the user',
        error: error
      });
    });
});
router.get('/:title/listGroupMembers',checkAuth, (req, res, next) => {

  UserGroup.find({
      owner: req.userData.userId,
      title: req.params.title
    },
    {users: 1, _id: 0})
    .then(result => {
      let message;
      console.log(result);
      if (result.length === 0) {
        message = 'No members in the group yet.'
      } else {
        message = 'Group has members'

        res.status(200).json({
          message: message,
          result: result
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Retrieving all members failed',
        error: error
      })
    });
  });

router.post('/:memberToDelete',checkAuth, (req, res, next) => {

  UserGroup.find({
      owner: req.userData.userId,
      title: req.params.title,
      users: {$in: req.params.memberToDelete}
    },
    {_id: 1})
    .then(result => {
      let message;
      console.log(result);
      if (result.length === 0) {
        message = 'User is not one of the group members.'
      } else {
        message = 'User has been found.'
        UserGroup.update({_id: result._id}, {pull: {users: req.params.memberToDelete}})
          .then(updateResult => {
            res.status(201).json({
              message : 'User has been successfully removed from the group.'
            });
          })
          .catch(error => {
            res.status(500).json({
              message: 'Retrieving all members failed',
              error: error
            })
          });
      }
    }).catch(error => {
    res.status(500).json({
      message: 'Error while retrieving the user',
      error: error
    });
  });
});

module.exports = router;

