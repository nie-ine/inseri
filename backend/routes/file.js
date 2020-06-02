const express = require("express");
const FileModel = require("../models/files");
const Folder = require("../models/folder");
const router = express.Router();
const multer = require("multer");
const checkAuth = require('../middleware/check-auth');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/files");
  },
  filename: (req, file, cb) => {
    //console.log(" storage file id "+ file._id);
    const name = file.originalname;//req.file._id+"_"
    //const normalizedName=name.toLowerCase().split(' '),
    let lastDotPos = file.originalname.lastIndexOf('.')
    const ext = file.originalname.substr(lastDotPos + 1, file.originalname.length - lastDotPos);//MIME_TYPE_MAP[file.originalname.mimeType];
    console.log("The expected filename form the multer package = " + Date.now() + "-" + name);
    cb(null, Date.now() + "-" + name);
  }
});

router.post('/singleFileUpload/:folderId', checkAuth, multer({storage: storage}).single("file"), (req, res, next) => { ///multer fn that expect a single file from the incoming req and will try to find an file property in the req body
  //console.log("printing the req filename "+req.body);
  const file = new FileModel({
    title: req.body.title,
    description: req.body.description,
    urlPath: req.protocol + "://" + req.get("host") + "/files/" + req.file.filename,
    owner: req.userData.userId
  });
  console.log( file );
  // console.log("Router post " + storage.getDestination + storage.getFilename());
  file.save().then(createdFile => {
    //console.log("post route" + file._id + " "+ storage.getFilename());
    console.log( 'here', req.userData.userId, req.params.folderId );
    Folder.updateOne({
        $and: [
          {owner: req.userData.userId},
          {_id: req.params.folderId}
        ]
      },
      {$addToSet: {hasFiles: createdFile._id}})
      .then((updatedDocument) => {
        console.log( updatedDocument );
        res.status(201).json({
          message: "File added successfully",
          file: {
            id: createdFile._id,
            title: createdFile.title,
            description: createdFile.description,
            urlPath: createdFile.urlPath
            // ...createdFile, // spread opr to copy all properties of an obj and add/override some selected properties
            // id: createdFile._id,
          }
        });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Updating Folder failed.',
          error: error
        })
      });
  })
    .catch(error => {
      res.status(500).json({
        message: 'Creating file failed',
        error: error
      })
    });
});

router.post('/files/:folderId', checkAuth,multer({ storage: storage }).array("file"),
  (req, res, next) => {
    console.log(req.files);
    const url = req.protocol + "://" + req.get("host");
    let filesArr = [];
    for (let i = 0; i < req.files.length; i++) {
      filesArr.push({
        title: req.files[i].originalname,
        description: req.body.description,
        urlPath: req.files[i].path,
        owner: req.userData.userId
      });
    }
    console.log(filesArr);
    FileModel.insertMany(filesArr, function (error, docs) {
      console.log("line 87"+docs);
      console.log(docs.map(file => {return file._id;}));
      Folder.updateOne({
          $and: [
            {owner: req.userData.userId},
            {_id: req.params.folderId}
          ]
        },
        {
          $addToSet: {
            hasFiles: docs.map(file => {
              return file._id;
            })
          }
        })
        .then((updatedDocument) => {
          console.log("line 103"+updatedDocument);
          res.status(201).json({
            message: "Files added successfully",
            file: docs
          });
        }).catch(error => {
        res.status(500).json({
          message: 'Updating Folder failed.',
          error: error
        })
      })
        .catch(error => {
          res.status(500).json({
            message: 'Creating file failed',
            error: error
          })
        });
    });
  });
router.post("/:id", checkAuth, (req, res, next) => {
  //let url = req.protocol + "://" + req.get("host")+"/";
  //url += "/files/" ;
  FileModel.updateOne({_id: req.params.id, owner: req.userData.userId},
    {$set: {title: req.body.title, description: req.body.description}})
    .then(result => {
      //const fileUploadedOn=req.body.oldFileName.substring(0,req.body.oldFileName.indexOf('-'));
      /*console.log(fileUploadedOn);
       fs.rename(url+req.body.oldFileName, url+fileUploadedOn+'-'+req.body.title, function (err) {
        if (err) throw err;
        console.log('File Renamed.');
      });*/
      console.log(result);
      console.log(req.params.id, req.body.title, req.body.description);
    res.status(200).json({
      message: "Update successful!",
      file:result
    });
  }).catch(error => {
    res.status(500).json({
      message: 'Updating File failed',
      error: error
    })
  });
});

router.get("/files/:folderId", checkAuth, (req, res, next) => {
  Folder.find({owner: req.userData.userId, _id: req.params.folderId}, {hasFiles: 1, _id: 0})
    .then(filesIds => {
      let message;
      if (filesIds.length === 0) {
        message = 'The Folder has no files'
        console.log(message);
      } else {
        message = 'All files were found'
        console.log(message + "-" + filesIds[0].hasFiles);
        FileModel.find({
          _id: {$in: filesIds[0].hasFiles}
        })
          .then(files => {
            let message;
            if (files.length === 0) {
              message = 'Files may be deleted accidentally';
              console.log(message);
            } else {
              message = 'Files have been found.'
              console.log(message);
              console.log(files);
              res.status(200).json({
                message: message,
                files: files
              });
            }
          })
          .catch(error => {
            res.status(500).json({
              message: 'Fetching Files failed',
              error: error
            })
          })
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Folder has no files',
        error: error
      })
    });
});

router.get("/:id", (req, res, next) => {
  FileModel.findById(req.params.id).then(file => {
    if (file) {
      res.status(200).json(file);
    } else {
      res.status(404).json({message: "file not found!"});
    }
  });
});

router.post("/deleteFiles/:fileId&:folderId", (req, res, next) => {
  FileModel.find({_id: req.params.fileId}).then(file => {
    console.log(req.params);
    console.log(file);
    /*if (file) {
      console.log("file. filePath =  " + file.urlPath);
      //console.log("new generated path ="+ req.protocol +"://"+req.get("host")+"/files/"+file.title);
      fs.unlink(file.urlPath, (err) => {
        if (err) console.log(err); else console.log("file deleted from the server successfully.");
      });*/
    FileModel.deleteOne({_id: req.params.fileId}).then(result => {
      console.log(result);
      Folder.updateOne({_id: req.params.folderId},
        {$pull: {hasFiles: req.params.fileId}})
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
    }).catch(error => {
      res.status(500).json({
        message: 'Deleting File failed.',
        error: error
      });
    });
    //}
  }).catch(error => {
    res.status(404).json({
      message: 'File not found',
      error: error
    });
  });
});
module.exports = router;
