const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const session = require('express-session');

const router = express.Router();

require('../models/Users');
const User = mongoose.model('users');

router.get('/login', (req, res) => {
    res.render('users/login');
})

router.get('/register', (req, res) => {
    res.render('users/register');
})

router.post('/register', (req, res) => {
    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) {
                req.flash('error_msg', "Email already Registered! Try another...");
                res.redirect('/users/register');
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });
                bcrypt.genSalt(10, (error, salt) => {
                    bcrypt.hash(newUser.password, salt, (error, hash) => {
                        if (error) throw error;
                        else {
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', "You are now registered          login now!");
                                    res.redirect('/users/login');
                                })
                                .catch(err => {
                                    console.log(err);
                                    return;
                                })
                        }
                    })
                })
            }
        })
})

router.post('/login', function(req, res, next){
    passport.authenticate('local',{
    successRedirect: '/suggestions',
    failureRedirect: "/users/login",
    failureFlash: true
})(req, res, next);
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
})

module.exports = router;