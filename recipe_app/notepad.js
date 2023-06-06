"use strict";

// //--------REQUIRE MONGOOSE DB--------

const mongoose = require("mongoose"),
    Subscriber = require("./models/subscriber");
    User = require('./models/user');
mongoose.connect(
    "mongodb://127.0.0.1:27017/recipe_db",
    { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;


// //--------CREATE SUBSCRIBER--------

// Subscriber.create({
//     name: "Jon",
//     email: "jon@jonwexler",
//     zipCode: 10001
// })
//     .then((result) => {
//         console.log("result");
//         console.log(result);
//     })
//     .catch((err) => {
//         console.log("err");
//         console.log(err);
//     })


// //--------FIND SUBSCRIBER--------
// var subscriber;
// Subscriber.findOne({
//     name: "Jon"
// })
//     .then(result => {
//         subscriber = result;
//         console.log(subscriber.getInfo());
//     })
//     .catch(err => {
//         console.log('error occurred');
//         console.log(err);
//     })


// //--------FIND SUBSCRIBERS IN SAME AREA AS NAME--------

// Subscriber.findOne({
//     name: "Jon"
// })
//     .then(subscr => {
//         console.log(subscr.getInfo());
//         console.log("all subscribers in the same area as Jon");
//         subscr.findLocalSubscribers()
//             .then(result => {
//                 console.log("result of local sub");
//                 console.log(result);
//             })
//     })
//     .catch(error => {
//         console.log("error occurred");
//         console.log(error);
//     })


// //--------CREATING COURSES--------

// const Course = require("./models/course");
// var testCourse, testSubscriber;
// Course.create({
//     title: "Tomato Land",
//     description: "Locally farmed tomatoes only",
//     zipCode: 12345,
//     items: ["cherry", "heirloom"]
// }).then(course => testCourse = course);

// Subscriber.findOne({})
// .then(subscriber => 
//     testSubscriber = subscriber
// );

// testSubscriber.courses.push(testCourse._id);
// testSubscriber.save();

// Subscriber.populate(testSubscriber, "courses")
// .then(subscriber =>
//     console.log(subscriber)
// );



// //-------FINDING ALL SUBSCRIBERS SUBBED TO A COURSE (USING OBJECT_-ID)-------

console.log(Subscriber.find({ course: new mongoose.Types.ObjectId("5986b8aad7f31c479a983b42") }));



//--------CREATE NEW USER--------

var testUser;
User.create({
    name: {
        first: "Jon",
        last: "Wexler"
    },
    email: 'jon@jonwexler.com',
    zipCode: 10002,
    password: 'pass123'
})
    .then(user => testUser = user, console.log(testUser))
    .catch(error => console.log(error.message));


//--------CREATING USER AND CONNENCTING TO SUBSCRIBER--------

var testUser;
User.create({
    name: {
        first: "Jon",
        last: "Wexler "
    },
    email: "jon@jonwexler.com",
    zipCode: 10002,
    password: "pass123"
})
    .then(user => {
        testUser = user;
        return Subscriber.findOne({
            email: user.email
        });
    })
    .then(subscriber => {
        testUser.subscribedAccount = subscriber;
        testUser.save().then(user => console.log("user updated"));
    })
    .catch(error => console.log(error.message));


