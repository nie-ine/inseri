const express = require("express");
const FileModel = require("../models/files");
const Folder = require("../models/folder");
const router = express.Router();
const multer = require("multer");
const checkAuth = require('../middleware/check-auth');
const Action = require("../models/action");
const PageSet = require("../models/page-set");
const Page = require("../models/page");
const Query = require("../models/query");
const SubPage = require("../models/sub-page");
let JSZip = require("jszip");
let FileSaver = require('file-saver');
const fs = require('fs');
let MyOwnJson = require("../models/myOwnJson");
let Comment=require("../models/comment");
const {ObjectId} = require('mongodb');

// let MyBlobBuilder = function () {
//   this.parts = [];
// }
//
// MyBlobBuilder.prototype.append = function (part) {
//   this.parts.push(part);
//   this.blob = undefined; // Invalidate the blob
// };
//
// MyBlobBuilder.prototype.getBlob = function () {
//   if (!this.blob) {
//     this.blob = new Blob(this.parts, {type: "text/plain"});
//   }
//   return this.blob;
// };


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

router.post('/uploadZipFile', multer({storage: storage}).single("zip"), (req, res, next) => {
  console.log(req.protocol + "://" + req.get("host") + "/files/" + req.file.filename);
  res.status(201).json({
    message: "File added successfully",
    fileUrlPath: req.protocol + "://" + req.get("host") + "/files/" + req.file.filename,
    fileName: req.file.filename,
    srvrPath: "./backend/files/" + req.file.filename
  });
});

router.post('/singleFileUpload/:folderId/:newFile', checkAuth, multer({storage: storage}).single("file"), (req, res, next) => { ///multer fn that expect a single file from the incoming req and will try to find an file property in the req body
  let file = {};
  console.log(req.body);
  console.log(req.params);
  console.log(req.file);
  if (req.params.newFile==='false') {
    file = new FileModel({
      title: req.body.title,
      description: req.body.description,
      urlPath: req.protocol + "://" + req.get("host") + "/files/" + req.file.filename,
      owner: req.userData.userId
    });
    console.log(file);
  } else {
    file = new FileModel({
      title: req.body.title,
      description: req.body.description,
      urlPath: req.protocol + "://" + req.get("host") + "/files/" + Date.now() + "-" + req.body.title,
      owner: req.userData.userId
    });
  }
  //console.log("printing the req filename "+req.body);
  // console.log("Router post " + storage.getDestination + storage.getFilename());
  file.save().then(createdFile => {
    //console.log("post route" + file._id + " "+ storage.getFilename());
    console.log(createdFile);
    console.log('here', req.userData.userId, req.params.folderId);
    Folder.updateOne({
        $and: [
          {owner: req.userData.userId},
          {_id: req.params.folderId}
        ]
      },
      {$addToSet: {hasFiles: createdFile._id}})
      .then((updatedDocument) => {
        console.log(updatedDocument);
        if (req.params.newFile==='true') {
          let urlPath='backend'+file.urlPath.substring(file.urlPath.indexOf('/files/'));
           //urlPath= req.protocol + "://" + req.get("host") + "/files/" + Date.now() + "-" + req.body.title+"backend/files/" + Date.now() + "-" + req.body.title;
          fs.writeFile(urlPath, req.body.content, function (err) {
            if (err) {
              console.log(err);
              res.status(500).json({
                message: 'Creating File on Server failed',
                error: error
              });
            }
            console.log('File Created');
            res.status(201).json({
              message: "File created successfully",
              file: {
                id: createdFile._id,
                title: createdFile.title,
                description: createdFile.description,
                urlPath: createdFile.urlPath
                // ...createdFile, // spread opr to copy all properties of an obj and add/override some selected properties
                // id: createdFile._id,
              }
            });
          });
        }
        else{
          console.log('File added');
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
        }
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

router.post('/files/:folderId', checkAuth, multer({storage: storage}).array("file"),
  (req, res, next) => {
    //console.log(req.files);
    const url = req.protocol + "://" + req.get("host");
    let filesArr = [];
    for (let i = 0; i < req.files.length; i++) {
      filesArr.push({
        title: req.files[i].originalname,
        description: req.body.description,
        urlPath: req.protocol + "://" + req.get("host") + "/files/" + req.files[i].filename,
        owner: req.userData.userId
      });
    }
    //console.log(filesArr);
    FileModel.insertMany(filesArr, function (error, docs) {
      console.log("line 87" + docs);
      console.log(docs.map(file => {
        return file._id;
      }));
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
          console.log("line 103" + updatedDocument);
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

router.get("/:id", (req, res, next) => {
  FileModel.findById(req.params.id).then(file => {
    if (file) {
      //console.log(file);
      //console.log(file.urlPath);
      let content='', path='backend'+file.urlPath.substring(file.urlPath.indexOf('/files/'));
      fs.readFile(path, function (err, data) {
        if (err) {
          console.log(err);
        } else {
          //console.log(data.toString());
          if(path.match(/.*\.(txt)|(py)|(json)$/)){
          content = data.toString();
          } else {
            content = '';
          }
        }
        res.status(200).json({_id: file._id, title: file.title, description: file.description, content: content, urlPath: file.urlPath});
      });

    } else {
      res.status(404).json({message: "file not found!"});
    }
  });
});

router.get("/getFileByUrl/:url", checkAuth, (req, res, next) => {
  // console.log( 'here' );
  FileModel.find({urlPath: req.params.url}).then(file => {
    if (file) {
      // console.log(file);
      res.status(200).json(
        {
          message: "file found",
          file: file[0]
      });
    } else {
      res.status(404).json({message: "file not found!"});
    }
  });
});

router.post("/:id", checkAuth, (req, res, next) => {
  //let url = req.protocol + "://" + req.get("host")+"/";
  //url += "/files/" ;
  //console.log(req.params.id);
  //console.log(req.body.urlPath);
  FileModel.updateOne({_id: req.params.id, owner: req.userData.userId},
    {$set: {title: req.body.title, description: req.body.description}})
    .then(result => {
      //console.log('printing the result '+result);
      //const fileUploadedOn=req.body.oldFileName.substring(0,req.body.oldFileName.indexOf('-'));
      /*console.log(fileUploadedOn);
       fs.rename(url+req.body.oldFileName, url+fileUploadedOn+'-'+req.body.title, function (err) {
        if (err) throw err;
        console.log('File Renamed.');
      });*/
      //console.log('starting writing to the file');
      let path= 'backend'+req.body.urlPath.substring(req.body.urlPath.indexOf('/files/'));
      //console.log(path);
      if(path.match(/.*\.(txt)|(py)|(json)$/)){
        fs.writeFile(path, req.body.content, function (err) {
          if (err) {
            console.log('printing the error:  '+err);
            res.status(500).json({
              message: 'Updating File content failed',
              error: err
            })
          }
          res.status(200).json({
            message: "Update successful!",
            file: result
          });
        });
      }
      // console.log(result);
      // console.log(req.params.id, req.body.title, req.body.description);
      // res.status(200).json({
      //   message: "Update successful!",
      //   file: result
      // });
    }).catch(error => {
      console.log('error while saving to db: '+ error);
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

function getComments(projectSpecific, objectId, returnedObj, res, req, queryIds) {
  if(projectSpecific){
      Comment.find({action: ObjectId(objectId)}).then(commentsResult =>{
        console.log(commentsResult);
        returnedObj.comments=JSON.stringify(commentsResult);
        getQueriesFromPages(queryIds, returnedObj, res,req);
      }).catch(commentsError=>{
        res.status(500).json({
          message: 'comments are not found',
          error: commentsError,
          returnedObj: returnedObj
        })
      });
  }
}

router.get("/downloadProject/:actionId", checkAuth, (req, res, next) => {
  let queryIds = [];
  let returnedObj={};
  Action.find({creator: req.userData.userId, _id: req.params.actionId})
    .populate('hasPage')
    .populate({
      path: 'hasPageSet',
      populate: {
        path: 'hasPages'
      }
    }).then(actionResults => {
    let message;
    let action = actionResults[0];
    if (actionResults.length === 0) {
      message = 'The action couldn\'t be found';
      console.log(message);
    } else {
      if (actionResults[0].hasPageSet.hasPages !== null && actionResults[0].hasPageSet.hasPages[0]._id) {
        action.hasPage = actionResults[0].hasPageSet.hasPages[0]._id;
        action.hasPageSet=actionResults[0].hasPageSet._id;
        returnedObj.action=JSON.stringify(action);
        PageSet.find({_id: action.hasPageSet}).then(pageSetResult => {
          let pageSet=JSON.stringify(pageSetResult[0]);
          if (pageSetResult.length === 0) {
            message = 'PageSet not found';
            console.log(message);
          } else {
            returnedObj.pageSet=pageSet;
            let pages=[];
            Page.find({_id: {$in: pageSetResult[0].hasPages}}).then(pagesResult => {
              for (let i = 0; i < pagesResult.length; i++) {
                pages.push(pagesResult[i]);
                if (pagesResult[i].queries.length != 0) {
                  pagesResult[i].queries.forEach(item => {queryIds.push(item)});
                }
              }
              returnedObj.pages=(JSON.stringify(pages));
              returnedObj.oldHostUrl=req.protocol+'://'+req.get('host');
              if (queryIds.length === 0) {
                return res.status(200).json({
                  message: 'Created Zip File successfully that has no queries',
                  returnedObj: returnedObj
                });
              }
              let projectSpecific=true, actionId=action._id;
              getComments(projectSpecific,actionId, returnedObj, res, req);
            }).catch(error => {
              console.log(error);
              res.status(500).json({
                message: 'Pages not found',
                error: error,
                returnedObj: returnedObj
              })
            })
          }
        })
          .catch(error => {
            res.status(500).json({
              message: 'PageSet not found',
              error: error,
              returnedObj: returnedObj
            })
          })
      }
    }
  })
    .catch(error => {
      res.status(500).json({
        message: 'Action not found',
        error: error,
        returnedObj: returnedObj
      })
    });
});

function getFoldersOfFiles(fileIds, returnedObj, res, req) {
  let returnedFolders=[];
  Folder.find({owner:req.userData.userId}).then(allFoldersForAUser=> {
    let newObjectFileIds=[];
    fileIds.forEach(item => {newObjectFileIds.push(ObjectId(item))});
    Folder.find({hasFiles: {$elemMatch: {$in: newObjectFileIds}}}).then(foldersThatContainReturnedFiles => {
      foldersThatContainReturnedFiles.forEach(folder => {
        returnedFolders.push(folder);
      });
      foldersThatContainReturnedFiles.forEach(
        itemFolder=>{
          getParents(itemFolder,allFoldersForAUser,returnedFolders );
        }
      );
      returnedObj.folders = JSON.stringify(returnedFolders);
      return res.status(200).json({
        message: 'Created Zip File successfully with folders',
        returnedObj: returnedObj
      });
    }).catch(error => {
      res.status(500).json({
        message: 'Folders That Contain Returned Files have errors',
        error: error,
        returnedObj: returnedObj
      })
    })
  }).catch(error =>{
      res.status(500).json({
        message: 'All Folders could not be found',
        error: error,
        returnedObj: returnedObj
      })
    })
}

function getParents(folder, foldersSearchSpace, returnTarget )
{
  let parentIndex=getParent(folder,foldersSearchSpace);
  if(parentIndex===-1) {
    return;
  }
  else
  {
    returnTarget.push(foldersSearchSpace[parentIndex]);
    getParents(foldersSearchSpace[parentIndex], foldersSearchSpace, returnTarget);
  }
}
function getParent(folder, foldersSearchSpace) {
  let i=-1;
  for(i=0;i<foldersSearchSpace.length;i++)
    {
      let item=foldersSearchSpace[i];
      if(!folder.hasParent) {
        i=-1;
        break;
      }
      if(item._id.toString()===folder.hasParent.toString()) {
        break;
      }
    }
  if(i==foldersSearchSpace.length)
    i=-1;
  return i;
}
function getFiles(arrayOfFilePaths, returnedObj, res, req) {
  let fileUrlPaths=[];
  arrayOfFilePaths.forEach(x=>{ x= x.substring(1).substring(0,x.length-2);
                                fileUrlPaths.push(x);});
  returnedObj.arrayOfFilePaths=arrayOfFilePaths;
  FileModel.find({urlPath: {$in: fileUrlPaths}}).then(filesResult => {
    let fileIds=[];
    filesResult.forEach(item => {fileIds.push(item._id)});
    returnedObj.files=JSON.stringify(filesResult);
    if(arrayOfFilePaths.length===0){
      return res.status(200).json({
        message: 'Created Zip File successfully that has no files',
        returnedObj: returnedObj
      });
    }
    getFoldersOfFiles(fileIds,returnedObj, res, req);
  }).catch(error => {
    res.status(500).json({
      message: 'MyOwnJson is not found',
      error: error,
      returnedObj: returnedObj
    })
  })
}

function getJsonIds(filesJsonIds, returnedObj, res, req) {
  let regexString = '"'+returnedObj.oldHostUrl+'/files/'+'[^"]+"';
  let regex= new RegExp(regexString,"g");
  MyOwnJson.find({_id: {$in: filesJsonIds}}).then(jsonResults => {
    returnedObj.jsonIds=JSON.stringify(jsonResults);
    let arrayOfFilePaths = returnedObj.jsonIds.match(regex);
    if (!arrayOfFilePaths || arrayOfFilePaths.length===0) {
      return res.status(200).json({
        message: 'Created Zip File successfully that has JSON results',
        returnedObj: returnedObj
      });
    }
      getFiles(arrayOfFilePaths, returnedObj,res,req);
  }).catch(error => {
    res.status(500).json({
      message: 'MyOwnJson is not found',
      error: error,
      returnedObj: returnedObj
    })
  })
}

function getQueriesFromPages(queryIds, returnedObj, res,req) {
  let queries=[];
  Query.find({_id: {$in: queryIds}}).then(queriesResult => {
    let filesJsonIds=[];
   // console.log(queriesResult);
    for (let i = 0; i < queriesResult.length; i++) {
      queries.push(queriesResult[i]);
      const path = returnedObj.oldHostUrl+'/api/myOwnJson/getJson/';

      ////{"content.info": {$regex: /http:\/\/localhost:3000\/.*/, $options: 'i'}}
      if(queriesResult[i].serverUrl.startsWith(path)){
        filesJsonIds.push( queriesResult[i].serverUrl.substring(path.length));
        //console.log(filesJsonIds);
      }
    }
    returnedObj.queries=JSON.stringify(queries);
    if (filesJsonIds.length === 0) {
      return res.status(200).json({
        message: 'Created Zip File successfully that has no files',
        returnedObj: returnedObj
      });
    }
    getJsonIds(filesJsonIds, returnedObj, res,req);
  }).catch(error => {
    res.status(500).json({
      message: 'Queries not found',
      error: error,
      returnedObj: returnedObj
    })
  })
}
router.get("/restoreFiles/", (req, res, next) => {
  fs.readdir('backend/files').then(filenames =>{
    return res.status(200).json({
      message: 'Files retuned ',
      files: filenames
    });
  }).catch(err=>{
    res.status(500).json({
      message: 'files not found',
      error: err
    })
  });
});

module.exports = router;
