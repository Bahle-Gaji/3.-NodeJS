"use strict";

const http = require('http'),
    express = require('express'),
    ejs = require('ejs'),
    mongoose = require('mongoose'),
    fileUpload = require('express-fileupload'),
    expressSession = require("express-session"),
    flash = require('connect-flash'),
    newPostController = require('./controllers/newPost'),
    homeController = require('./controllers/home'),
    storePostController = require('./controllers/storePost'),
    getPostController = require('./controllers/getPost'),
    newUserController = require('./controllers/newUsers'),
    storeUserController = require('./controllers/storeUser'),
    loginController = require('./controllers/login'),
    loginUserController = require('./controllers/loginUser'),
    logoutController = require('./controllers/logout'),
    validateMiddleware = require('./middleware/validateMiddleware'),
    authMididleware = require('./middleware/authMiddleware'),
    redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware'),
    app = new express();

mongoose.connect('mongodb://127.0.0.1/my_database',
    { useNewUrlParser: true }
);


global.loggedIn = null;

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded());
app.use(expressSession({
    secret: 'keyboard cat'
}));
app.use('*', (req, res, next) => {
    loggedIn = req.session.userId;
    next()
});
app.use(flash());
app.use('posts/store', validateMiddleware);


app.get('/', homeController);

app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.get('/auth/logout', logoutController);

app.get('/posts/new', authMididleware, newPostController);
app.get('/post/:id', getPostController);
app.post('/posts/store', authMididleware, storePostController);

app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);


app.get('/about', (req, res) => {
    res.render('about');
})
app.get('/contact', (req, res) => {
    res.render('contact');
})

app.use((req, res) => res.render('notFound'));


app.listen(4000, () => console.log('App listening on port 4000'));