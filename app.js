// Import necessary packages and modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const path = require('path')
const hbs = require('hbs')
const collection = require('./src/mongodb');
const { rmSync } = require('fs');
//const LogIn = require('./Models/LoginModel')
const templatePath = path.join(__dirname, './templates')
const bcrypt = require('bcrypt');
const CustomError = require('./Utils/CustomError');
const globalErrorHandler = require('./Controllers/errorController')
const asyncErrorHandler = require('./Utils/asyncErrorHandler');
const collect = require('./src/mongodb');

// Middleware to parse JSON bodies
app.use(express.json())

// Set the view engine to Handlebars
app.set("view engine", "hbs")

// Set the directory where views/templates are located
app.set("views", templatePath)

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({extended: true}))

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Render login page for the root route
app.get("/", (req, res) =>{
    res.render("login")
})



// Handle POST request for user login
app.post("/login", asyncErrorHandler(async(req, res, next) => {
    // Extract email and password from request body
    const email = req.body.email;
    const password = req.body.password;

    //Check if email & password is present in request body
    if(!email || !password){
        const error = new CustomError('Please provide email & Password for login in!', 400);
        return next(error);
    }

    //Check if user exists with given firstName
    const userDetails = await collect.findOne({ email });

    //const isMatch = await user.comparePasswordInDb(password, user.password);

    //check if the user exists & password matches
    if(!userDetails || !(await userDetails.comparePasswordInDb(password, userDetails.password))){
        const error = new CustomError('Incorrect email or password', 400);
        return next(error);
    }
    res.render("home")
}))


// Render signup page for '/signup' route
app.get("/signup", (req, res) => {
    res.render("signup")
})


// Handle POST request for user signup
app.post("/signup",asyncErrorHandler(async (req, res, next) => {
    const signupDetails = await collection.create(req.body);

    res.render("home")
}))



// Middleware for handling requests for undefined routes
app.all('*', (req, res, next) => {
    const err = new CustomError(`Can't find ${req.originalUrl} on the server!`, 404);
    next(err);
});

// Global error handling middleware
app.use(globalErrorHandler);


module.exports = app
