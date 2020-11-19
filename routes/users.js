var express = require('express');
var router = express.Router();
const userController = require('../controller/users');

/* GET users listing. */
router.get('/1', function(req, res, next) {
  res.send('I AM USER 1');
});

router.get('/', userController.getAllUser);
router.get('/users-detail/:firstName', userController.getUserDetail);

module.exports = router;
