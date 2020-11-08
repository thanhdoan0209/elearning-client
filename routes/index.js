const express = require('express');
const router = express.Router();
const userController = require('../controller/users');

//kd45UzTiPpcSHlSZ
/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', (req, res, next) => {
  res.render('layout', {
    contentPage: './homepage/home'
  });
});

router.get('/class', (req, res, next) => {
  res.render('layout', {
    contentPage: './class/class'
  });
});

router.get('/classes', (req, res, next) => {
  res.render('layout', {
    contentPage: './classes/index'
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

module.exports = router;
