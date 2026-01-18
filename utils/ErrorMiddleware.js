const ErrorMiddleware = (err, req, res, next) => {
    // Map common Mongoose errors to correct HTTP status codes first
    if (err && err.name === 'ValidationError') {
        err.statuscode = 400;
    } else if (err && err.name === 'CastError') {
        err.statuscode = 400;
    } else if (err.code === 11000) {
        const message = `${Object.keys(err.keyValue)[0]} already exists`;
        return res.status(400).json({
            success: false,
            message: message
        });
    }

    else {
        err.statuscode = err.statuscode || 500;
    }

    if (process.env.env_mode === "development") {
        return res.status(err.statuscode).json({
            success: false,
            message: err.message,
            error: err,
            stack: err.stack,
            env: process.env.env_mode,
        });
    }

    if (process.env.env_mode === "production") {
        if (err.name === "ValidationError" && err.errors) {
            const messages = Object.values(err.errors).map((e) => e.message);
            console.log('Validation errors:', messages, err.errors);
            return res.status(400).json({
                success: false,
                message: messages.join(", ").split(",")
            });
        }

        if (err.name === "CastError") {
            // const messages=Object.values(err.errors).map((e)=>e.path)
            // console.log('CastError details:', messages,err.value);


            return res.status(err.statuscode).json({
                success: false,
                message: `Resource not found. Invalid: ${err.path}+ with value ${err.value}`,

            });
        }

        res.status(err.statuscode).json({
            success: false,
            message: err.message || "An error occurred.",
        })
    }

    ;
};
module.exports = ErrorMiddleware;