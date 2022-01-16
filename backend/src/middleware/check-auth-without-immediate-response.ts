import jwt from 'jsonwebtoken';
const salt = require('../.settings/salt');

export default (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[ 1 ];
    const decodedToken = jwt.verify(token, salt.salt);
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    req.loggedIn = true;
    next();
  } catch (error) {
    req.loggedIn = false;
    next();
  }
};
