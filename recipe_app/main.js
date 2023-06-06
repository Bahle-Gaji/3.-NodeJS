"use strict";

// const MongoDB = require('mongodb').MongoClient,
//     dbURL = 'mongodb://127.0.0.1:27017',
//     dbName = 'recipe_db';

// MongoDB.connect(dbURL, (error, client) => {
//     if (error) throw error;
//     let db = client.db(dbName);
//     db.collection('contacts')
//         .find()
//         .toArray((error, data) => {
//             if (error) throw error;
//             console.log("reached here");
//             console.log(data);
//         });

//     db.collection('contacts')
//         .insert({
//             name: 'Freddie Mercury',
//             email: 'fred@queen.com'
//         }, (error, db) => {
//             if (error) throw error;
//             console.log(db);
//         });
// });

//--------Imports--------
const express = require("express"),
    app = express(),
    router = require('./routes/index'),
    layouts = require("express-ejs-layouts"),
    mongoose = require("mongoose"),
    Subscriber = require("./models/subscriber"),
    methodOverride = require("method-override"),
    expressSession = require("express-session"),
    cookieParser = require("cookie-parser"),
    connectFlash = require("connect-flash"),
    expressValidator = require("express-validator"),
    passport = require("passport"),
    User = require("./models/user");


//--------Connecting to Mongo server and database--------
mongoose.connect(
    "mongodb://127.0.0.1:27017/recipe_db",
    { useNewUrlParser: true }
);
const db = mongoose.connection;

db.once('open', () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);

app.use(express.json());
app.use(cookieParser("secret_passcode"));
app.use(
  expressSession({
    secret: "secret_passcode",
    cookie: {
      maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(connectFlash());

app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});
app.use(expressValidator());

app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});