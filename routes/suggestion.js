require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');


const db = require('../config/database');

// Connecting to Database
mongoose.connect(db.mongoURI, {
    useNewUrlParser: true
}).then(function () {
    console.log('successfully connected to database');
}).catch((err) => console.log(err));

// acquiring Schema suggestion
require('../models/Suggestion');
const Suggestion = mongoose.model('suggestions');

// route for suggestions
router.get('/', ensureAuthenticated, function (req, res) {
    Suggestion.find({user: req.user.id})
        .sort({
            'date': 'desc'
        })
        .then(suggestions => {
            res.render('suggestion/index', {
                suggestions: suggestions, username: req.user.name.toUpperCase()
            })
        })

});

// route to add suggestion
router.get('/add', ensureAuthenticated, function (req, res) {
    res.render('suggestion/add');
});

// route to edit a suggestion
router.get('/edit/:id', ensureAuthenticated, function (req, res) {
    Suggestion.findOne({
            _id: req.params.id
        })
        .then(suggestion => {
            if(suggestion.user !== req.user.id){
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/suggestions');
            }else{
            res.render('suggestion/edit', {
                suggested: suggestion
            })
        }
        })
});

// route to post a suggestion
router.post('/', ensureAuthenticated, function (req, res) {
    const newUser = {
        title: req.body.title,
        suggestion: req.body.details,
        user: req.user.id
    }
    new Suggestion(newUser)
        .save()
        .then(suggestion => {
            req.flash('success_msg', "Suggestion Added");
            res.redirect('/suggestions');
        });
});

// updating Suggestions
router.put('/:id', ensureAuthenticated, function (req, res) {
    Suggestion.findOne({
            _id: req.params.id
        })
        .then(suggestion => {
            suggestion.title = req.body.title;
            suggestion.suggestion = req.body.details;

            suggestion.save()
                .then(suggestion => {
                    req.flash('success_msg', "Suggestion Updated");
                    res.redirect('/suggestions')
                })

        })
});

// Delete suggestions
router.delete('/:id', ensureAuthenticated, function (req, res) {
    Suggestion.deleteOne({
            _id: req.params.id
        })
        .then(() => {
            req.flash('error_msg', "Suggestion Removed");
            res.redirect('/suggestions')
        });
});

module.exports = router;
