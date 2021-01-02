var express = require('express');
var router = express.Router();
const userController = require('../controller/users');


/* GET users listing. */
router.get('/1', function (req, res, next) {
  res.send('I AM USER 1');
});


router.get('/', userController.getAllUser);

router.get('/user-detail/:username', userController.getUserDetail);

router.get('/user-detail/edit/:username', userController.getEditUserDetail);

router.get('/ajax-users', userController.getInviteUser)

router.get('/ajax-teachers', userController.getInviteTeacher)

router.post('/ajax-users/add', userController.postInviteUser)

router.post('/ajax-teachers/add', userController.postInviteTeacher)

router.post('/user-detail/edit/:username', userController.postEditUserDetail);

router.post('/user-detail/set-teacher/:username', userController.postSetTeacher);

router.post('/user-detail/unset-teacher/:username', userController.postUnsetTeacher);

router.delete('/user-detail/delete/:username', userController.deleteUser)

module.exports = router;
