const express = require('express');

const Query = require('../models/query');

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get('',  checkAuth, (req, res, next) => {
    Query.find()
        .then(queries => {
            let message;
            if (queries.length === 0) {
                message = 'No queries were found'
            } else if (queries.length === 1) {
                message = 'One query was found'
            } else {
                message = 'All queries were found'
            }
            res.status(200).json({
                message: message,
                queries: queries
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Fetching queries failed',
                error: error
            })
        })
});

router.get('/:id', checkAuth, (req, res, next) => {
    Query.findById(req.params.id)
        .then(result => {
            if (result) {
                res.status(200).json({
                    message: 'Query was found',
                    query: result
                });
            } else {
                res.status(404).json({
                    message: 'Query was not found'
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Fetching query failed',
                error: error
            })
        })
});

router.put('/:id', (req, res, next) => {
    Query.update({ _id: req.params.id}, {
      title: req.body.title,
      description: req.body.description,
      serverUrl: req.body.serverUrl,
      method: req.body.method,
      params: req.body.params,
      header: req.body.header,
      body: req.body.body,
      path: req.body.chosenPath
    }, {new:true})
      .then(updatedQuery => {
        res.status(200).json({
          message: 'Query was updated successfully',
          query: updatedQuery
        });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Query cannot be updated',
          error: error
        });
      })
});

router.delete('/:id', checkAuth, (req, res, next) => {
    // Only deletes the query if it is not bound to a page
    Query.deleteOne({
        _id: req.params.id,
        isBoundToPage: false
    })
        .then((deletedQuery) => {
            if (deletedQuery.n === 0) {
                return res.status(400).json({
                    message: 'Query cannot be deleted'
                });
            } else {
                res.status(200).json({
                    message: 'Query was deleted'
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Deleting query failed',
                error: error
            })
        });
});

module.exports = router;
