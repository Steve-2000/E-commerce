const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const usermodel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter ur name']
    },
    email: {
        unique: true,
        type: String,
        required: [true, 'please enter ur email'],
        validate: [validator.isEmail, 'please enter valid email']
    },
    password: {
        type: String,
        required: true,
        maxlength: [8, 'password cannot exceed 8 characters'],
        select: false
    },
    role: {
        type: String,
        default: 'user'
    },
    avatar: {
        type: String,

    },

    resetpasswordtoken: String,
    resetpasswordexpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
}

);
usermodel.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();

    }
    this.password = await bcrypt.hash(this.password, 10);
    next();

})
usermodel.methods.getjwttoken = function () {
    return jwt.sign({ id: this.id, email: this.email }, process.env.jwtSecret, {
        expiresIn: process.env.jwtExpireTime

    })
}
usermodel.methods.getresetToken = function () {
    const resettoken = crypto.randomBytes(20).toString('hex');
    this.resetpasswordtoken = crypto.createHash('sha256').update(resettoken).digest("hex")
    this.resetpasswordexpire = Date.now() + 30 * 60 * 1000;
    return resettoken;
}
module.exports = mongoose.model('user', usermodel)








