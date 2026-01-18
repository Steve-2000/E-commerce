const jwt = require('jsonwebtoken');
const errorhandler = require('../utils/errorhandler');
const userModel = require('../model/usermodel');
exports.authenticateduser = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return next(new errorhandler('please login to access this resource', 401))
        }
        const decode = jwt.verify(token, process.env.jwtSecret)
        req.user = await userModel.findById(decode.id);
        next();

    } catch (err) {
        next(err)

    }

}
exports.isauthorizedUser = (...roles) => {
    return (req, res, next) => {
        console.log('User role:', req.user.role);
        if (!roles.includes(req.user.role)) {
            return next(new errorhandler(`role:${req.user.role} is not allowed to access this resource`, 403))
        }
        next()

    }


}