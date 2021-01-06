const express = require('express');
const router = express.Router();
const commentController = require('../controller/comments');

router.post('/reply-comment/:_id', commentController.postReplyComment);

router.delete('/delete/:_id', commentController.deleteComment)

module.exports = router;
