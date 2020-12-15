const express = require('express');

const Page = require('../models/page');
const Query = require('../models/query');
const File=require('../models/files');
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const checkAuth2 = require('../middleware/check-auth-without-immediate-response');
const router = express.Router();
const PageSet = require('../models/page-set');
const MyOwnJson = require('../models/myOwnJson');
const multer = require("multer");
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/assets/img/pageTemplates");
  },
  filename: (req, file, cb) => {
    const name = file.originalname;
    console.log("The expected filename form the multer package = " + Date.now() + "-" + name);
    cb(null, Date.now() + "-" + name);
  }
});

router.get('/published', (req, res, next) => {
  Page.find( { publishedAsTemplate: true } )
    .then(pages => {
      let message;
      if (pages.length === 0) {
        message = 'No pages were found'
      } else if (pages.length === 1) {
        message = 'One published page was found'
      } else {
        message = 'All published pages were found'
      }
      res.status(200).json({
        message: message,
        pages: pages
      });
    });
});

router.get('/publishAsTemplate/:pageID', (req, res, next) => {
  console.log( req.params.pageID );
  Page.findByIdAndUpdate({_id: req.params.pageID}, {publishedAsTemplate: true})
    .then(pages => {
      res.status(200).json({
        message: 'publishing template worked',
        pages: pages
      })
        .catch(error => {
          res.status(500).json({
            message: 'Publishing page as template failed',
            error: error
          })
        });
    });
});

router.get('/undoPublishTemplate/:pageID', (req, res, next) => {
  console.log( req.params.pageID );
  Page.findByIdAndUpdate({_id: req.params.pageID}, {publishedAsTemplate: false})
    .then(pages => {
      res.status(200).json({
        message: 'undo publish page successful'
      })
        .catch(error => {
          res.status(500).json({
            message: 'not successful'
          })
        });
    });
});

router.get('/:id', checkAuth2, (req, res, next) => {

  if( req.loggedIn === true ) {
    //console.log('user logged In and page Id is ', req.params.id);
    Page.findById(req.params.id)
      .then(result => {
        if (result) {
          //console.log(result);
          res.status(200).json({
            message: 'Page was found',
            page: result
          });
        } else {
          res.status(404).json({
            message: 'Page was not found'
          });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: 'Fetching page failed',
          error: error
        })
      })
  } else if ( req.loggedIn === false ) {
    //console.log('user is not logged, page id is ', req.params.id);
    Page.findById(req.params.id)
      .then(result => {
        if (result) {
          res.status(200).json({
            message: 'Page was found',
            page: result
          });
        } else {
          res.status(404).json({
            message: 'Page was not found'
          });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: 'Fetching page failed',
          error: error
        })
      })
  }
});

router.get('/:id/queries', checkAuth, (req, res, next) => {
  Page.findById(req.params.id)
    .then(result => {

      // Checks if page ID is valid
      if (!result) {
        return res.status(404).json({
          message: 'Page ID is not valid'
        });
      }

      Query.find({_id: {$in: result.queries}})
        .then(result => {
          res.status(200).json({
            message: 'Queries were found',
            queries: result
          });
        })
        .catch(error => {
          res.status(500).json({
            message: 'Page cannot be updated',
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching page failed',
        error: error
      })
    })
});

router.post('/:id/queries', checkAuth, (req, res, next) => {
  // console.log(req.body);
  let messages = [];
  // Tests if title is undefined, null or is empty string
  if (!Boolean(req.body.title)) messages.push('Your title is invalid!');

  // Tests if server url is undefined, null or is empty string
  // if (!Boolean(req.body.serverUrl)) messages.push('Your server URL is invalid!');

  // Attaches error messages to the response
  if (messages.length > 0) return res.status(400).json({messages: messages});

  Page.findById(req.params.id)
    .then(result => {

      // Checks if page ID is valid
      if (!result) {
        return res.status(404).json({
          message: 'Page ID is not valid'
        })
      }

      const newQuery = new Query({
        title: req.body.title,
        description: req.body.description,
        serverUrl: req.body.serverUrl,
        method: req.body.method,
        params: req.body.params,
        header: req.body.header,
        body: req.body.body,
        path: req.body.chosenPath,
        isBoundToPage: true,
        creator: req.userData.userId
      });

      newQuery.save()
        .then (resultQuery => {
          Page.update({_id: result._id}, { $push: { queries: resultQuery._id } })
            .then(updatedPage => {
              if (updatedPage.n > 0) {
                res.status(201).json({
                  message: 'Query in page was created successfully',
                  query: resultQuery
                });
              } else {
                res.status(400).json({
                  message: 'Query cannot be created'
                });
              }
            })
        })
        .catch(error => {
          res.status(500).json({
            message: 'Fetching page failed',
            error: error
          })
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching page failed',
        error: error
      })
    });
});

router.put('/:id/addExistingQueryToPage', checkAuth, (req, res, next) => {
  // console.log( req.body );
  let messages = [];
  // Tests if title is undefined, null or is empty string
  if (!Boolean(req.body.title)) messages.push('Your title is invalid!');

  // Tests if server url is undefined, null or is empty string
  // if (!Boolean(req.body.serverUrl)) messages.push('Your server URL is invalid!');

  // Attaches error messages to the response
  if (messages.length > 0) return res.status(400).json({messages: messages});

  Page.findById(req.params.id)
    .then(pageResult => {

      // Checks if page ID is valid
      if (!pageResult) {
        return res.status(404).json({
          message: 'Page ID is not valid'
        })
      }

      Page.update({_id: pageResult._id}, { $push: { queries: req.body._id } })
        .then(updatedPage => {
          if (updatedPage.n > 0) {
            res.status(201).json({
              message: 'Query in page was created successfully',
              query: updatedPage
            });
          } else {
            res.status(400).json({
              message: 'Query cannot be created'
            })
              .catch(error => {
                res.status(500).json({
                  message: 'Fetching page failed',
                  error: error
                })
              });
          }
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching page failed',
        error: error
      })
    });
});

router.put('/:pageID/queries/:queryID', checkAuth, (req, res, next) => {
  let messages = [];
  // Tests if title is undefined, null or is empty string
  if (!Boolean(req.body.title)) messages.push('Your title is invalid!');

  // Tests if server url is undefined, null or is empty string
  // if (!Boolean(req.body.serverUrl)) messages.push('Your server URL is invalid!');

  // Attaches error messages to the response
  if (messages.length > 0) return res.status(400).json({messages: messages});

  Page.findById(req.params.pageID)
    .then(result => {

      // Checks if page ID is valid
      if (!result) {
        return res.status(404).json({
          message: 'Page ID is not valid'
        })
      }

      // Checks if query ID is valid and updates query
      if (result.queries.filter(a => {return a._id == req.params.queryID}).length === 1) {
        Query.findByIdAndUpdate({_id: req.params.queryID}, {
          title: req.body.title,
          description: req.body.description,
          serverUrl: req.body.serverUrl,
          method: req.body.method,
          params: req.body.params,
          header: req.body.header,
          body: req.body.body,
          path: req.body.chosenPath
        }, {new:true})
          .then(updatedPage => {
            res.status(200).json({
              message: 'Query was updated successfully',
              page: updatedPage
            });
          })
          .catch(error => {
            res.status(500).json({
              message: 'Query cannot be updated',
              error: error
            });
          });
      } else {
        res.status(404).json({
          message: 'query was not listed in page'
        });
      }

    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching page failed',
        error: error
      })
    });
});

router.delete('/:pageID/queries/:queryID', checkAuth, (req, res, next) => {
  Page.findById(req.params.pageID)
    .then(result => {

      // Checks if page ID is valid
      if (!result) {
        return res.status(404).json({
          message: 'Page ID is not valid'
        })
      }

      // Checks if query ID is valid and updates the query so it will not be bound to a page
      if (result.queries.filter(a => {return a._id == req.params.queryID}).length === 1) {
        Query.findByIdAndUpdate({_id: req.params.queryID}, {isBoundToPage: false})
          .then((updatedQuery) => {
            // Removes the reference to the query in the page
            Page.update({_id: req.params.pageID}, {$pull: {queries:req.params.queryID}})
              .then(() => {
                res.status(200).json({
                  message: 'Query deleted successfully'
                });
              })
              .catch(error => {
                res.status(500).json({
                  message: 'Updating page failed',
                  error: error
                });
              });
          })
          .catch(errorPage => {
            res.status(500).json({
              message: 'Updating query failed',
              error: errorPage
            });
          });
      } else {
        res.status(404).json({
          message: 'query was not listed in page'
        });
      }

    })
    .catch(error => {
      res.status(500).json({
        message: 'Query cannot be deleted',
        error: error
      });
    });
});

router.put('/:id', checkAuth, (req, res, next) => {
  // console.log( 'arriving page:', req.body );
  Page.findByIdAndUpdate({_id: req.params.id}, {
    openApps: req.body.openApps,
    appInputQueryMapping: req.body.appInputQueryMapping,
    published: req.body.published,
    showAppTitlesOnPublish: req.body.showAppTitlesOnPublish,
    showAppSettingsOnPublish: req.body.showAppSettingsOnPublish,
    showInseriLogoOnPublish: req.body.showInseriLogoOnPublish,
    showDataBrowserOnPublish: req.body.showDataBrowserOnPublish,
    tiles: req.body.tiles,
    chosenWidth: req.body.chosenWidth,
    jsonId: req.body.jsonId,
    ownQuery: req.body.ownQuery
  }, {new:true})
    .then(resultPage => {
      res.status(200).json({
        message: 'Page was updated successfully',
        page: resultPage
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Page cannot be updated',
        error: error
      });
    });
});

router.get('/:pageId/link/:pageSetId', checkAuth, (req, res, next) => {
  // console.log( req.params.pageSetId, req.params.pageId );
  PageSet.update({_id: req.params.pageSetId}, { $push: { hasPages: req.params.pageId } })
    .then(updatedPageSet => {
      if (updatedPageSet.n > 0) {
        res.status(201).json({
          message: 'Page in pageset was created successfully',
          page: updatedPageSet
        });
      } else {
        res.status(400).json({
          message: 'Page cannot be created'
        });
      }
    })
    .catch(errorUpdatePageSet => {
      res.status(500).json({
        message: 'Creating page in pageset failed',
        error: errorUpdatePageSet
      });
    });
});


router.get('/:pageId/duplicate/:pageSetId', checkAuth, (req, res, next) => {

  // console.log( 'duplicate', req.params.pageId );

  Page.findById(req.params.pageId)
    .then(async pageResult => {
      console.log(pageResult.queries.length);
      let newQueries = [];
      let m = 0;
      let oldAndNewServerUrls = [];
      let oldAndNewQueries = [];
      const folderPath =  req.protocol + "://" + req.get("host")+'/api/folder/getAllFilesAndFolders/';
      const filePath = req.protocol + "://" + req.get("host")+ '/files/';
      console.log('all queries are: ');
      console.log(pageResult.queries);
      for ( const queryId of pageResult.queries ) {
        console.log('current query: '+ queryId);
        let query = await Query.findById( queryId );
          //.then( async query => {
        console.log(query.method);
            if ( query.method === 'JSON' ) {

              let queryCopy = new Query({
                title: query.title + '_Copy',
                description: query.description,
                serverUrl: query.serverUrl,
                method: query.method,
                params: query.params,
                header: query.header,
                body: query.body,
                path: query.chosenPath
              });

              let myOwnJson = await MyOwnJson.findById( query.serverUrl.split('/')[6] );
              console.log(myOwnJson);
               // .then( async myOwnJson => {
                  //console.log( 'printing my ownJson');
                  //console.log(myOwnJson);
                  let filesQueried=[];
                  let regexString = '"' + req.protocol + '://' + req.get("host") + '/files/' + '[^"]+"';
                  let regex = new RegExp(regexString, "g");
                    let arrayOfFilePaths = JSON.stringify(myOwnJson).match(regex);
                    console.log(arrayOfFilePaths);
                    if(arrayOfFilePaths!== null){
                      arrayOfFilePaths.forEach(filePath =>{
                        if(!filesQueried.includes(filePath)){
                          filesQueried.push(filePath);// arrayOfFilePaths;
                        }
                      });
                      console.log('done matching');
                      console.log(arrayOfFilePaths);
                      console.log(filesQueried);
                      for (const file of filesQueried) {
                        console.log(file.split('"')[1]);
                        let extractedFile = await File.findOne({urlPath: file.split('"')[1]});
                        //let x =file.lastIndexOf('/');
                        //let y = file.indexOf('-',file.lastIndexOf('/'));
                        console.log(extractedFile);
                        let filePath= file.slice(0,file.lastIndexOf('/')+1);
                        let fileName=file.slice(file.indexOf('-',file.lastIndexOf('/')));
                        let newFilePath=filePath+Date.now().toString()+fileName;

                        //fs.createReadStream('backend/files/'+file.substr(filePath.length).split('"')[0]).pipe(fs.createWriteStream('backend/files/'+newFilePath.substr(filePath.length).split('"')[0]));

                        // console.log("\nFile Contents of example_file:",
                        //   fs.readFileSync('backend/files/'+file.substr(filePath.length).split('"')[0], "utf8"));
                        fs.copyFileSync('backend/files/'+file.substr(filePath.length).split('"')[0],
                          'backend/files/'+newFilePath.substr(filePath.length).split('"')[0]);
                        // console.log('file copied successfully');
                        // console.log("\nFile Contents of copied_file:",
                        //   fs.readFileSync('backend/files/'+newFilePath.substr(filePath.length).split('"')[0], "utf8"));
                        let newFileCopy = new File({
                          title: extractedFile.title ,
                          description: extractedFile.description,
                          urlPath: newFilePath.split('"')[1],
                          owner: req.userData.userId
                        });
                        //   console.log(newFileCopy);
                        // console.log('I am here ');
                        let savedFile = await newFileCopy.save();
                        console.log(savedFile);
                        console.log(JSON.stringify(myOwnJson.content));
                        myOwnJson.content= JSON.parse(JSON.stringify(myOwnJson.content).split(file.split('"')[1]).join(newFilePath.split('"')[1]));
                        console.log(JSON.stringify(myOwnJson.content));
                        //replace(file.split('"')[1],newFilePath.split('"')[1]);
                        //console.log('done replacing all occurances');
                      }
                    }
                    console.log( 'no file paths');

                    //console.log(JSON.stringify(myOwnJson.content));
                  const newJson = new MyOwnJson({
                    creator: req.userData.userId,
                    content: myOwnJson.content
                  });
                   console.log('newJson');
              console.log(newJson);
                  let copiedMyOwnJson = await newJson.save();
                    //.then(copiedMyOwnJson => {
                      console.log('copied my own json ');
                      console.log(copiedMyOwnJson);
                      let newServerUrl = req.protocol + "://" + req.get("host")+'/api/myOwnJson/getJson/' + copiedMyOwnJson._id; //'http://localhost:3000/api/myOwnJson/getJson/'
                      //console.log(newServerUrl);
                      oldAndNewServerUrls.push(
                        {
                          oldUrl: queryCopy.serverUrl,
                          newUrl: newServerUrl
                        }
                      );
                      queryCopy.serverUrl = newServerUrl;
                      //console.log(queryCopy);
                      let resultQuery= await queryCopy.save();
                        //.then(resultQuery => {
                          console.log('copied query');
                          console.log(resultQuery);
                          newQueries[ m ] = resultQuery._id;
                          m += 1;
                          console.log(m);
                          console.log('If');
                          //console.log(resultQuery);
                          oldAndNewQueries.push(
                            {
                              oldQuery: queryId,
                              newQuery: resultQuery._id
                            }
                          );

                          if ( m === pageResult.queries.length ) {
                            console.log(m);
                            console.log( 'update page');
                            updatePage(
                              pageResult,
                              newQueries, res, req, oldAndNewServerUrls, oldAndNewQueries )
                          }
                    //     })
                    //     .catch(error => {
                    //       res.status(500).json({
                    //         message: 'Query cannot be copied',
                    //         error: error
                    //       });
                    //     });
                    //
                    // })
                    // .catch(err => {
                    //   res.status(500).json({
                    //     error: err
                    //   })
                    // });
                // })
                // .catch(error => {
                //   res.status(500).json({
                //     message: 'Fetching MyOwnJson failed',
                //     error: error
                //   })
                // })
             }
             else if (query.serverUrl.startsWith(filePath)) {
              //console.log("Found filePath" + query.serverUrl);
              //let fileId = query.serverUrl.substr(filePath.length).split('"').join('');
              //console.log('old file ID');
              //console.log(fileId);
              let file = await File.findOne({urlPath: query.serverUrl});
                // console.log( 'file is: ');
                // console.log(file);
                let newFilePath=filePath+Date.now().toString()+'-'+file.title;
                // console.log('new file path after substring');
                // console.log(newFilePath.substr(filePath.length));
                // console.log('printing the src file path');
                // console.log('backend/files/'+file.urlPath.substr(filePath.length).split('"')[0])
                // console.log('printing the dest file path');
                // console.log('backend/files/'+newFilePath.substr(filePath.length));
                fs.copyFileSync('backend/files/'+file.urlPath.substr(filePath.length).split('"')[0],
                  'backend/files/'+newFilePath.substr(filePath.length));
                // console.log('newFilePath');
                // console.log(newFilePath);
                let newFileCopy = new File({
                  title: file.title,
                  description: file.description,
                  urlPath: newFilePath,
                  owner: req.userData.userId
                });
                // console.log(newFileCopy);
                // console.log('new query server url');
                // console.log(newFilePath);
                let queryCopy = new Query({
                  title: query.title + '_Copy',
                  description: query.description,
                  serverUrl: newFilePath,
                  method: query.method,
                  params: query.params,
                  header: query.header,
                  body: query.body,
                  path: query.chosenPath
                });
                oldAndNewServerUrls.push(
                  {
                    oldUrl: query.serverUrl,
                    newUrl: newFilePath
                  });
                let newSavedFile= await newFileCopy.save();//.then( =>{
                  console.log('newsaved File');
                  console.log(newSavedFile);
                  let resultQuery = await queryCopy.save();
                   // .then(resultQuery => {
                      console.log('new query is ');
                      console.log(resultQuery);
                      console.log( queryId+':'+resultQuery._id);
                      newQueries[ m ] = resultQuery._id;
                      console.log(newQueries[m]);
                      m += 1;
                      oldAndNewQueries.push(
                        {
                          oldQuery: queryId,
                          newQuery: resultQuery._id
                        }
                      );
                      console.log(m);
                      if ( m === pageResult.queries.length ) {
                        updatePage(
                          pageResult,
                          newQueries, res, req, oldAndNewServerUrls, oldAndNewQueries )
                      }
                    // })
                    // .catch(error => {
                    //   res.status(500).json({
                    //     message: 'Query cannot be copied',
                    //     error: error
                    //   });
                    // });
            }
            //   else if (query.serverUrl.startsWith(folderPath)) {
            //     /// To be implemented later
            // }
            else { // any other url

              newQueries[ m ] = queryId;
              m += 1;
              console.log(m);
              console.log('else ');
              oldAndNewQueries.push(
                {
                  oldQuery: queryId,
                  newQuery: queryId
                }
              );
              console.log('m: '+m);
              console.log('pageResult.queries.length: '+ pageResult.queries.length);
              if ( m === pageResult.queries.length ) {
                updatePage( pageResult, newQueries, res, req, oldAndNewServerUrls, oldAndNewQueries );
              }
            }
          //} );
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching page failed',
        error: error
      })
    });
});

function updatePage( pageResult, queries, res, req, oldAndNewServerUrls, oldAndNewQueries ) {

  // console.log( oldServerUrls, newServerUrls );
console.log('update {age');
console.log(pageResult);
console.log(queries);
console.log(oldAndNewQueries);
console.log(oldAndNewServerUrls);
  for ( let i = 0; i < pageResult.appInputQueryMapping.length; i++ ) {
    for ( let j = 0; j < oldAndNewQueries.length; j++ ) {
      pageResult.appInputQueryMapping[ i ] = pageResult.appInputQueryMapping[ i ]
        .replace( oldAndNewQueries[ j ].oldQuery, oldAndNewQueries[ j ].newQuery );
    }
    for ( let k = 0; k < oldAndNewServerUrls.length; k++ ) {
      pageResult.appInputQueryMapping[ i ] = pageResult.appInputQueryMapping[ i ]
        .replace( oldAndNewServerUrls[ k ].oldUrl, oldAndNewServerUrls[ k ].newUrl );
    }
  }

  const duplicate = new Page({
    title: pageResult.title + '_Copy',
    description: pageResult.description,
    appInputQueryMapping: pageResult.appInputQueryMapping,
    queries: queries,
    hasSubPages: pageResult.hasSubPages,
    chosenWidth: pageResult.chosenWidth,
    published: false,
    showAppSettingsOnPublish: pageResult.showAppSettingsOnPublish,
    showAppTitlesOnPublish: pageResult.showAppTitlesOnPublish,
    showDataBrowserOnPublish: pageResult.showDataBrowserOnPublish,
    showInseriLogoOnPublish: pageResult.showInseriLogoOnPublish,
    openApps: pageResult.openApps
  });
  console.log(duplicate);
  duplicate.save()
    .then(
      copiedPage => {
        console.log(copiedPage);
        PageSet.update({_id: req.params.pageSetId}, { $push: { hasPages: copiedPage._id } })
          .then(updatedPageSet => {
            if (updatedPageSet.n > 0) {
              res.status(201).json({
                message: 'Page in pageset was created successfully',
                page: copiedPage
              });
            } else {
              res.status(400).json({
                message: 'Page cannot be created'
              });
            }
          })
          .catch(errorUpdatePageSet => {
            res.status(500).json({
              message: 'Creating page in pageset failed',
              error: errorUpdatePageSet
            });
          });
      }
    )
    .catch(error => {
      res.status(500).json({
        message: 'Page cannot be copied',
        error: error
      });
    });
}

router.post('/addProfileTemplate/:pageID', multer({storage: storage}).single("file"), (req, res, next) => {
  let filePath='';
  console.log(req.file);
  console.log(req.body);
  if (req.file) {
    filePath = req.body.host + "/assets/img/pageTemplates/" + req.file.filename;
  }
  Page.findOneAndUpdate({_id: req.params.pageID}, {templatePhotoURL: filePath} )
    .then(updatedPage => {
      res.status(201).json({
        message: 'Page updated successfully',
        page: updatedPage
      });
    })
    .catch(errorUpdatePage => {
      res.status(500).json({
        message: 'Updated page failed',
        error: errorUpdatePage
      });
    });
});

//create sub-page
router.post('/:pageId/newSubPage',checkAuth, (req, res, next) => {
  let messages = [];
  // Tests if title is undefined, null or is empty string
  if (!Boolean(req.body.title)) messages.push('Your title is invalid!');

  // Tests if description is undefined, null or is empty string
  if (!Boolean(req.body.description)) messages.push('Your description is invalid!');

  // Attaches error messages to the response
  if (messages.length > 0) return res.status(400).json({messages: messages});

  const newSubPage = new Page({
    title: req.body.title,
    description: req.body.description,
    tiles: true,
    openApps: []
  });
  newSubPage.save()
    .then(resultQuery => {
      console.log('params');
      console.log(req.params);
      console.log('resultQuery');
      console.log(resultQuery);
      Page.update({_id: req.params.pageId}, { $push: { hasSubPages: resultQuery._id } })
        .then(updatedPage => {
          if (updatedPage.n > 0) {
            console.log(newSubPage);
            console.log(updatedPage);
            res.status(201).json({
              message: 'Sub-page was created successfully and linked to the page',
              subpage: newSubPage
            });
          } else {
            res.status(400).json({
              message: 'sub-page cannot be created'
            });
          }
        })
        .catch(errorUpdatePage => {
          res.status(500).json({
            message: 'Creating sub-page in page failed',
            error: errorUpdatePage
          });
        });
    })
    .catch(errorSubPage => {
      res.status(500).json({
        message: 'Creating sub-page failed',
        error: errorSubPage
      });
    });
});

router.get('/sub-pages/:pageId', checkAuth, (req, res, next) => {
  Page.find({_id: req.params.pageId}, {_id: 0, hasSubPages: 1})
    .populate('hasSubPages')
    .then(subPagesIds => {
      let message;
      //console.log(subPagesIds);
      if (subPagesIds.length === 0) {
        message = 'No sub-pages were found'
      } else {
        Page.find({_id: {$in: subPagesIds[0].hasSubPages}})
          .then(subPagesDetails => {
            //console.log(subPagesDetails);
            if (subPagesDetails.length === 0) {
              message = 'No sub-pages were found'
            } else {
              message = 'All sub-pages details were found.'
            }
            res.status(200).json({
              message: message,
              subPages: subPagesDetails
            });
          })
          .catch(error => {
            res.status(500).json({
              message: 'Could not retrieve sub-pages',
              error: error
            })
          });
      }
    }).catch(error => {
    res.status(500).json({
      message: 'Could not retrieve page',
      error: error
    })
  });
});

async function removeFromOldParent(pageToMove, oldParentPage, pageSet) {
  if(oldParentPage !== null ) {// need to be removed from old Parent sub Pages
    let deleteFromOldParent = await Page.updateOne({_id: oldParentPage._id}, {$pull: {hasSubPages: pageToMove}});
    console.log('deleteFromOldParent');
    console.log(deleteFromOldParent);
    return deleteFromOldParent;
  } else {
    let removeFromPageSet = await PageSet.updateOne({_id: pageSet}, {$pull: {hasPages: pageToMove}});
    console.log('removeFromPageSet');
    console.log(removeFromPageSet);
    return removeFromPageSet;
  }
}

async function addToNewParent(pageToMove, newParentPage, pageSet) {
  if(newParentPage !== null) {
    let addToNewPage = await Page.updateOne({_id: newParentPage._id}, {$push: {hasSubPages: pageToMove}});
    console.log('addToNewPage');
    console.log(addToNewPage);
    return addToNewPage;
  } else {
    let addToPageSet = await PageSet.updateOne({_id: pageSet}, {$push: {hasPages: pageToMove}});
    console.log('addToPageSet');
    console.log(addToPageSet);
    return addToPageSet;
  }
}

router.post('/movePage',checkAuth, (req, res, next) => {
  console.log('move page, req.body is');
  console.log(req.body);
  removeFromOldParent(req.body.pageToMove, req.body.oldParentPage, req.body.pageSet).then( removedFromOldParent =>{
    addToNewParent(req.body.pageToMove, req.body.newParentPage, req.body.pageSet).then( addedToNewParent =>{
      PageSet.findOne({_id: req.body.pageSet},{hasPages:1, _id:0})
        .populate('hasPages')
        .then(async pagesResult => {
          if (pagesResult) {
            console.log('pagesResult');
            console.log(pagesResult);
            let hierarchyOfPages = [];
            let pages=pagesResult.hasPages;
            if(pages.length!==0){
              for(let i=0;i<pages.length;i++){
                hierarchyOfPages.push({page: pages[i], subPages:await getHierarchyOfPages(pages[i])});
              }
              res.status(200).json({
                message: 'pages were found',
                hierarchyOfPages: hierarchyOfPages
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
    })
  })

});

async function getHierarchyOfPages(pageObj) {
  // console.log('getHierarchyOfPages');
  let page= await Page.findOne({_id: pageObj._id }).populate('hasSubPages');
  let subPagesOfSubPage=[];
  if(page) {
    console.log(page);
    if (page.hasSubPages && page.hasSubPages.length!==0) {
      let subPagesResult=page.hasSubPages;
      for(let i=0;i<subPagesResult.length; i++) {
        subPagesOfSubPage.push({page: subPagesResult[i], subPages:await getHierarchyOfPages(subPagesResult[i])});
      }
      return subPagesOfSubPage;
    } else {
      return subPagesOfSubPage;
    }
  }
}


module.exports = router;
