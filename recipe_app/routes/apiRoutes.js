"use strict";

const usersController = require('../controllers/usersController'),
    course = require('../models/course'),
    router = require('express').Router(),
    coursesController = require('../controllers/coursesController');

// router.use(usersController.verifyToken);
router.post('/login', usersController.apiAuthenticate);
router.use(usersController.verifyJWT);
router.get('/courses/:id/join', coursesController.join, coursesController.respondJSON);
router.get('/courses', coursesController.index, coursesController.filterUserCourses, coursesController.respondJSON);
router.use(coursesController.errorJSON);


module.exports = router;