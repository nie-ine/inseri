import express from 'express';
import Action from '../models/action';
import Page from '../models/page';
import PageSet from '../models/page-set';
import Query from '../models/query';
import MyOwnJSON from '../models/myOwnJson';
import Files from '../models/files';
import Folder from '../models/folder';
import Comment from '../models/comment';
import fs from 'fs';

import checkAuth from '../middleware/check-auth';
import checkAuth2 from '../middleware/check-auth-without-immediate-response';
import generatedHash from '../middleware/hash-generator';

const router = express.Router();

router.get('/featured', (req, res, next) => {
  Page.find({featured: true})
    .then(pages => {
      let newArray = [];
      pages.forEach( function( page ) {
        console.log( page );
        newArray.push(
          {
            title: page.title,
            description: page.featuredDescription,
            id: page._id
          }
        );
      });
      res.status(200).json({
        message: "here are the featured responses",
        pages: newArray
      });
    });
});

/*router.get('', checkAuth, (req, res, next) => {
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
});*/

router.get('/allActionsAndItsPages/:userId', (req, res, next)=>{
  Action.find({creator: req.params.userId}).populate('hasPage')
    .populate({
      path: 'hasPageSet',
      populate: {
        path: 'hasPages'
      }
    }).then(actions => {
    let message;
    if (actions.length === 0) {
      message = 'No actions were found'
    } else {
      message = 'All actions were found'
    }
    res.status(200).json({
      message: message,
      actions: JSON.parse(JSON.stringify(actions))
    });
  })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching all actions failed',
        error: error
      })
    })
});

router.get('/checkIfShortNameExist/:shortName', (req, res, next ) => {
  Action.find({shortName: req.params.shortName})
    .then(actions => {
      console.log( actions );
      let exist;
      let message;
    if (actions.length === 0) {
      message = 'No actions were found';
      exist = false;
    } else {
      message = 'All actions were found';
      exist = true;
    }
    res.status(200).json({
      message: message,
      exist: exist,
      action: actions[ 0 ]
    });
  })
    .catch(error => {
      res.status(500).json({
        message: 'Checking shortname failed',
        error: error
      })
    })
});

router.get('/setShortName/:shortName/:id', checkAuth, (req, res, next ) => {
  Action.findOneAndUpdate({_id: req.params.id, creator: req.userData.userId}, {
    shortName: req.params.shortName
  }, {new: true})
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

/**
 * Returns the hierarchy of pages and its subPages
 */
async function getHierarchyOfPages(pageObj) {
  let page= await Page.findOne({_id: pageObj._id }).populate('hasSubPages');
  let subPagesOfSubPage=[];
  if(page) {
    console.log(page);
        if (page.hasSubPages && page.hasSubPages.length!==0) {
          let subPagesResult=page.hasSubPages;//.split();
          for(let i=0;i<subPagesResult.length; i++) {
            subPagesOfSubPage.push({page: subPagesResult[i], subPages:await getHierarchyOfPages(subPagesResult[i])});
          }
          return subPagesOfSubPage;
          } else {
            return subPagesOfSubPage;
          }
        }
}

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
      .then(async actionResult => {
        if (actionResult.length === 1) {
           let hierarchyOfPages = [];
           let pages=actionResult[0].hasPageSet.hasPages;
           if(pages.length!=0){
              for(let i=0;i<pages.length;i++){
                hierarchyOfPages.push({page: pages[i], subPages:await getHierarchyOfPages(pages[i])});
              }
            res.status(200).json({
              message: 'Action was found',
              action: actionResult[0],
              hierarchyOfPages: hierarchyOfPages
            })
           } else {
            res.status(200).json({
              message: 'Action was found',
              action: actionResult[0],
              hierarchyOfPages: []
            })
          }
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
      .then(async result => {
        if (result[0].published === true) {
          let hierarchyOfPages = [];
          let pages=result[0].hasPageSet.hasPages;
          if(pages.length!=0){
            for(let i=0;i<pages.length;i++){
              hierarchyOfPages.push({page: pages[i], subPages:await getHierarchyOfPages(pages[i])});
            }
            res.status(200).json({
              message: 'Action was found',
              action: result[0],
              hierarchyOfPages: hierarchyOfPages
            })
          } else {
            res.status(200).json({
              message: 'Action was found',
              action: result[0],
              hierarchyOfPages: []
            })
          }
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

/**
 * Searched for an Item in an array, if found returns its index otherwise returns -1
 */
function  searchItemInArray (itemToSearch, arrayOfItems) {
if(arrayOfItems.length ==0){
  return -1;
}

  for (let i = 0; i < arrayOfItems.length; i++) {

    if (arrayOfItems[i]._id.toString() == itemToSearch._id.toString()) {

      return i;
    }
  }
  return -1;
}

/**
 * Creates the Files extracted from the configuration files used to create a project --> Import project function
 */
function addFiles(req, res,oldHostUrl, newHostUrl) {
  if(req.body.filesJson) {
    let filesJsonExported = JSON.parse(JSON.parse(JSON.stringify(req.body.filesJson.split(oldHostUrl).join(newHostUrl))));
    let projectFiles = req.body.projectFiles;
    let newFiles = filesJsonExported.slice();
    let filesIndices = [];
    if (projectFiles.length != 0 || filesJsonExported) {
      filesJsonExported.forEach(file => {
        filesIndices.push(file._id);
      });
      Files.find({_id: {$in: filesIndices}}).then(foundFiles => {
        foundFiles.forEach(item => {
          let index = searchItemInArray(item, newFiles);
          if (index != -1) {
            newFiles.splice(index, 1);
          }
        });
        if (newFiles.length != 0) {
          Files.insertMany(newFiles, {ordered: false}).then(filesInserted => {
            let counter = projectFiles.length;
            projectFiles.forEach(file => {
              let path = 'backend/files/' + file.fileName;
              var buf = new Buffer(file.fileContent, 'binary'); //base64
              fs.writeFile(path, buf,(err)=> {
                if (err) {
                  console.log('printing the error:  ' + err);
                  res.status(500).json({
                    message: 'Adding file ' + file.filename + " failed",
                    error: err
                  });
                }
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

/**
 * Creates the Folders extracted from the configuration files used to create a project --> Import project function
 */
function addFolders(req, res,oldHostUrl,newHostUrl) {
  if(req.body.foldersJson) {
    let foldersJsonExported = JSON.parse(JSON.parse(JSON.stringify(req.body.foldersJson)));
    let newFolders = foldersJsonExported.slice();
    let folderIndices = [];
    if (foldersJsonExported) {
      foldersJsonExported.forEach(folder => {
        folderIndices.push(folder._id);
      });
      Folder.find({_id: {$in: folderIndices}}).then(foundFolders => {
        foundFolders.forEach(item => {
          let index = searchItemInArray(item, newFolders);
          if (index != -1) {
            newFolders.splice(index, 1);
          }
        });
        if (newFolders && newFolders.length > 0) {
          Folder.insertMany(newFolders, {ordered: false}).then(foldersResults => {
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
        res.status(500).json({
          message: 'Something happened while Searching for the Folders',
          error: foldersError
        });
      })
    }
  }
  else{
    addFiles(req, res, oldHostUrl, newHostUrl);
  }

}

/**
 * Creates the myOwnJsons extracted from the configuration files used to create a project --> Import project function
 */
function addMyOwnJsons(req, res, oldHostUrl, newHostUrl) {
if(req.body.jsonQueries) {
  let myOwnJsonExported = JSON.parse(JSON.parse(JSON.stringify(req.body.jsonQueries.split(oldHostUrl).join(newHostUrl))));
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
      }
    });
    if (newMyOwnJsons && newMyOwnJsons.length > 0) {

      MyOwnJSON.insertMany(newMyOwnJsons, {ordered: false}).then(jsonsInserted => {

        addFolders(req, res, oldHostUrl, newHostUrl);
      }).catch(jsonsInserted => {
        res.status(500).json({
          message: 'Something happened while adding the jsons',
          error: jsonsInserted
        });
      });
    } else {
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
  addFolders(req, res, oldHostUrl, newHostUrl);
}
}

/**
 * Creates the queries extracted from the configuration files used to create a project --> Import project function
 */
function addQueries( req,  res,  oldHostUrl,newHostUrl) {
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
        Query.insertMany(newQueries, {ordered: false}).then(queriesInserted => {
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
    addMyOwnJsons(req, res, oldHostUrl,newHostUrl);
  }

}

/**
 * Creates the pages extracted from the configuration files used to create a project --> Import project function
 */
function addPages( req, res, oldHostUrl, newHostUrl) {
  let pagesExported = JSON.parse(JSON.parse(JSON.stringify(req.body.pages.split(oldHostUrl).join(newHostUrl))));
  Page.insertMany(pagesExported).then(pagesInserted => {
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

/**
 * Creates the comments extracted from the configuration files used to create a project --> Import project function
 */
function addComments(req, res, oldHostUrl, newHostUrl) {

  if(req.body.comments){
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
    addPages( req, res, oldHostUrl, newHostUrl);
  }

}

/**
 * Creates a project based on the imported configuration files.
 */
router.post('/createProject/', checkAuth, (req, res, next) => {

  let oldHostUrl = req.body.oldHostUrl;
  let newHostUrl = req.protocol + "://" + req.get("host");

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

    Page.findOne({_id: pageSet[0].hasPages[0]}).then(mainPage => {

      newAction.title = mainPage.title;
      newAction.description = mainPage.description;
      newAction.hasPageSet = pageSet[0]._id;
      newAction.hasPage = mainPage._id;
      Page.find({_id: {$in: pageSet[0].hasPages}}).then(allPages => {
        let queries = [];
        if (allPages) {

          for (let i = 0; i < allPages.length; i++) {
            allPages[i].queries.forEach(query => {
              queries.push(query);
            });
          }

          if (queries.length != 0) {
            Query.find({_id: {$in: queries}}, {creator: 1}).then(creatorResults => {

              newAction.creator = creatorResults[0].creator;
              newAction.save().then(newActionCreated => {
                res.status(201).json({
                  message: 'Action created successfully',
                  action: newActionCreated
                });
              }).catch(newActionError => {

                res.status(500).json({
                  message: 'Error while saving new Action',
                  error: newActionError
                });
              })
            }).catch(creatorError => {

              res.status(500).json({
                message: 'Error retrieving Creator',
                error: creatorError
              });
            });
          }
        }
      }).catch(allPagesError => {

        res.status(500).json({
          message: 'Error retrieving All Pages',
          error: allPagesError
        });
      });
    }).catch(mainPageError => {
      res.status(500).json({
        message: 'Error retrieving main Page',
        error: mainPageError
      });
    });
  }).catch(pageSetErr => {

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
            PageSet.findByIdAndRemove({_id: resultPageSet._id})
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
            PageSet.findByIdAndRemove({_id: resultPage._id})
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
          Query.updateMany({_id: {$in: allQueries}}, {isBoundToPage: String(false)})
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
          Query.updateMany({_id: {$in: allQueries}}, {isBoundToPage: String(false)})
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

export default router;
