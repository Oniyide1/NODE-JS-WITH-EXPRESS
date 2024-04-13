// Exporting a middleware function for global error handling.
module.exports = (error, req, res, next) => { 
    // Set default status code and status if not provided in the error object.
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';

    // Set HTTP status code and send JSON response with error details.
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message
    })
}