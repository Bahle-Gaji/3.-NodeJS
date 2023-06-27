"use strict";

module.exports = (req, res) => {
    var username = '';
    var data = req.flash('data')[0];

    if(typeof data != 'undefined'  ){
        username = data.username;
    }

    res.render('login', {
        error: req.flash('error'),
        username
    })
}