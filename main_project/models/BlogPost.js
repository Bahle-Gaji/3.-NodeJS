"use strict";

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    BlogPostSchema = new Schema({
        title: String,
        body: String,
        username: String,
        datePosted: {
            type: Date,
            default: new Date()
        },
        image: String
    });

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost