const express = require('express');

const User = require('../models/user');
const UserGroup=require('../models/userGroups');

const checkAuth = require('../middleware/check-auth');
const checkAuth2 = require('../middleware/check-auth-without-immediate-response');
//const generatedHash = require('../middleware/hash-generator');

const router = express.Router();

router.post('/creategroup', (req, res, next) => {
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


router.get('/:id/userGroups', checkAuth2, (req, res, next) => {
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
router.post('', (req, res, next) => {

  res.status(200).json({
    message: 'next step: create the first user group'
  });
});

module.exports = router;
