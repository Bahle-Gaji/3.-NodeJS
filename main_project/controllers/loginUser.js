"use strict";

const User = require('../models/User'),
    bcrypt = require('bcrypt');

module.exports = (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username: username })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (error, same) => {
                    if (same) { // if passwords match
                        req.session.userId = user._id
                        res.redirect('/')
                    } else {
                        req.flash('error', "Incorrect Password. Please enter correct password")
                        req.flash('data', req.body)
                        res.redirect('/auth/login')
                    }
                })
            }
            else {
                req.flash('error', "Invalid Username")
                res.redirect('/auth/login');
            }
        }
        )
}