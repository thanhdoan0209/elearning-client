const express = require('express');
const classController = require('../controller/classes');
const router = express.Router();
const userController = require('../controller/users');

//kd45UzTiPpcSHlSZ
/* GET home page. */

router.get('/', (req, res, next) => {
  res.render('layout', {
    contentPage: './homepage/home'
  });
});

router.get('/login', (req, res, next) => {
  res.render('layout', {
    contentPage: './login/signIn'
  });
});

router.get('/login/sign-up', (req, res, next) => {
  res.render('layout', {
    contentPage: './login/signUp'
  });
});

router.post('/login', userController.signIn);

router.get('/user', userController.getUser);

router.post('/login/sign-up', userController.signUp)

router.post('/create-class', classController.createClass)

module.exports = router;
