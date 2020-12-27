var express = require('express');
var router = express.Router();
const userController = require('../controller/users');
const user = require('../models/users');


/* GET users listing. */
router.get('/1', function (req, res, next) {
  res.send('I AM USER 1');
});

router.get('/', userController.getAllUser);

router.get('/ajax-users', async (req, res, next) => {
  const users = await user.find();
  res.send(users);
})

router.post('/ajax-users/add', userController.postInviteUser)

router.get('/user-detail/:username', userController.getUserDetail);

module.exports = router;
