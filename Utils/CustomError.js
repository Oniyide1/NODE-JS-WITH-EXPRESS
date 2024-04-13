// Define a custom error class 'CustomError' that extends the built-in 'Error' class.
// It takes a 'message' and a 'statusCode' as parameters to create custom error instances.
// 'statusCode' determines whether the error is categorized as a 'fail' or an 'error'.
// 'isOperational' flag indicates whether the error is operational or programming-related.
// 'captureStackTrace' captures the stack trace when an error instance is created.

class CustomError extends Error{
    constructor(message, statusCode){
        super(message);
        // Set the status code and status based on the provided 'statusCode'.
        this.statusCode = statusCode;
        this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';

        // Mark the error as operational.
        this.isOperational = true;

        // Capture the stack trace.
        Error.captureStackTrace(this, this.constructor);
    }
}


module.exports = CustomError;