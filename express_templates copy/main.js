'use strict';

const express = require('express'),
    app = express(),
    homeController = require('./controllers/homeController'),
    errorController = require('./controllers/errorController'),
    layouts = require('express-ejs-layouts');

app.use(layouts);
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

app.use((req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
});
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.set('port', process.env.PORT || 3000);

// app.get('/items/:vegetable', homeController.sendReqParam);
app.get('/name/:myName', homeController.respondWithName);


// app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get('port'), () => {
    console.log(`The Express.js server has started and is listening on port number: ${app.get('port')}`);
});