const jwt = require('jsonwebtoken');
const {createError} = require('../utils/error');
const {createSuccess} = require('../utils/success');

module.exports.verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log("token : " + req.cookies.access_token);
    if(!token){
        return next(createError(401, "Your are not authenticated!"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            return next(createError(403, "Invalid token!"));
        } else {
            req.user = user;
        }
        next();
    })
}

module.exports.verifyUser = (req, res, next) => {
    this.verifyToken(req, res, () => {
        if(req.user.id === req.params.id) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    })
}