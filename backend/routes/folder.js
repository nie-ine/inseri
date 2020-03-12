const express = require('express');
const User = require('../models/user');
const checkAuth = require('../middleware/check-auth');
const PageSet = require('../models/page-set');
const Folder = require('../models/folder');
const router = express.Router();

//creating a new folder --> mainFolderId should be null if it is on the root folder otherwise it is the value of the Parent folder ID
router.post('/:mainFolderId',checkAuth, (req, res, next) => {
  console.log(req.body);
  console.log(req.params);
  let newFolder;
  Folder.find({title: req.body.title, owner:req.userData.userId})
    .then((result) => {
      // Checks if other owner has the same group name
      if (result.length > 0 && req.params.mainFolderId ==='-1'){
        return res.status(409).json({
          message: 'Folder already exists!'
        });
      }
      else if(req.params.mainFolderId !== '-1') {
        Folder.find({title: req.body.title, owner: req.userData.userId, hasParent: req.params.mainFolderId})
          .then((result) => {
            // Checks if other owner has the same group name
            if (result.length > 0) {
              return res.status(409).json({
                message: 'Subfolder already exists for the same main folder!'
              });
            }
          });
      }
      if(req.params.mainFolderId==='-1') {
        newFolder = new Folder({
        title: req.body.title,
        hasPageSets:[],
        owner: req.userData.userId
        });
      }
      else {
        newFolder = new Folder({
          title: req.body.title,
          hasPageSets:[],
          owner: req.userData.userId,
          hasParent: req.params.mainFolderId
        });
      }
      console.log(req.body.title);
      console.log(req.params.mainFolderId);
      newFolder.save()
        .then (resultQuery => {
          console.log(resultQuery);
            res.status(201).json({
              message: 'Folder was created successfully',
              query: resultQuery
            });
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({
            message: 'Creating Folder failed',
            error: error
          })
        });
    });
});

//Fetching all folders of a user, if the folder is in the root then the mainFolderId is -1
router.get('/:mainFolderId', checkAuth, (req, res, next) => {
  if(req.params.mainFolderId ==='-1'){
    Folder.find({owner: req.userData.userId, hasParent : { $exists: false }})
      .then(folders => {
        let message;
        if (folders.length === 0) {
          message = 'No folders were found'
        } else {
          message = 'All folders were found'
        }
        res.status(200).json({
          message: message,
          folders: folders
        });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Fetching all folders failed',
          error: error
        })
      })
  }
  else {
    Folder.find({owner: req.userData.userId, hasParent: req.params.mainFolderId})
      .then(folders => {
        let message;
        if (folders.length === 0) {
          message = 'No folders were found'
        } else {
          message = 'All folders were found'
        }
        res.status(200).json({
          message: message,
          folders: folders
        });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Fetching all folders failed',
          error: error
        })
      })
  }
});

router.post('/update/title/:folderId',checkAuth, (req, res, next) => {
  console.log(req.userData.userId);
  Folder.updateOne({$and:[
        {owner: req.userData.userId},
        {_id: req.params.folderId}
      ]},
    {$set: {title: req.body.title}})
    .then((updatedDocument) => {
      if (updatedDocument.n === 0) {
        res.status(400).json({
          message: 'Folder cannot be updated.'
        });
      } else {
        return res.status(200).json({
          message: 'Folder has been updated successfully',
          updatedDocument: updatedDocument
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Updating Folder failed.',
        error: error
      })
    });
});

router.post('/update/addPageSet/:folderId&:pageSetId',checkAuth, (req, res, next) => {
  Folder.updateOne({$and:[
        {owner:  req.userData.userId},
        {_id: req.params.folderId}
      ]},
    {$addToSet: {hasPageSets: req.params.pageSetId}})
    .then((updatedDocument) => {
      if (updatedDocument.n === 0) {
        res.status(400).json({
          message: 'Folder cannot be updated.'
        });
      } else {
        return res.status(200).json({
          message: 'Folder has been updated successfully',
          updatedDocument: updatedDocument
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Updating Folder failed.',
        error: error
      })
    });
});

router.post('/update/removePageSet/:folderId&:pageSetId',checkAuth, (req, res, next) => {
  Folder.updateOne({$and:[
        {owner: req.userData.userId},
        {_id: req.params.folderId}
      ]},
    {$pull: {hasPageSets: req.params.pageSetId}})
    .then((updatedDocument) => {
      if (updatedDocument.n === 0) {
        res.status(400).json({
          message: 'Folder cannot be updated.'
        });
      } else {
        return res.status(200).json({
          message: 'Folder has been updated successfully',
          updatedDocument: updatedDocument
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Updating Folder failed.',
        error: error
      })
    });
});

router.post('/delete/:folderId',checkAuth, (req, res, next) => {
  Folder.deleteOne({
    owner: req.userData.userId,
    _id: req.params.folderId
  })
    .then((deletedGroup) => {
      if (deletedGroup.n === 0) {
        return res.status(400).json({
          message: 'Folder cannot be deleted',
          deletedGroup:deletedGroup
        });
      } else {
        res.status(200).json({
          message: 'Folder has been deleted successfully.'
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Deleting Folder failed',
        error: error
      })
    });
});

module.exports = router;

