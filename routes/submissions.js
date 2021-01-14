const express = require('express');
const router = express.Router();
const submissionController = require('../controller/submissions');

router.post('/add-point/:_id', submissionController.postPointSubmission);

module.exports = router;
