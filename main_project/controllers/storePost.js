"use strict";

const BlogPost = require('../models/BlogPost'),
    path = require('path');

module.exports = (req, res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, '../public/assets/img', image.name), async (error) => {
        await BlogPost.create({
            title: req.body.title,
            body: req.body.body,
            username: req.body.username,
            image: '/assets/img/' + image.name
        })
        res.redirect('/')
    })
}