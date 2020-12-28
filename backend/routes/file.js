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
let Comment = require("../models/comment");
const {ObjectId} = require('mongodb');
let actionRoute=require('../routes/action');

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


/**
 * Storage object to define the destination path and to generate the file name
 */
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

/**
 * To upload zipFile to the server, not used yet.
 */
router.post('/uploadZipFile', multer({storage: storage}).single("zip"), (req, res, next) => {
  console.log(req.protocol + "://" + req.get("host") + "/files/" + req.file.filename);
  res.status(201).json({
    message: "File added successfully",
    fileUrlPath: req.protocol + "://" + req.get("host") + "/files/" + req.file.filename,
    fileName: req.file.filename,
    srvrPath: "./backend/files/" + req.file.filename
  });
});

/**
 * To upload a single file
 */
router.post('/singleFileUpload/:folderId/:newFile', checkAuth, multer({storage: storage}).single("file"), (req, res, next) => { ///multer fn that expect a single file from the incoming req and will try to find an file property in the req body
  let file = {};
  console.log(req.body);
  console.log(req.params);
  console.log(req.file);
  if (req.params.newFile === 'false') {
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
        if (req.params.newFile === 'true') {
          let urlPath = 'backend' + file.urlPath.substring(file.urlPath.indexOf('/files/'));
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
        } else {
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

/**
 * To upload multiple files.
 */
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

/**
 * returns a file by ID
 */
router.get("/:id", (req, res, next) => {
  FileModel.findById(req.params.id).then(file => {
    if (file) {
      //console.log(file);
      //console.log(file.urlPath);
      let content = '', path = 'backend' + file.urlPath.substring(file.urlPath.indexOf('/files/'));
      fs.readFile(path, function (err, data) {
        if (err) {
          console.log(err);
        } else {
          //console.log(data.toString());
          if (path.match(/.*\.(txt)|(py)|(json)$/)) {
            content = data.toString();
          } else {
            content = '';
          }
        }
        res.status(200).json({
          _id: file._id,
          title: file.title,
          description: file.description,
          content: content,
          urlPath: file.urlPath
        });
      });

    } else {
      res.status(404).json({message: "file not found!"});
    }
  });
});

/**
 * returns a file by URL
 */
router.get("/getFileByUrl/:url", checkAuth, (req, res, next) => {

  console.log( req.params.url );

  FileModel.findOne({urlPath: req.params.url}).then(file => {
    if (file) {
      console.log('file:', file);
      res.status(200).json(
        {
          message: "file found",
          file: file
        });
    } else {
      res.status(404).json({message: "file not found!"});
    }
  });
});

/**
 * To update the file title or description using the file ID
 */
router.post("/:id", checkAuth, (req, res, next) => {
  FileModel.updateOne({_id: req.params.id, owner: req.userData.userId},
    {$set: {title: req.body.title, description: req.body.description}})
    .then(result => {
      let path = 'backend' + req.body.urlPath.substring(req.body.urlPath.indexOf('/files/'));
      if (path.match(/.*\.(txt)|(py)|(json)$/)) {
        fs.writeFile(path, req.body.content, function (err) {
          if (err) {
            console.log('printing the error:  ' + err);
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
    }).catch(error => {
    console.log('error while saving to db: ' + error);
    res.status(500).json({
      message: 'Updating File failed',
      error: error
    })
  });
});

/**
 * To get all the file in a specific folder, using the folder ID
 */
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

/**
 * To delete a file using the File ID. The folder ID is used to delete the file from the folder as well.
 */
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

/**
 * A helper function for the export project to get all the project's comments
 */
function getComments(projectSpecific, objectId, returnedObj, res, req, queryIds) {
  if (projectSpecific) {
    Comment.find({action: objectId}).then(commentsResult => {
      //console.log("comments results");
      //console.log(commentsResult);
      returnedObj.comments = JSON.stringify(commentsResult);
      getQueriesFromPages(queryIds, returnedObj, res, req);
    }).catch(commentsError => {
      res.status(500).json({
        message: 'comments are not found',
        error: commentsError,
        returnedObj: returnedObj
      })
    });
  }
}

/**
 * Export the project configuration file as a zip folder.
 */
router.get("/downloadProject/:actionId", checkAuth, (req, res, next) => {
  let queryIds = [];
  let returnedObj = {};
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
        action.hasPageSet = actionResults[0].hasPageSet._id;
        returnedObj.action = JSON.stringify(action);
        PageSet.find({_id: action.hasPageSet}).then(pageSetResult => {
          let pageSet = JSON.stringify(pageSetResult[0]);
          if (pageSetResult.length === 0) {
            message = 'PageSet not found';
            console.log(message);
          } else {
            returnedObj.pageSet = pageSet;
            let tempPages = [];
            Page.find({_id: {$in: pageSetResult[0].hasPages}}).then(async pagesResult => {
              console.log('printing parent pages');
              console.log(pagesResult);
              for (let i = 0; i < pagesResult.length; i++) {
                tempPages.push(pagesResult[i]);
                if(pagesResult[i].hasSubPages && pagesResult[i].hasSubPages.length!==0){
                  tempPages.push(await getHierarchyOfPages(pagesResult[i]));
                }
              }
              console.log('printing pages');
              console.log(tempPages);
              let pages = flatten(tempPages);
              for(let i=0;i<pages.length;i++){
                if (pages[i].queries.length != 0) {
                    pages[i].queries.forEach(item => {
                    queryIds.push(item);
                  });
                }
              }

              returnedObj.pages = (JSON.stringify(pages));
              returnedObj.oldHostUrl = req.protocol + '://' + req.get('host');
              if (queryIds.length === 0) {
                return res.status(200).json({
                  message: 'Created Zip File successfully that has no queries',
                  returnedObj: returnedObj
                });
              }
              let projectSpecific = true, actionId = action._id;
              getComments(projectSpecific, actionId, returnedObj, res, req, queryIds);
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

/**
 * A helper function to flat an array of arrays to a single dimensional array
 */
function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

/**
 * A recursive helper function to get all the subPages of a page. It is used in to download all the pages related to a project while exporting the project.
 */
async function getHierarchyOfPages(pageObj) {
  let page= await Page.findOne({_id: pageObj._id }).populate('hasSubPages');
  let subPagesOfSubPage=[];
  if(page) {
    console.log(page);
    if (page.hasSubPages && page.hasSubPages.length!==0) {
      let subPagesResult=page.hasSubPages;
      for(let i=0;i<subPagesResult.length; i++) {
        if(subPagesResult[i].hasSubPages && subPagesResult[i].hasSubPages.length!==0){
          subPagesOfSubPage.push( await getHierarchyOfPages(subPagesResult[i]));
        }
        subPagesOfSubPage.push(subPagesResult[i]);
      }
      return subPagesOfSubPage;
    } else {
      return subPagesOfSubPage;
    }
  }
}

/**
 * A helper function to get all folders that have the files associated in the queries URL or in the my Own json. It is used while exporting the project configuration files.
 */
async function getFoldersOfFiles(fileIds, folderIds, userId, returnedObj) {
  let returnedFolders = [];
  let promiseResult = '';
  try {
    let allFoldersForAUser = await Folder.find({owner: userId});
    let newObjectFileIds = [];
    if(fileIds && fileIds.length!=0){
      fileIds.forEach(item => {
        newObjectFileIds.push(ObjectId(item))
      });
    }

    let foldersWithFiles = await Folder.find({$or: [{hasFiles: {$elemMatch: {$in: newObjectFileIds}}}, {_id: {$in: folderIds}}]});
    if(foldersWithFiles && foldersWithFiles.length!=0 ){
      foldersWithFiles.forEach(folder => {
        let folderFound=false;
        if(returnedFolders && returnedFolders.length!=0){
          returnedFolders.forEach(item=>{
            if(item._id.toString()==folder._id.toString()){
              folderFound =true;
            }
          });
        }
        if(!folderFound){
          returnedFolders.push(folder);
        }
      });
    }
    for (let i = 0; i < foldersWithFiles.length; i++) {
      getParents(foldersWithFiles[i], allFoldersForAUser, returnedFolders);
    }
    for(let i=0; i< returnedFolders.length;i++){
      if(returnedFolders[i].hasFiles && returnedFolders[i].hasFiles.length!=0){
        console.log(returnedFolders[i].hasFiles);
        promiseResult += ' ' + await getFiles([], returnedFolders[i].hasFiles, returnedObj);
      }
    }
    if(returnedFolders && returnedFolders.length!=0 ) {
      returnedFolders.forEach(folder => {
        let folderFound = false;
        if (returnedObj.folders && returnedObj.folders.length != 0) {
          returnedObj.folders.forEach(item => {
            if (item._id.toString() == folder._id.toString()) {
              folderFound = true;
            }
          });
        }
        if (!folderFound || returnedObj.folders.length==0) {
          returnedObj.folders.push(folder);
        }
      });
    }
    return promiseResult + ' get Folders done';
  } catch (error) {
    console.log("All Folders could not be found " + error);
    return 'get Folders error ' + error.toString();
  }
}

/**
 * Returns the heirarchy of the parent folders
 * @param folder --> The folder to returns its parents
 * @param foldersSearchSpace --> All the folders that belongs to the current user. The folder search space
 * @param returnTarget --> The returned folders
 */
function getParents(folder, foldersSearchSpace, returnTarget) {
  let parentIndex = getParent(folder, foldersSearchSpace);
  if (parentIndex === -1) {
    return;
  } else {
      let folderFound=false;
    if(returnTarget && returnTarget.length!=0 ) {
      returnTarget.forEach(folder => {
        if (folder._id.toString() == foldersSearchSpace[parentIndex]._id.toString()) {
          folderFound = true;
        }
      });
      if (!folderFound) {
        returnTarget.push(foldersSearchSpace[parentIndex]);
        console.log("added "+ foldersSearchSpace[parentIndex]._id.toString()+" to the return Target");
      }
    }
    getParents(foldersSearchSpace[parentIndex], foldersSearchSpace, returnTarget);
  }
}

/**
 * A helper function to get the direct parent for a folder
 */
function getParent(folder, foldersSearchSpace) {
  let i = -1;
  for (i = 0; i < foldersSearchSpace.length; i++) {
    let item = foldersSearchSpace[i];
    if (!folder.hasParent) {
      i = -1;
      break;
    }
    if (item._id.toString() === folder.hasParent.toString()) {
      break;
    }
  }
  if (i == foldersSearchSpace.length)
    i = -1;
  //console.log("index of parent Folder "+ i + " for the folder id "+ folder._id.toString());
  return i;
}

/**
 * A helper function to get the file details for all the file Ids and the files' URL paths.
 * @param arrayOfFilePaths --> Array of file URL paths.
 * @param p_fileIds --> Array of file Ids
 */
async function getFiles(arrayOfFilePaths, p_fileIds, returnedObj) {
  console.log("getFiles************");
  let fileUrlPaths = [];

  if (arrayOfFilePaths && arrayOfFilePaths.length != 0) {
    console.log(arrayOfFilePaths);
    for (let i = 0; i < arrayOfFilePaths.length; i++) {
      let x = arrayOfFilePaths[i];
      x = x.substring(1).substring(0, x.length - 2);
      fileUrlPaths.push(x);
    }
    console.log(fileUrlPaths);
  }
  try {
    let filesResult = await FileModel.find({$or: [{urlPath: {$in: fileUrlPaths}}, {_id: {$in: p_fileIds}}]});
    console.log("print hehhabasfdknfdks");
    console.log(filesResult);
    if(filesResult && filesResult.length!=0 ) {
      filesResult.forEach(file => {
        let fileFound = false;
        if (returnedObj.fileIds && returnedObj.fileIds.length != 0) {
          returnedObj.fileIds.forEach(item => {
            if (item.toString() == file._id.toString()) {
              fileFound = true;
              console.log(fileFound);
            }
          });
        }
        if (!fileFound) {
          returnedObj.fileIds.push(file._id);
          returnedObj.files.push(file);
          console.log(returnedObj.arrayOfFilePaths.length);
          returnedObj.arrayOfFilePaths.push(file.urlPath);
          console.log(returnedObj.arrayOfFilePaths);
        }
      });
    }

   return 'getFiles done';
  } catch (error) {
    console.log("cannot find all files" + error);
    return 'error in getFiles ' + error.toString();
  }
}

/**
 * A helper function to get the JSON Ids
 * @param filesJsonIds --> Array of the Json Ids
 */
async function getJsonIds(filesJsonIds, returnedObj) {
  let arrayOfFilePaths;
  if (filesJsonIds.length != 0) {
    let regexString = '"' + returnedObj.oldHostUrl + '/files/' + '[^"]+"';
    let regex = new RegExp(regexString, "g");
    try {
      let jsonResults = await MyOwnJson.find({_id: {$in: filesJsonIds}});
      returnedObj.jsonIds = JSON.stringify(jsonResults);
      arrayOfFilePaths = returnedObj.jsonIds.match(regex);
      arrayOfFilePaths.forEach(filePath =>{
        returnedObj.arrayOfFilePaths.push(filePath);// arrayOfFilePaths;
      });
      return 'Json Ids done';
    } catch (error) {
      console.log("MyOwnJson is not found " + error);
      return 'JsonIds error ' + error.toString();
    }
  }
}

/**
 * A helper function to get all queries that are defined with pages.
 */
async function getQueriesFromPages(queryIds, returnedObj, res, req) {
  let promiseResult = '';
  let queries = [];
  let queriesResult = await Query.find({_id: {$in: queryIds}});
  let myOwnJsonIds = [];
  let folderIds = [];
  let filePaths = [];
  for (let i = 0; i < queriesResult.length; i++) {
    queries.push(queriesResult[i]);
    const path = returnedObj.oldHostUrl + '/api/myOwnJson/getJson/';
    const folderPath = returnedObj.oldHostUrl + '/api/folder/getAllFilesAndFolders/';
    const filePath = returnedObj.oldHostUrl + '/files/';
    ////{"content.info": {$regex: /http:\/\/localhost:3000\/.*/, $options: 'i'}}
    if (queriesResult[i].serverUrl.startsWith(path)) {
      myOwnJsonIds.push(queriesResult[i].serverUrl.substring(path.length));
    } else if (queriesResult[i].serverUrl.startsWith(folderPath)) {
      if(!folderIds.includes(queriesResult[i].serverUrl.substring(folderPath.length))){
      folderIds.push(queriesResult[i].serverUrl.substring(folderPath.length));
      }
    } else if (queriesResult[i].serverUrl.startsWith(filePath)) {
      console.log( "Found filePath"+filePath.toString());
      if(!filePaths.includes(queriesResult[i].serverUrl)){
      filePaths.push(queriesResult[i].serverUrl);}
    }
  }
  returnedObj.queries = JSON.stringify(queries);
  returnedObj.files = [];
  returnedObj.fileIds = [];
  returnedObj.arrayOfFilePaths = [];
  if (myOwnJsonIds.length > 0) {
    promiseResult += await getJsonIds(myOwnJsonIds, returnedObj);
  }
  if (filePaths.length > 0 || (returnedObj.arrayOfFilePaths && returnedObj.arrayOfFilePaths.length>0)) {
   if(returnedObj.arrayOfFilePaths){
     console.log("arrayOfFilePaths");
     console.log(returnedObj.arrayOfFilePaths);
   }
    filePaths.forEach(filePath => {
      if (!returnedObj.arrayOfFilePaths.includes('"' || filePath || '"')) {
        returnedObj.arrayOfFilePaths.push('"' || filePath || '"');
        if (returnedObj.arrayOfFilePaths[returnedObj.arrayOfFilePaths.length - 1] === '"') {
          returnedObj.arrayOfFilePaths.pop();
        }
      }
    });
    promiseResult += await getFiles(returnedObj.arrayOfFilePaths, [], returnedObj);
  }
  if (folderIds.length > 0 || returnedObj.fileIds.length>0) {
    returnedObj.folders = [];
    promiseResult += await getFoldersOfFiles(returnedObj.fileIds, folderIds, req.userData.userId, returnedObj);
  }
  returnedObj.files = JSON.stringify(returnedObj.files);
  returnedObj.folders = JSON.stringify(returnedObj.folders);
  returnedObj.arrayOfFilePaths = JSON.stringify(returnedObj.arrayOfFilePaths);
  return res.status(200).json({
    message: 'Created Zip File successfully that has no files',
    returnedObj: returnedObj
  });
}

/**
 * Not used
 */
router.get("/restoreFiles/", (req, res, next) => {
  fs.readdir('backend/files').then(filenames => {
    return res.status(200).json({
      message: 'Files retuned ',
      files: filenames
    });
  }).catch(err => {
    res.status(500).json({
      message: 'files not found',
      error: err
    })
  });
});

module.exports = router;
