const express = require('express');
const classController = require('../controller/classes');
const router = express.Router();
const user = require('../models/users');
const { route } = require('./users');

//kd45UzTiPpcSHlSZ
/* GET home page. */

router.get('/', classController.getAllClass)

router.get('/create-class', (req, res, next) => {
  res.render('layout', {
    contentPage: './classes/createClass'
  });
});


router.post('/create-class', classController.createClass);

router.post('/class-detail/:classCode/courses/add-exercise', classController.postAddExercise)

router.post('/class-detail/:classCode/courses/:_id', classController.postAddExercise);


router.get('/class-detail/:classCode', classController.getClassDetail);

router.get('/class-detail/:classCode/courses', classController.getClassDetailCourses);

router.get('/class-detail/:classCode/courses/add-exercise', classController.getAddExercise);

router.get('/class-detail/:classCode/courses/:_id', classController.getExerciseDetail);

router.get('/class-detail/:classCode/people', classController.getClassDetailPeople);

router.get('/user', async (req, res, next) => {
  const users = await user.find();
  res.send(users);
})

module.exports = router;
