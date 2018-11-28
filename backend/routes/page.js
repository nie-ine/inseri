const express = require('express');

const Page = require('../models/page');
const Query = require('../models/query');

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

// Nur zum TESTEN
router.get('', checkAuth, (req, res, next) => {
    Page.find()
        .then(pages => {
            let message;
            if (pages.length === 0) {
                message = 'No pages were found'
            } else if (pages.length === 1) {
                message = 'One pages was found'
            } else {
                message = 'All pages were found'
            }
            res.status(200).json({
                message: message,
                pages: pages
            });
        });
});

router.get('/:id', checkAuth, (req, res, next) => {
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
    let messages = [];
    // Tests if title is undefined, null or is empty string
    if (!Boolean(req.body.title)) messages.push('Your title is invalid!');

    // Tests if server url is undefined, null or is empty string
    if (!Boolean(req.body.serverUrl)) messages.push('Your server URL is invalid!');

    // Tests if url extension is undefined, null or is empty string
    if (!Boolean(req.body.urlExtension)) messages.push('Your URL extension is invalid!');

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
                serverUrl: req.body.serverUrl,
                urlExtension: req.body.urlExtension,
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

router.put('/:pageID/queries/:queryID', checkAuth, (req, res, next) => {
    let messages = [];
    // Tests if title is undefined, null or is empty string
    if (!Boolean(req.body.title)) messages.push('Your title is invalid!');

    // Tests if server url is undefined, null or is empty string
    if (!Boolean(req.body.serverUrl)) messages.push('Your server URL is invalid!');

    // Tests if url extension is undefined, null or is empty string
    if (!Boolean(req.body.urlExtension)) messages.push('Your URL extension is invalid!');

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
                    serverUrl: req.body.serverUrl,
                    urlExtension: req.body.urlExtension
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
                                    message: 'Page updated successfully'
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
    Page.findByIdAndUpdate({_id: req.params.id}, {
        openApps: req.body.openApps
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

module.exports = router;
