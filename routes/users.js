var express = require('express');
var router = express.Router();
const userController = require('../controller/users');
const user = require('../models/users');
const classes = require('../models/classes');


/* GET users listing. */
router.get('/1', function (req, res, next) {
  res.send('I AM USER 1');
});


router.get('/', userController.getAllUser);

router.get('/user-detail/:username', userController.getUserDetail);

router.get('/ajax-users', userController.getInviteUser)

router.get('/ajax-teachers', userController.getInviteTeacher)

router.post('/ajax-users/add', userController.postInviteUser)

router.post('/ajax-teachers/add', userController.postInviteTeacher)

module.exports = router;
