"use strict";

const User = require('../models/User'),
    bcrypt = require('bcrypt');

module.exports = (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username: username })
        .then(user => {
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) { // if passwords match
                    req.session.userId = user._id
                    res.redirect('/')
                } else {
                    res.redirect('/auth/login')
                }
            })
        })
        .catch(error => {
            console.log(error);
            res.redirect('/auth/login')
        })
}