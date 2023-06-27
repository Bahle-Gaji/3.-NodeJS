"use strict";

module.exports = (req, res) => {
    res.render('register', {
        erroors: req.session.validationErrors
    })
}