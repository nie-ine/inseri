import jwt from 'jsonwebtoken';
const {SALT} = process.env;

export default (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[ 1 ];
        const decodedToken = jwt.verify(token, SALT);
        req.userData = { email: decodedToken.email, userId: decodedToken.userId };
        next();
    } catch (error) {
        res.status(401).json({message: 'Auth Failed'});
    }
};
