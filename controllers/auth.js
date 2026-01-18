const userModel = require('../model/usermodel');
const errorhandler = require('../utils/errorhandler');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const response = require('../utils/webtoken');
const sendEmail = require('../utils/nodemailer');
const usermodel = require('../model/usermodel');
// const crypto = require('crypto');

exports.registeruser = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body
        let avatar;
        if(req.file){
            avatar=`${process.env.imageurl}/Data/uploads/${req.file.filename}`;

        }

        const user = await userModel.create({
            name,
            email,
            password,
            role,
            avatar
        })
        response(res, user, 201)
    } catch (err) {
        next(err)
    }


}

exports.loginuser = async (req, res, next) => {

    try {
        const { email, password } = req.body
        if (!email || !password) {
            return next(new errorhandler('please enter email and password', 400))
        }
        const user = await userModel.findOne({ email }).select('+password')
        if (!user) {
            return next(new errorhandler('invalid email or password', 401))
        }
        const checkpassword = await bcrypt.compare(password, user.password)
        if (!checkpassword) {
            return next(new errorhandler('invalid email or password', 401))
        }

        response(res, user, 200)



    } catch (err) {
        next(err)
    }


}
exports.logoutuser = async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
        .status(200).json({
            success: true,
            message: "logged out successfully"
        })

}
exports.forgotpassword = async (req, res, next) => {

    const user = await userModel.findOne({ email: req.body.email })
    if (!user) {
        return next(new errorhandler("user mail not correct", 400))
    }
    const usertoken = user.getresetToken()
    await user.save({ validateBeforeSave: false })
    const URL = `${process.env.front_end}/password/reset/${usertoken}`
    const message = `Your password reset token is as follows:\n\n${URL}\n\nIf you have not requested this email then please ignore it.`
    try {
        await sendEmail({
            to: user.email,
            subject: "password recovery",
            message,
        })
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully.`
        })

    } catch (err) {
        user.resetpasswordtoken = undefined;
        user.resetpasswordexpire = undefined;
        await user.save({ validateBeforeSave: false })
        return next(new errorhandler(err.message, 500))
    }
}
exports.resetpassword = async (req, res, next) => {
    const passwordtoken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await userModel.findOne({
        resetpasswordtoken: passwordtoken,
        resetpasswordexpire: { $gt: Date.now() }
        ,
    })
    if (!user) {
        return next(new errorhandler("reset password token not correct or expired wage", 400))
    }
    if (req.body.password !== req.body.confirmpassword) {
        return next(new errorhandler("passwords not match", 400));
    }
    user.password = req.body.password;
    user.resetpasswordtoken = undefined;
    user.resetpasswordexpire = undefined;
    await user.save({ validateBeforeSave: false });
    response(res, user, 200);


}

// user profile 

exports.getuserprofile = async (req, res, next) => {
    const userid = req.user.id;

    const userdata = await userModel.findById(userid);
    res.status(200).json({
        success: true,
        user: userdata
    })

}
// password change
exports.passwordchange = async (req, res, next) => {
    const userid = req.user.id

    const user = await userModel.findById(userid).select("+password");
    const oldpassword = req.body.password;
    const checkpassword = await bcrypt.compare(oldpassword, user.password)
    if (!checkpassword) {
        return next(new errorhandler("old password is incorrect", 400))
    }
    if (req.body.newpassword == req.body.confirmpassword) {
        user.password = req.body.newpassword

        await user.save({ validateBeforeSave: false });
        response(res, user, 200)
        next()

    }
    else {
        return next(new errorhandler("passwords do not match", 400))
    }



}

//update user profile
const updateuserprofile = async (req, res, next) => {
    const userid = req.user.id
      let avatar;
        if(req.file){
            avatar=`${process.env.imageurl}/Data/uploads/${req.file.filename}`;

        }
    const updateddata = {
        name: req.body.name,
        email: req.body.email,
        avatar,
    }

    const user = await usermodel.findByIdAndUpdate(userid, updateddata, {
        new: true,
        runValidators: true,
    })
    response(res, user, 200)



}
exports.updateuserprofile = updateuserprofile;


//admin
//get all userS
exports.getallusers = async (req, res, next) => {
    const user = await usermodel.find()
    res.status(200).json({
        success: true,
        count: user.length,
        user,
    })

}
//get single user
exports.singleuser = async (req, res, next) => {
    const user = await userModel.findById(req.params.id);
    if (!user) {
        return next(err)
    }
    res.status(200).json({
        success: true,
        user,
    })
}
//update user role
exports.updateuser = async (req, res, next) => {
    const updateddata = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    }
    const user = await userModel.findByIdAndUpdate(req.params.id, updateddata, {
        new: true,
        runValidators: true,

    })
    res.status(200).json({
        success: true,
        user,
    })

}
//delete user
exports.userdelete = async (req, res, next) => {
    const user = await userModel.findById(req.params.id);
    if (!user) {
        return next(new errorhandler("user not found", 400))
    }
    await user.deleteOne();
    res.status(200).json({
        success: true,
        message: "user deleted successfully",
        user
    })



}
