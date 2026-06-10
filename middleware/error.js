const errorHandler = (err, req, res, next) => {
    console.error("Backend error: ")
    console.error(err.stack);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        message: err.message || "This error happened out of nowhere",
        stack: process.env.MODE === "PRODUCTION" ? undefined : err.stack
    })
}

module.exports = {
    errorHandler
}
