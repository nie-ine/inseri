const express = require('express');

const Page = require('../models/page');
const Query = require('../models/query');
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const checkAuth2 = require('../middleware/check-auth-without-immediate-response');
const router = express.Router();
const PageSet = require('../models/page-set');
const MyOwnJson = require('../models/myOwnJson');


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
    } else if ( req.loggedIn === false ) {
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
    .then(pageResult => {

        let newQueries = [];
        let m = 0;
        let oldAndNewServerUrls = [];
        let oldAndNewQueries = [];

        for ( const queryId of pageResult.queries ) {

          Query.findById( queryId )
            .then( query => {

              if ( query.method == 'JSON' ) {

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

                MyOwnJson.findById( query.serverUrl.split('/')[6] )
                  .then(myOwnJson => {

                      const newJson = new MyOwnJson({
                        creator: req.userData.userId,
                        content: myOwnJson.content
                      });

                      newJson.save()
                        .then(copiedMyOwnJson => {

                          let newServerUrl = 'http://localhost:3000/api/myOwnJson/getJson/' + copiedMyOwnJson._id;
                          oldAndNewServerUrls.push(
                            {
                              oldUrl: queryCopy.serverUrl,
                              newUrl: newServerUrl
                            }
                          );
                          queryCopy.serverUrl = newServerUrl;

                          queryCopy.save()
                            .then(resultQuery => {
                              newQueries[ m ] = resultQuery._id;
                              m += 1;
                              oldAndNewQueries.push(
                                {
                                  oldQuery: queryId,
                                  newQuery: resultQuery._id
                                }
                              );

                              if ( m === pageResult.queries.length ) {
                                updatePage(
                                  pageResult,
                                  newQueries, res, req, oldAndNewServerUrls, oldAndNewQueries )
                              }
                            })
                            .catch(error => {
                              res.status(500).json({
                                message: 'Query cannot be copied',
                                error: error
                              });
                            });

                        })
                        .catch(err => {
                          res.status(500).json({
                            error: err
                          })
                        });
                  })
                  .catch(error => {
                    res.status(500).json({
                      message: 'Fetching MyOwnJson failed',
                      error: error
                    })
                  })
              } else {
                newQueries[ m ] = queryId;
                m += 1;
                oldAndNewQueries.push(
                  {
                    oldQuery: queryId,
                    newQuery: queryId
                  }
                );
                if ( m === pageResult.queries.length ) {
                  updatePage( pageResult, newQueries, res, req, oldAndNewServerUrls, oldAndNewQueries );
                }
              }
            } );
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
  duplicate.save()
    .then(
      copiedPage => {
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

module.exports = router;
