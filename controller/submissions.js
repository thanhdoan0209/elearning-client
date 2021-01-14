'use strict';
const mongoose = require("../models/index");
const submissions = require('../models/submissions');

const submissionController = {};

submissionController.postPointSubmission = async (req, res, next) => {
    try {
        let submission = await submissions.findById(req.body.idSubmission);
        submission.point = req.body.point;
        const submissionResult = await submission.save()
        console.log(submissionResult)
        res.send(submissionResult)
    } catch (err) {
        if (err)
            console.log(err);
    }
}

module.exports = submissionController;