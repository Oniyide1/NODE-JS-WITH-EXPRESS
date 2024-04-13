// This function exports another function that takes in a middleware function 'func'.
// The returned function is a middleware itself, which when executed, runs 'func' and catches any errors, passing them to the 'next' middleware.
module.exports = (func) => {
    // Return a middleware function that executes the provided function
    return (req, res, next) => {
        // Execute the provided function and catch any errors
        func(req, res, next).catch(err => next(err)); 
    }  
}