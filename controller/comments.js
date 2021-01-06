'use strict';
const mongoose = require("../models/index");
const comments = require('../models/comments');
const user = require('../models/users')

const commentController = {};

commentController.postReplyComment = async (req, res, next) => {
    var currentdate = new Date()
    var month = currentdate.getMonth() + 1
    var datetime = month + "/" + currentdate.getDate() + "/" + currentdate.getFullYear() + " - "
        + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

    try {
        const userDetail = await user.findOne({
            username: res.locals.username
        });
        let commentsDetail = await comments.findById(req.body.idComment)

        let newReply = {
            user: userDetail.username,
            createDate: datetime,
            fullname: userDetail.firstName + " " + userDetail.lastName,
            text: req.body.comment,
        };
        commentsDetail.reply.push(newReply);
        const commentResult = await commentsDetail.save()
        console.log(commentResult)
        res.send(commentResult)
    } catch (err) {
        if (err)
            console.log(err);
    }
}

commentController.deleteComment = async (req, res, next) => {
    const data = req.body;
    console.log(data)
    try {
        await comments.deleteOne({
            _id: data.idComment
        });
        res.send("Comment deleted successfully")
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = commentController;