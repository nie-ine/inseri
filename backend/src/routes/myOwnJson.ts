import express from 'express';
import MyOwnJson from '../models/myOwnJson';
import checkAuth from '../middleware/check-auth';
import checkAuth2 from '../middleware/check-auth-without-immediate-response';

const router = express.Router();

router.get('/newJson', checkAuth, (req, res, next) => {
  console.log( 'Create New Json' );
  const myOwnJson = new MyOwnJson({
    creator: req.userData.userId,
    content: {
      info: 'please place your content below in this object (content)'
    }
  });
  myOwnJson.save()
    .then(result => {
      res.status(201).json({
        message: 'myOwnJson was created',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    });
});

router.get('/getJson/:id', checkAuth2, (req, res, next) => {
  if ( req.loggedIn ) {
    MyOwnJson.findById(req.params.id)
      .then(result => {
        if (result) {
          res.status(200).json({
            message: 'MyOwnJson was found',
            result: result
          });
        } else {
          res.status(404).json({
            message: 'MyOwnJson was not found'
          });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: 'Fetching MyOwnJson failed',
          error: error
        })
      })
  } else {
    MyOwnJson.findById(req.params.id)
      .then(result => {
        console.log( result, 'PUBLISHED?' );
        if (result && result.published) {
          res.status(200).json({
            message: 'MyOwnJson was found',
            result: result
          });
        } else {
          res.status(404).json({
            message: 'MyOwnJson was not found'
          });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: 'Fetching MyOwnJson failed',
          error: error
        })
      })
  }

});

router.put('/updateJson/:id', checkAuth, (req, res, next) => {
  console.log(req.body);
  MyOwnJson.findOneAndUpdate(
    {_id: req.params.id},
    {
      content: req.body.content
    }, {
      new: true
    })
    .then((resultJSON) => {
      res.status(200).json({
        message: 'JSON was updated successfully',
        JSON: resultJSON
      });
    })
    .catch(error => {
      res.status(400).json({
        message: 'JSON cannot be updated'
      });
    });
});

router.put('/updateFile/:id', checkAuth, (req, res, next) => {
  // console.log(req.body, Object.keys(req.body)[0]);
  MyOwnJson.find( {_id: req.params.id} )
    .then( result => {
        console.log( result[ 0 ].content.info );
        const newValue = result[ 0 ].content.info;
        newValue[ Object.keys(req.body)[0] ] = req.body[ Object.keys(req.body)[0] ];
        MyOwnJson.findOneAndUpdate(
          {_id: req.params.id},
          {
            content: {
              info: newValue
            }
          }, {
            new: true
          })
          .then((resultJSON) => {
            res.status(200).json({
              message: 'JSON was updated successfully',
              JSON: resultJSON
            });
          })
          .catch(error => {
            res.status(400).json({
              message: 'JSON cannot be updated'
            });
          });
    }
    );
});

router.put('/publishJSON/:id', checkAuth, (req, res, next) => {
  MyOwnJson.update({ _id: req.params.id}, {
    published: req.body.published
  }, {new:true})
    .then(updatedJson => {
      console.log( updatedJson );
      res.status(200).json({
        message: 'myOwnJson was updated successfully',
        query: updatedJson
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'myOwnJson cannot be updated',
        error: error
      });
    })
});

export default router;
