const express = require('express');
const classController = require('../controller/classes');
const router = express.Router();
const userController = require('../controller/users');
const passport = require('../passportConfig');

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
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));


router.post('/sign-up', userController.signUp)

router.post('/create-class', classController.createClass)

module.exports = router;
