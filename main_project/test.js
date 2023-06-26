"use strict";

const mongoose = require('mongoose'),
    BlogPost = require('./models/BlogPost')

mongoose.connect('mongodb://127.0.0.1/my_database', { useNewUrlParser: true });


// Commented out to prevent duplicates

BlogPost.create({
    title: 'The Mythbuster Guide to Saving Money on Energy Bills',
    body: 'If you have been here a long time, you might remember when I went on ITV Tonight to dispense a masterclass in saving money on energy bills. Energy-saving is one of my favourite money topics, because once you get past the boring bullet-point lists, a whole new world of thrifty nerdery opens up. You know those bullet-point lists. You start spotting them everything at this time of year. They go like this:',
    username: 'Bahle Gaji'
})
    .then(blogpost => console.log(blogpost))
    .catch(error => console.log(error));


//find all documents
// BlogPost.find({})
//     .then(blogpost => console.log(blogpost))
//     .catch(error => console.log(error));


//find particular title
// BlogPost.find({ title: 'The Mythbuster Guide to Saving Money on Energy Bills' })
//     .then(blogpost => console.log(blogpost))
//     .catch(error => console.log(error));


//find particular title with specific word
// BlogPost.find({ title: /The/ })
//     .then(blogpost => console.log(blogpost))
//     .catch(error => console.log(error));


//retrive single document with unique id
var id = '649777f25a69490ce44cc250';

// BlogPost.findById(id)
//     .then(blogpost => console.log(blogpost))
//     .catch(error => console.log(error));


//updating records
// BlogPost.findByIdAndUpdate(id, {
//     title: 'Updated Title'
// })
//     .then(blogpost => console.log(blogpost))
//     .catch(error => console.log(error));

//deleting records
// BlogPost.findByIdAndDelete(id)
// .then(blogpost => console.log(blogpost))
// .catch(error => console.log(error));
