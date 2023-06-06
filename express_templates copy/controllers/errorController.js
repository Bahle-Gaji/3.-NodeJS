'use strict';

const httpStatus = require('http-status-codes');

exports.logErrors = (error, req, res, next) => {
    // console.log('logging error: ' + error);
    console.error(error.stack);
    next(error);
};

//404 status code, 'not found' error
exports.respondNoResourceFound = (req, res) => {
    let errorCode = httpStatus.NOT_FOUND;
    console.log('Error (404): ' + errorCode);
    res.status(errorCode);
    // res.send(`Error ${errorCode} | The Page Does Not Exist!`)
    res.sendFile(`./public/${errorCode}.html`, {
        root: './'
    })
};

// Catches all errors and responds with 500 status code
exports.respondInternalError = (error, req, res, next) => {
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    console.log(`***ERROR*** occurred: ${error.stack}`)
    res.status(errorCode);
    // res.send(`ERROR ${errorCode} | Sorry, our application is experiencing a problem :(`);
    res.sendFile(`./public/${errorCode}.html`, {
        root: './'
    })
};
