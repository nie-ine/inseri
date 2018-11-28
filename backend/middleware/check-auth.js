const jwt = require('jsonwebtoken');
const salt = require('../.settings/salt');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[ 1 ];
        const decodedToken = jwt.verify(token, salt.salt);
        req.userData = { email: decodedToken.email, userId: decodedToken.userId };
        next();
    } catch (error) {
        res.status(401).json({message: ' Auth Failed'});
    }
};
