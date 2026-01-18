

const response = (res, user, statuscode) => {
    const token = user.getjwttoken()


    const settings = {
        expires: new Date(Date.now() + process.env.cookieExpireTime * 24 * 60 * 60 * 1000),
        httpOnly: true,

    }
    return res.status(statuscode).cookie("token", token, settings)
        .json({

            success: true,
            user,
            token

        }
        )
}
module.exports = response;