const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let settings = require('../.settings/mailDetails');
const User = require('../models/user');
const Action = require('../models/action');
const Query = require('../models/query');
let nodemailer = require('nodemailer');
const nieOsServer = require('../.settings/nieOsServer');
const multer = require("multer");


const checkAuth = require('../middleware/check-auth');
const salt = require('../.settings/salt');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/assets/img/team");
  },
  filename: (req, file, cb) => {
    const name = file.originalname;//req.file._id+"_"
    console.log("The expected filename form the multer package = " + Date.now() + "-" + name);
    cb(null, Date.now() + "-" + name);
  }
});

// Nur zum TESTEN --> UNBEDINGT WEGMACHEN, DA VERSCHLUESSELTES PASSWORT MITGESCHICKT WIRD!!!!!!!!!!
router.get('', (req, res, next) => {
  User.find()
    .then(user => {
      let message;
      if (user.length === 0) {
        message = 'No pages were found'
      } else if (user.length === 1) {
        message = 'One pages was found'
      } else {
        message = 'All pages were found'
      }
      res.status(200).json({
        message: message,
        user: user
      });
    });
});

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {

      // Tests if ID was found in the mongoDB
      if (user.length === 0) {
        return res.status(404).json({
          message: 'User with such an ID was not found!'
        })
      }

      // Response if user was found
      res.status(200).json({
        message: 'User was found!',
        user: {
          userId: user.userId,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          newsletter: user.newsletter,
          usrProfileFilePath: user.usrProfileFilePath
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    });
});

router.put('/:id', checkAuth, (req, res, next) => {
  let messages = [];

  // Tests if email address is invalid
  const emailPattern = /^\S+[@]\S+[.]\S+$/;
  if (!emailPattern.test(req.body.email)) {
    messages.push('Your email address is invalid!');
  }

  // Tests if first name is undefined, null or is empty string
  if (!Boolean(req.body.firstName)) {
    messages.push('Your first name is invalid!');
  }

  // Tests if last name is undefined, null or is empty string
  if (!Boolean(req.body.lastName)) {
    messages.push('Your last name is invalid');
  }

  // Attaches error messages to the response
  if (messages.length > 0) {
    return res.status(400).json({
      messages: messages
    });
  }

  // Searches after other users with same email addresses
  User.find({_id: {'$ne': req.body.userId}, email: req.body.email})
    .then((result) => {

      // Checks if other users with same email address were found
      if (result.length > 0) {
        return res.status(409).json({
          message: 'This email address is already taken!'
        });
      }

      // Updates user data
      User.findOneAndUpdate({_id: req.body.userId},
        {
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          newsletter: req.body.newsletter
        })
        .then((result) => {
          // Creates new token
          const token = jwt.sign(
            {
              email: req.body.email,
              userId: req.body.userId
            },
            salt.salt,
            {
              expiresIn: '1h'
            });
          res.status(200).json({
            token: token,
            expiresIn: '3600',
            firstName: req.body.firstName,
            userId: req.body.userId
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          })
        });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    });
});

router.put('/:id/pwd', checkAuth, (req, res, next) => {
  let messages = [];

  // Tests if old password input is undefined, null or is empty string
  if (!Boolean(req.body.oldPwd)) {
    messages.push('Your old password input is invalid!');
  }

  // Tests if new password input is undefined, null or is empty string
  if (!Boolean(req.body.newPwd)) {
    messages.push('Your new password input is invalid!');
  }

  // Attaches error messages to the response
  if (messages.length > 0) {
    return res.status(400).json({
      messages: messages
    });
  }

  // Tests if new password has minimum length
  const newPwdPattern = /^.{4,}$/;
  if (!newPwdPattern.test(req.body.newPwd)) {
    return res.status(400).json({
      message: 'Your new password should contain minimum 4 characters!'
    });
  }

  User.findById(req.body.userId)
    .then((user) => {

      const p1 = bcrypt.compare(req.body.newPwd, user.password);
      const p2 = bcrypt.compare(req.body.oldPwd, user.password);

      Promise.all([p1, p2]).then((result) => {
        // Tests if new password is the same as the old one
        if (!result[1]) {
          return res.status(400).json({
            message: 'Your old password input is wrong!'
          })
          // Tests if the password input is wrong
        } else if (result[0]) {
          return res.status(420).json({
            message: 'Your new password is the same as the old one!'
          })
          // In case new password is different and the password input is the same
        } else {
          // Create hash of new pwd
          bcrypt.hash(req.body.newPwd, 10)
            .then((hash => {
              // Find User in database and update pwd
              User.findOneAndUpdate({_id: req.body.userId},
                {
                  password: hash
                })
                .then(result => {
                  // Create response
                  res.status(201).json({
                    message: 'Pwd updated',
                  });
                });
            }))
            .catch(err => {
              res.status(500).json({
                error: err
              })
            });
        }
      })
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: 'Auth failed'
      });
    });
});

router.put('/:id/delete', checkAuth, (req, res, next) => {
  let messages = [];
  // Tests if old password input is undefined, null or is empty string
  if (!Boolean(req.body.oldPwd)) {
    messages.push('Your old password input is invalid!');
  }

  // Attaches error messages to the response
  if (messages.length > 0) {
    return res.status(400).json({
      messages: messages
    });
  }

  User.findById(req.body.userId)
    .then((user) => {

      const p1 = bcrypt.compare(req.body.oldPwd, user.password);

      Promise.all([p1]).then((result) => {
        // Tests if new password is the same as the old one
        if (!result[0]) {
          return res.status(400).json({
            message: 'Your old password input is wrong!'
          })
          // Tests if the password input is wrong
        } else if (result[0]) {
          let date = new Date();
          console.log(date);
          User.findOneAndUpdate({_id: req.body.userId},
            {
              delete: new Date()
            })
            .then(result => {
              // Create response
              res.status(201).json({
                message: 'User account will be deleted in 30 days',
              });
            });
        }
      })
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: 'Auth failed'
      });
    });
});

router.get('/:id/deactivate-newsletter', (req, res, next) => {
  User.findOneAndUpdate({_id: req.params.id},
    {
      newsletter: false
    })
    .then(result => {
      // Create response
      res.status(201).json({
        message: 'User does not receive newsletter anymore',
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: 'Did not find user'
      });
    });
});

router.get('/:email/reset-password', (req, res, next) => {
  User.findOne({email: req.params.email})
    .then(result => {

      const transporter = nodemailer.createTransport({
        host: 'mailgateway.zhdk.cloud.switch.ch',
        port: 587
      });

      const mailOptions = {
        from: result.email, // sender address
        to: result.email, // list of receivers
        subject: 'Reset Password', // Subject line
        text: 'Please klick on the following link to restore your password: \n\n' +
          nieOsServer.nieOSServer +
          '/reset-password?email=' +
          encodeURIComponent(result.email) +
          '&temp=' +
          encodeURIComponent(result.password).substring(0, result.email.length)
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res.status(401).json({yo: 'error'});
        } else {
          console.log('Message sent: ' + info.response);
          res.json({yo: info.response});
        }
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: 'Did not find user'
      });
    });
});

router.get('/:email/getUserByEmail', (req, res, next) => {
  User.findOne({email: req.params.email})
    .then(result => {
      console.log(result);
        res.status(201).json({
          message: 'User Successfully found ',
          user: result
        });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: 'Did not find user'
      });
    });
});

router.post('/:email/reset-password-set-new-password', (req, res, next) => {
  User.findOne({email: req.params.email})
    .then(result => {
      if (decodeURIComponent(
        encodeURIComponent(result.password)
          .substring(0, result.email.length)) == req.body.temp) {

        bcrypt.hash(req.body.newPwd, 10)
          .then((hash => {
            // Find User in database and update pwd
            User.findOneAndUpdate({email: req.params.email},
              {
                password: hash
              })
              .then(result => {
                // Create response
                res.status(201).json({
                  message: 'Pwd updated',
                });
              });
          }))
          .catch(err => {
            res.status(500).json({
              error: err
            })
          });
      }
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: 'Did not find user'
      });
    });
});


router.put('/:id/reactivate', (req, res, next) => {
  let messages = [];
  // Tests if old password input is undefined, null or is empty string
  if (!Boolean(req.body.oldPwd)) {
    messages.push('Your old password input is invalid!');
  }

  // Attaches error messages to the response
  if (messages.length > 0) {
    return res.status(400).json({
      messages: messages
    });
  }

  User.findById(req.body.userId)
    .then((user) => {

      const p1 = bcrypt.compare(req.body.oldPwd, user.password);

      Promise.all([p1]).then((result) => {
        // Tests if new password is the same as the old one
        if (!result[0]) {
          return res.status(400).json({
            message: 'Your old password input is wrong!'
          })
          // Tests if the password input is wrong
        } else if (result[0]) {
          let date = new Date();
          console.log(date);
          User.findOneAndUpdate({_id: req.body.userId},
            {
              delete: undefined
            })
            .then(result => {
              // Create response
              res.status(201).json({
                message: 'User account has been reactivated',
              });
            });
        }
      })
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: 'Auth failed'
      });
    });
});

router.get('/:id/actions', checkAuth, (req, res, next) => {
  Action.find({
    creator: req.params.id
  })
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

router.get('/:id/queries', checkAuth, (req, res, next) => {
  Query.find({
    creator: req.params.id
  })
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
      })
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching all queries failed',
        error: error
      })
    })
});

router.post('/signup/:newsLetter', multer({storage: storage}).single("file"), (req, res, next) => {
  // Tests if email address is invalid
  const emailPattern = /^\S+[@]\S+[.]\S+$/;
  console.log(req.body);
  console.log(req.param);
  console.log(req);
  if (!emailPattern.test(req.body.email)) {
    return res.status(400).json({
      message: 'Your email address is invalid!'
    });
  }

  // Searches after users that have the same email addresses
  User.find({email: req.body.email})
    .then((result) => {

      // Checks if other users with same email address were found
      if (result.length > 0) {
        return res.status(409).json({
          message: 'Email address already exists!'
        });
      }

      // Creates new user with hashed password
      bcrypt.hash(req.body.password, 10)
        .then(hashPwd => {
          let filePath = req.body.usrProfileFilePath;
          if (req.file) {
            console.log("uploaded a file ");
            console.log((req.file.filename));
            filePath = req.body.host + "/assets/img/team/" + req.file.filename;
            console.log(filePath);
          }
          const user = new User({
            email: req.body.email,
            password: hashPwd,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            newsletter: req.param.newsLetter,
            usrProfileFilePath: filePath
          });
          user.save()
            .then(result => {
              console.log(result);
              res.status(201).json({
                message: 'User was created',
                result: result
              });
            })
            .catch(err => {
              res.status(500).json({
                error: err
              })
            });
        });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    });
});

router.post('/login', (req, res, next) => {
  let fetchedUser;
  console.log('Login');
  User.findOne({email: req.body.email})
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Auth failed'
        })
      }
      if (user.delete) {
        return res.status(405).json({
          message: 'User has been deactivated'
        })
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      const token = jwt.sign(
        {
          email: fetchedUser.email,
          userId: fetchedUser._id
        },
        salt.salt,
        {
          expiresIn: '1h'
        });
      res.status(200).json({
        token: token,
        expiresIn: '3600',
        firstName: fetchedUser.firstName,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: 'Auth failed'
      });
    });
});

router.post('/updateUsrProfilePic/:email', multer({storage: storage}).single("file"), (req, res, next) => {
  let filePath = "";
  console.log(" final file Path is " + filePath);
  User.findOne({email: req.params.email}).then(userFound => {
    if (req.file) {
      filePath = req.body.hostname + "/assets/img/team/" + req.file.filename;
    } else if (!userFound.usrProfileFilePath) {
      filePath = req.body.usrProfileFilePath;
    } else {
      filePath = userFound.usrProfileFilePath;
    }
    User.findOneAndUpdate({email: req.params.email},
      {usrProfileFilePath: filePath})
      .then(result => {
        // Create response
        res.status(201).json({
          message: 'user profile photo updated',
        });
      })
  }).catch(err => {
    console.log(err);
    return res.status(401).json({
      message: 'Did not find user'
    });
  });

});


module.exports = router;
