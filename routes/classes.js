const express = require('express');
const classController = require('../controller/classes');
const router = express.Router();

//kd45UzTiPpcSHlSZ
/* GET home page. */

router.get('/', classController.getAllClass)

router.get('/create-class', (req, res, next) => {
  res.render('layout', {
    contentPage: './classes/createClass'
  });
});

router.post('/create-class', classController.createClass);

router.get('/class-detail/:classCode', classController.getClassDetail);


module.exports = router;
