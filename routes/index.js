const express = require('express');
const classController = require('../controller/classes');
const router = express.Router();
const userController = require('../controller/users');
const passport = require('../passportConfig');

const user = require('../models/users');
const classes = require('../models/classes');
const comments = require('../models/comments');
const users = require('../models/users');

//kd45UzTiPpcSHlSZ
/* GET home page. */

router.get('/', (req, res, next) => {
  if (res.locals.authenticate) {
    res.redirect('/dashboard')
  }
  else {
    res.redirect('/login')
  }
});

router.get('/dashboard', async (req, res, next) => {
  const usersList = await user.find();
  let teachersNo = 0
  usersList.forEach((i) => {
    if (i.teacher) {
      teachersNo += 1
    }
  })
  const classesList = await classes.find();
  console.log(classesList.length)
  const commentList = await comments.find();
  res.render('layout', {
    contentPage: './homepage/dashboard',
    usersList: usersList.reverse().slice(0, 8),
    teachers: teachersNo,
    noOfUsers: usersList.length,
    classesList: classesList.reverse().slice(0, 8),
    comments: commentList.length
  });
});

router.get('/login', (req, res, next) => {
  res.render('./login/signIn')
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});


router.get('/sign-up', (req, res, next) => {
  res.render('layout', {
    contentPage: './login/signUp'
  });
});

// router.post('/login', (req, res, next) => {
//   console.log(req.body)
// });

router.post('/login', passport.authenticate('login', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}));


router.post('/sign-up', userController.signUp)

router.post('/create-class', classController.createClass)

module.exports = router;
