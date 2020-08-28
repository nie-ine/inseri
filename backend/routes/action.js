const express = require('express');
const mongoose = require('mongoose');
const Action = require('../models/action');
const Page = require('../models/page');
const PageSet = require('../models/page-set');
const Query = require('../models/query');
const MyOwnJSON = require('../models/myOwnJson');
const Files = require('../models/files');
const Folder = require('../models/folder');
const Comment = require('../models/comment');
const fs = require('fs');
const ObjectId = require('mongoose');

const checkAuth = require('../middleware/check-auth');
const checkAuth2 = require('../middleware/check-auth-without-immediate-response');
const generatedHash = require('../middleware/hash-generator');

const router = express.Router();

router.get('', checkAuth, (req, res, next) => {
  Action.find()
    .populate('creator')
    .then(actions => {
      let message;
      if (actions.length === 0) {
        message = 'No actions were found'
      } else if (actions.length === 1) {
        message = 'One action was found'
      } else {
        message = 'All actions were found'
      }
      res.status(200).json({
        message: message,
        actions: actions
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching all actions failed',
        error: error
      })
    })
});

router.get('/:id', checkAuth2, (req, res, next) => {
  // Authorisation (only if user is also the creator of the action)
  if (req.loggedIn === true) {
    Action.find({_id: req.params.id, creator: req.userData.userId})
      .populate('hasPage')
      .populate({
        path: 'hasPageSet',
        populate: {
          path: 'hasPages'
        }
      })
      .then(result => {
        if (result.length === 1) {
          // console.log('get action id');
          // console.log(result[0]);
          res.status(200).json({
            message: 'Action was found',
            action: result[0]
          })
        } else {
          res.status(404).json({message: 'Action was not found'})
        }
      })
      .catch(error => {
        res.status(500).json({
          message: 'Fetching action failed',
          error: error
        })
      })
  } else if (req.loggedIn === false) {
    Action.find({_id: req.params.id})
      .populate('hasPage')
      .populate({
        path: 'hasPageSet',
        populate: {
          path: 'hasPages'
        }
      })
      .then(result => {
        if (result[0].published === true) {
          res.status(200).json({
            message: 'Action was found',
            action: result[0]
          })
        } else {
          res.status(404).json({message: 'Action was not found'})
        }
      })
      .catch(error => {
        res.status(500).json({
          message: 'Fetching action failed',
          error: error
        })
      })
  }

});

function  searchItemInArray (itemToSearch, arrayOfItems) {
if(arrayOfItems.length ==0){
  return -1;
}

  for (let i = 0; i < arrayOfItems.length; i++) {
    console.log(arrayOfItems[i]._id);
    console.log(itemToSearch._id);
    if (arrayOfItems[i]._id.toString() == itemToSearch._id.toString()) {
      console.log(i);
      return i;
    }
  }
  return -1;
}

function addFiles(req, res,oldHostUrl, newHostUrl) {
  if(req.body.filesJson) {
    let filesJsonExported = JSON.parse(JSON.parse(JSON.stringify(req.body.filesJson.split(oldHostUrl).join(newHostUrl))));

    let projectFiles = req.body.projectFiles;
    console.log('req.body.projectFiles');
    console.log(req.body.projectFiles);

    let newFiles = filesJsonExported.slice();
    console.log(newFiles);
    let filesIndices = [];
    if (projectFiles.length != 0 || filesJsonExported) {
      filesJsonExported.forEach(file => {
        filesIndices.push(file._id);
      });
      Files.find({_id: {$in: filesIndices}}).then(foundFiles => {
        console.log("foundFiles " + foundFiles);
        foundFiles.forEach(item => {
          let index = searchItemInArray(item, newFiles);
          if (index != -1) {
            newFiles.splice(index, 1);
          }
        });
        if (newFiles.length != 0) {
          Files.insertMany(newFiles, {ordered: false}).then(filesInserted => {
            console.log("files inserted");
            console.log(filesInserted);
            let counter = projectFiles.length;
            projectFiles.forEach(file => {
              let path = 'backend/files/' + file.fileName;
              console.log(path);
              console.log(file.fileContent);
              fs.writeFile(path, file.fileContent,'blob', function (err) {
                if (err) {
                  console.log('printing the error:  ' + err);
                  res.status(500).json({
                    message: 'Adding file ' + file.filename + " failed",
                    error: err
                  });
                }
                console.log(file.fileName + "has been added to the server");
                counter--;
              });
            });
            const timeout = setInterval(function () {
              if (counter === 0) {
                clearInterval(timeout);
              }
            }, 100);
          }).catch(foundFilesError => {
            res.status(500).json({
              message: 'Something happened while searching for the files',
              error: foundFilesError
            });
          });
        }
      }).catch(filesError => {
        //    tempError=true;
        res.status(500).json({
          message: 'Something happened while Adding the Files to the database',
          error: filesError
        });
      });
    }
  }
}

function addFolders(req, res,oldHostUrl,newHostUrl) {
  console.log("add Folders started");
  if(req.body.foldersJson) {


    let foldersJsonExported = JSON.parse(JSON.parse(JSON.stringify(req.body.foldersJson)));
    let newFolders = foldersJsonExported.slice();
    console.log("newFolders");
    console.log(newFolders);
    let folderIndices = [];
    if (foldersJsonExported) {
      foldersJsonExported.forEach(folder => {
        folderIndices.push(folder._id);
      });
      Folder.find({_id: {$in: folderIndices}}).then(foundFolders => {
        console.log("foundFolders");
        console.log(foundFolders);
        foundFolders.forEach(item => {
          let index = searchItemInArray(item, newFolders);
          if (index != -1) {
            newFolders.splice(index, 1);
          }
        });
        if (newFolders && newFolders.length > 0) {
          console.log("newFolders");
          console.log(newFolders);
          Folder.insertMany(newFolders, {ordered: false}).then(foldersResults => {
            console.log("folders inserted");
            console.log(foldersResults);
            addFiles(req, res, oldHostUrl, newHostUrl);
          }).catch(foundFoldersError => {
            res.status(500).json({
              message: 'Something happened while Inserting the folders',
              error: foundFoldersError
            });
          });
        } else {
          addFiles(req, res, oldHostUrl, newHostUrl);
        }

      }).catch(foldersError => {
        //   tempError=true;
        res.status(500).json({
          message: 'Something happened while Searching for the Folders',
          error: foldersError
        });
      })
    }
  }
  else{
    console.log( "The project has no Folders");
    addFiles(req, res, oldHostUrl, newHostUrl);
  }

}

function addMyOwnJsons(req, res, oldHostUrl, newHostUrl) {
  console.log("start addMyOwnJson");
if(req.body.jsonQueries) {


  let myOwnJsonExported = JSON.parse(JSON.parse(JSON.stringify(req.body.jsonQueries.split(oldHostUrl).join(newHostUrl))));
  console.log(myOwnJsonExported);
  let newMyOwnJsons = myOwnJsonExported.slice();
  let myOwnJsonIndices = [];
  if (myOwnJsonExported) {
    myOwnJsonExported.forEach(myOwnJson => {
      myOwnJsonIndices.push((myOwnJson._id));
    });
  }
  MyOwnJSON.find({_id: {$in: myOwnJsonIndices}}).then(foundJsons => {
    foundJsons.forEach(item => {
      let index = searchItemInArray(item, newMyOwnJsons);
      if (index != -1) {
        newMyOwnJsons.splice(index, 1);
        console.log(newMyOwnJsons);
      }
    });
    if (newMyOwnJsons && newMyOwnJsons.length > 0) {
      console.log("start inserting myOwnJsons");
      console.log(newMyOwnJsons);
      MyOwnJSON.insertMany(newMyOwnJsons, {ordered: false}).then(jsonsInserted => {
        console.log("my Json inserted successfully ");

        addFolders(req, res, oldHostUrl, newHostUrl);
      }).catch(jsonsInserted => {
        res.status(500).json({
          message: 'Something happened while adding the jsons',
          error: jsonsInserted
        });
      });
    } else {
      console.log("else in addMyOwnJson");
      addFolders(req, res, oldHostUrl, newHostUrl);
    }
  }).catch(jsonsSearchError => {
    res.status(500).json({
      message: 'Something happened while searching for the jsons',
      error: jsonsSearchError
    });
  });
}
else{
  console.log( "The project has no Jsons");
  addFolders(req, res, oldHostUrl, newHostUrl);
}
}

function addQueries( req,  res,  oldHostUrl,newHostUrl) {
  console.log("start adding the queries");
  if(req.body.queries){
    let queriesExported = JSON.parse(JSON.parse(JSON.stringify(req.body.queries.split(oldHostUrl).join(newHostUrl))));
    let queriesIndices=[];
    let newQueries = queriesExported.slice();
    if(queriesExported) {
      queriesExported.forEach(item => {
        queriesIndices.push((item._id));
      });
    }
    Query.find({_id: {$in: queriesIndices}}).then(foundQueries => {
      foundQueries.forEach(item => {
        let index = searchItemInArray(item, newQueries);
        if (index != -1) {
          newQueries.splice(index, 1);
        }
      });
      if(newQueries && newQueries.length>0){
        console.log("newQueries is not empty, insert them ");
        console.log(newQueries);
        Query.insertMany(newQueries, {ordered: false}).then(queriesInserted => {
          console.log(queriesInserted);
          addMyOwnJsons(req, res, oldHostUrl,newHostUrl);
        }).catch(queriesInsertedError => {
          res.status(500).json({
            message: 'Something happened while adding the queries',
            error: queriesInsertedError
          });
        });
      }
      else{
        addMyOwnJsons(req, res, oldHostUrl,newHostUrl);
      }

    }).catch(queriesError => {
      res.status(500).json({
        message: 'Something happened while searching for the queries',
        error: queriesError
      });
    });
  }
  else{
    console.log( "The project has no queries");
    addMyOwnJsons(req, res, oldHostUrl,newHostUrl);
  }

}

function addPages( req, res, oldHostUrl, newHostUrl) {
  let pagesExported = JSON.parse(JSON.parse(JSON.stringify(req.body.pages.split(oldHostUrl).join(newHostUrl))));
  Page.insertMany(pagesExported).then(pagesInserted => {
    //console.log(pagesInserted);
    addQueries(req, res, oldHostUrl, newHostUrl);
    return res.status(201).json({
      message: 'Project created successfully',
    });
  }).catch(pagesError => {
    res.status(500).json({
      message: 'Something happened while creating the pages',
      error: pagesError
    });
  });
}

function addComments(req, res, oldHostUrl, newHostUrl) {
  console.log("I am here in add comments");
  if(req.body.comments){
    //console.log(req.body.comments);
    let commentsExported= JSON.parse(JSON.parse(JSON.stringify(req.body.comments.split(oldHostUrl).join(newHostUrl))));
    let newComments = commentsExported.slice();
    let commentsIndices=[];
    if(commentsExported){
      commentsExported.forEach(item=>{
        commentsIndices.push((item._id));
      });
      Comment.find({_id: {$in: commentsIndices}}).then(foundComments => {
        foundComments.forEach(item => {
          let index = searchItemInArray(item, newComments);
          if (index != -1) {
            newComments.splice(index, 1);
          }
        });
        if(newComments.length!=0){
          Comment.insertMany(newComments, {ordered: false}).then(commentsInserted => {
          }).catch(foundCommentsError => {
            res.status(500).json({
              message: 'Something happened while searching for the comments',
              error: foundCommentsError
            });
          });
        }
        addPages( req, res, oldHostUrl, newHostUrl);
      }).catch(commentsError => {
        res.status(500).json({
          message: 'Something happened while creating the comments',
          error: commentsError
        });
      });
    }
  }
  else{
    console.log("No Comments were found, start adding the pages");
    addPages( req, res, oldHostUrl, newHostUrl);
  }

}

router.post('/createProject/', checkAuth, (req, res, next) => {
  //console.log(req.body);
  let oldHostUrl = req.body.oldHostUrl;
  let newHostUrl = req.protocol + "://" + req.get("host");
  console.log(req.body.action);
  let actionExported = new Action(JSON.parse(JSON.parse(JSON.stringify(req.body.action.split(oldHostUrl).join(newHostUrl)))));
  let pageSetExported = new PageSet(JSON.parse(JSON.parse(JSON.stringify(req.body.pageSet.split(oldHostUrl).join(newHostUrl)))));
  actionExported.save()
    .then((resultAction) => {
      Action.updateOne({_id: resultAction._id}, {$set: {creator: req.userData.userId}}).then(updatedAction => {
        pageSetExported.save().then(pageSetResult => {
          addComments( req,res, oldHostUrl, newHostUrl);
        }).catch(pageSetError => {
          res.status(500).json({
            message: 'Something happened while creating the pageSet',
            error: pageSetError,
            newMessage: 'a problem with the pageSet'
          });
        });
      }).catch(updateActionError => {
        res.status(500).json({
          message: 'Action cannot be updated with the pageSet',
          error: updateActionError
        });
      });
    }).catch(createActionError => {
    res.status(500).json({
      message: 'Action cannot be created ',
      error: createActionError
    });
  });
});

router.post('/reloadProject/', checkAuth, (req, res, next) => {
  console.log(req.body.pageSetId);
  let pageSet_id = req.body.pageSetId;
  const newAction = new Action({
    title: '',
    description: '',
    type: 'page-set',
    creator: '',
    isFinished: false,
    deleted: false
  });
  PageSet.find({_id: pageSet_id}).then(pageSet => {
    console.log(pageSet);
    Page.findOne({_id: pageSet[0].hasPages[0]}).then(mainPage => {
      console.log(mainPage);
      newAction.title = mainPage.title;
      newAction.description = mainPage.description;
      newAction.hasPageSet = pageSet[0]._id;
      newAction.hasPage = mainPage._id;
      Page.find({_id: {$in: pageSet[0].hasPages}}).then(allPages => {
        let queries = [];
        if (allPages) {
          console.log(allPages);
          for (let i = 0; i < allPages.length; i++) {
            allPages[i].queries.forEach(query => {
              queries.push(query);
            });
          }
          console.log(queries);
          if (queries.length != 0) {
            Query.find({_id: {$in: queries}}, {creator: 1}).then(creatorResults => {
              console.log(creatorResults);
              newAction.creator = creatorResults[0].creator;
              newAction.save().then(newActionCreated => {
                res.status(201).json({
                  message: 'Action created successfully',
                  action: newActionCreated
                });
              }).catch(newActionError => {
                console.log(newActionError);
                res.status(500).json({
                  message: 'Error while saving new Action',
                  error: newActionError
                });
              })
            }).catch(creatorError => {
              console.log(creatorError);
              res.status(500).json({
                message: 'Error retrieving Creator',
                error: creatorError
              });
            });
          }
        }
      }).catch(allPagesError => {
        console.log(allPagesError);
        res.status(500).json({
          message: 'Error retrieving All Pages',
          error: allPagesError
        });
      });
    }).catch(mainPageError => {
      console.log(mainPageError);
      res.status(500).json({
        message: 'Error retrieving main Page',
        error: mainPageError
      });
    });
  }).catch(pageSetErr => {
    console.log(pageSetErr);
    res.status(500).json({
      message: 'Error retrieving PageSet',
      error: pageSetErr
    });
  });
});


router.post('', checkAuth, (req, res, next) => {
  // Checks if type is valid
  if ((req.body.type !== 'page-set') && (req.body.type !== 'page')) {
    return res.status(400).json({
      message: 'Type is invalid'
    })
  }
  //console.log('printing the action: ' + req.body);
  let messages = [];
  // Tests if title is undefined, null or is empty string
  if (!Boolean(req.body.title)) messages.push('Your title is invalid!');

  // Tests if description is undefined, null or is empty string
  if (!Boolean(req.body.description)) messages.push('Your description is invalid!');

  // Attaches error messages to the response
  if (messages.length > 0) return res.status(400).json({messages: messages});

  const newAction = new Action({
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    creator: req.userData.userId,
    isFinished: false,
    deleted: false
  });

  // Case 1: action has a page set
  if (req.body.type === 'page-set') {
    console.log('if req.body.type === page-set');
    // Default values for the pageset
    const defaultTitle = 'document index';
    const defaultDescription = 'You can change the title of this inseri document ' +
      'as well as the description by clicking on the \'change document title and description\' button on the ' +
      'bottom right';
    const defaultLinkToImage = '../../../../assets/img/pageset.png';

    const newPageSet = new PageSet({
      title: defaultTitle,
      description: defaultDescription,
      linkToImage: defaultLinkToImage,
      hasPages: [],
      hash: generatedHash()
    });

    newPageSet.save()
      .then((resultPageSet) => {
        newAction.hasPageSet = resultPageSet._id;
        newAction.hasPage = null;
        newAction.save()
          .then((resultAction) => {
            res.status(201).json({
              message: 'Action with PageSet was created successfully',
              action: resultAction
            });
          })
          .catch(errorAction => {
            newPageSet.findByIdAndRemove({_id: resultPageSet._id})
              .then(() => {
                res.status(500).json({
                  message: 'Action cannot be created',
                  error: errorAction
                });
              })
              .catch(errorPageSet => {
                res.status(500).json({
                  message: 'Fatal error! Page set with ID: ' + resultPageSet._id + ' cannot be deleted',
                  error: errorPageSet
                });
              })
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Creating PageSet failed',
          error: error
        });
      });

    // Case 2: action has a page
  } else if (req.body.type === 'page') {
    console.log('req.body.type === page');
    // Default values for the page
    const defaultTitle = 'Title for the new Page';
    const defaultDescription = 'Description for the new Page';

    const newPage = new Page({
      title: defaultTitle,
      description: defaultDescription,
      openApps: []
    });

    newPage.save()
      .then(resultPage => {
        newAction.hasPage = resultPage._id;
        newAction.hasPageSet = null;
        newAction.save()
          .then((resultAction) => {
            res.status(201).json({
              message: 'Action with Page was created successfully',
              action: resultAction
            });
          })
          .catch(errorAction => {
            newPage.findByIdAndRemove({_id: resultPage._id})
              .then(() => {
                res.status(500).json({
                  message: 'Action cannot be created',
                  error: errorAction
                });
              })
              .catch(error => {
                res.status(500).json({
                  message: 'Fatal error! Page with ID: ' + resultPage._id + ' cannot be deleted'
                });
              })
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Creating Page failed',
          error: error
        });
      });
  }
});

router.put('/:id', checkAuth, (req, res, next) => {
  let messages = [];
  // Tests if title is undefined, null or is empty string
  if (!Boolean(req.body.title)) messages.push('Your title is invalid!');

  // Tests if description is undefined, null or is empty string
  if (!Boolean(req.body.description)) messages.push('Your description is invalid!');

  // Attaches error messages to the response
  if (messages.length > 0) return res.status(400).json({messages: messages});

  // Updates action and returns the updated action
  Action.findOneAndUpdate({_id: req.params.id, creator: req.userData.userId}, {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published,
    isFinished: req.body.isFinished
  }, {new: true})
    .populate('hasPage')
    .populate({
      path: 'hasPageSet',
      populate: {
        path: 'hasPages'
      }
    })
    .then(resultAction => {
      if (resultAction) {
        res.status(200).json({
          message: 'Action was updated successfully',
          action: resultAction
        });
      } else {
        res.status(200).json({
          message: 'Action cannot be updated'
        });
      }
    })
    .catch(error =>
      res.status(404).json({message: 'Update action failed'})
    );
});

router.delete('/:id', checkAuth, (req, res, next) => {
  Action.findOne({_id: req.params.id, creator: req.userData.userId})
    .populate({
      path: 'hasPage',
      populate: {
        path: 'queries'
      }
    })
    .populate({
      path: 'hasPageSet',
      populate: {
        path: 'hasPages',
        populate: {
          path: 'queries'
        }
      }
    })
    .then((resultAction) => {
      // Checks if action ID is valid
      if (!resultAction) {
        return res.status(404).json({
          message: 'Action ID is not valid'
        });
      }

      // Case 1: action has a page
      if (resultAction.type === 'page') {

        // Updates the query so it will not be bound to a page
        if (resultAction.hasPage.queries.length > 0) {

          // Array with all the queries in the page which belongs to the action
          const allQueries = resultAction.hasPage.queries.map(query => query._id);

          // Sets the queries to unbound
          Query.updateMany({_id: {$in: allQueries}}, {isBoundToPage: false})
            .catch((error) => {
              console.log(error);
            });
        }

        // Deletes the page of the action
        Page.deleteOne({_id: resultAction.hasPage})
          .then((deletedPage) => {
            if (deletedPage.n > 0) {
              // Deletes the action
              Action.deleteOne({_id: resultAction._id})
                .then(deletedAction => {
                  if (deletedAction.n > 0) {
                    res.status(200).json({message: 'Action deleted'})
                  } else {
                    res.status(404).json({message: 'Action cannot be deleted'})
                  }
                })
                .catch(errorAction =>
                  res.status(500).json({
                    message: 'Deleting Action failed',
                    error: errorAction
                  })
                );
            } else {
              res.status(404).json({message: 'Page cannot be deleted'})
            }
          })
          .catch(errorPage => {
            res.status(500).json({
              message: 'Deleting Page failed',
              error: errorPage
            })
          });

        // Case 2: action has a page set
      } else if (resultAction.type === 'page-set') {
        // Checks if pageset has any pages
        const amountPages = resultAction.hasPageSet.hasPages.length;
        if (amountPages !== 0) {

          // Array with all the queries from all the pages in the pageset which belongs to the action
          const allQueries = resultAction.hasPageSet.hasPages.reduce((accumulator, page) => accumulator.concat(page.queries.map(query => query.id)), []);

          // Array with all the pages in the pageset which belongs to the action
          const allPages = resultAction.hasPageSet.hasPages.map(page => page._id);

          // Sets the queries to unbound
          Query.updateMany({_id: {$in: allQueries}}, {isBoundToPage: false})
            .catch((error) => {
              console.log(error);
            });

          // Deletes all the pages in the pageset
          Page.deleteMany({_id: {$in: allPages}})
            .then(resultPages => {
              if ((resultPages.n > 0) && (resultPages.n <= amountPages)) {
                // Deletes the pageset and the action
                const p1 = PageSet.deleteOne({_id: resultAction.hasPageSet._id});
                const p2 = Action.deleteOne({_id: resultAction._id});

                Promise.all([p1, p2])
                  .then((values) => {
                    console.log(values);
                    if ((values[0].n > 0) && (values[1].n > 0)) {
                      res.status(200).json({message: 'Action, page set and pages were deleted'});
                    } else {
                      res.status(400).json({message: 'Action or/and page set can\'t be deleted'})
                    }
                  })
                  .catch(error => {
                    res.status(500).json({
                      message: 'Deleting action, page set and pages failed',
                      error: error
                    })
                  });
              } else {
                res.status(400).json({message: 'Pages can\'t be deleted'})
              }
            })
            .catch(error => {
              res.status(500).json({
                message: 'Deleting action, page set and pages failed',
                error: error
              })
            })
        } else {
          // Deletes the pageset and the action
          const p1 = PageSet.deleteOne({_id: resultAction.hasPageSet._id});
          const p2 = Action.deleteOne({_id: resultAction._id});

          Promise.all([p1, p2])
            .then((values) => {
              console.log(values);
              if ((values[0].n > 0) && (values[1].n > 0)) {
                res.status(200).json({message: 'Action and page set were deleted'});
              } else {
                res.status(400).json({message: 'Action or/and page set can\'t be deleted'})
              }
            })
            .catch(error => {
              res.status(500).json({
                message: 'Deleting action and page set failed',
                error: error
              })
            });
        }
      } else {
        res.status(400).json({message: 'Type is invalid'})
      }
    })
    .catch(error =>
      res.status(500).json({message: 'Fetching action failed'})
    );
});

module.exports = router;

