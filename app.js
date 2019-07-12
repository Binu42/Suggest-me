const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();


// Handlebar Middleware {defaultLayout: 'main'}
app.engine('handlebars', exphbs({
    defaultLayout: "main"
}));
app.set('view engine', 'handlebars');

// Body-Parser Middleware
app.use(bodyParser.urlencoded({
    extended: true
}));

// method-override Middleware
app.use(methodOverride('_method'));

// To save session as cookies
app.use(session({
    secret: 'Hello world',
    resave: false,
    saveUninitialized: false
}))

// This passport middleware must be below express session 
app.use(passport.initialize());
app.use(passport.session());

// Load Routes
const suggestions = require('./routes/suggestion');
const users = require('./routes/users');
const admins = require('./routes/admin');

// Passport Config
require('./config/passport')(passport);

// To use static files like css, images
app.use(express.static("public"));

// To show Flash pop up on edit delete ....
app.use(flash());

// Global variables for flash
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
})

// To get home route
app.get('/', function (req, res) {
    const title = "WELCOME"
    res.render('index', {
        title: title
    });
});

// To get About Route
app.get('/about', function (req, res) {
    res.render('about');
})


// using middleware
app.use('/suggestions', suggestions);
app.use('/users', users);
app.use('/admins', admins);

// Listening to port
const port = 3000;
app.listen(process.env.PORT || port, () => {
    console.log(`Server is running at port ${port}`);
});