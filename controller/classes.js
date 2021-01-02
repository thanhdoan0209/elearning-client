'use strict';
const mongoose = require("../models/index");
const classes = require('../models/classes');
const exercises = require('../models/exercises');
const submissions = require('../models/submissions')
const comments = require('../models/comments')

//https://www.npmjs.com/package/dotenv
const cloudinary = require("cloudinary");
require('dotenv').config()
const formidable = require('formidable');


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const classController = {};

classController.getAllClass = async (req, res, next) => {
    try {
        const classesList = await classes.find();
        res.render('layout', {
            contentPage: '../views/classes/classes',
            classesList: classesList
        })
    } catch (err) {
        console.log(err);
        throw err;
    }
}

classController.createClass = async (req, res, next) => {
    const classData = req.body
    const newClass = new classes({
        className: classData.className,
        classCode: classData.classCode,
        numberOfStudent: classData.numberOfStudent,
        classStudents: [],
        classTeachers: [res.locals.username]
    });
    try {
        const classes = await newClass.save();
        console.log(classes)
        res.redirect("/classes/")
    } catch (err) {
        if (err)
            console.log(err);
    }
}

classController.postEditClass = async (req, res, next) => {
    const classData = req.body
    let classExist = await classes.findOne({
        classCode: req.params.classCode
    })
    try {
        classExist.classCode = classData.classCode;
        classExist.className = classData.className;
        classExist.numberOfStudent = classData.numberOfStudent;
        const classResult = await classExist.save();
        console.log(classResult)
        res.redirect("/classes/class-detail/" + classData.classCode)
    } catch (err) {
        if (err)
            console.log(err);
    }
}

classController.getClassDetail = async (req, res, next) => {
    const classCode = req.params.classCode;
    try {
        const classDetail = await classes.findOne({
            classCode: classCode
        });
        const listComments = await comments.find({
            classCode: classCode
        })

        res.render('layout', {
            contentPage: '../views/classes/classDetailAdmin',
            classDetail: classDetail,
            listComments: listComments.reverse()
        })
    } catch (err) {
        console.log(err);
        throw err;
    }
}

classController.getEditClassDetail = async (req, res, next) => {
    const classCode = req.params.classCode;
    try {
        const classDetail = await classes.findOne({
            classCode: classCode
        });

        res.render('layout', {
            contentPage: '../views/classes/editClass',
            classDetail: classDetail,
        })
    } catch (err) {
        console.log(err);
        throw err;
    }
}

classController.postComments = async (req, res, next) => {
    var currentdate = new Date()
    var month = currentdate.getMonth() + 1
    var datetime = month + "/" + currentdate.getDate() + "/" + currentdate.getFullYear() + " - "
        + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

    const newComments = new comments({
        user: res.locals.username,
        classCode: req.params.classCode,
        createDate: datetime,
        text: req.body.comment
    });
    try {
        const resultComment = await newComments.save();
        console.log(resultComment)
        res.redirect("/classes/class-detail/" + req.params.classCode)
    } catch (err) {
        if (err)
            console.log(err);
    }
}


classController.getClassDetailCourses = async (req, res, next) => {
    const classCode = req.params.classCode;
    const username = res.locals.username;
    console.log("username:", username)

    try {
        const classDetail = await classes.findOne({
            classCode: classCode
        });
        let listExercise
        if (classDetail.classTeachers.indexOf(res.locals.username) != -1) {
            listExercise = await exercises.find({
                classCode: classCode,
            })
        } else {
            listExercise = await exercises.find({
                classCode: classCode,
                studentAssigned: { $in: [username] }
            })
        }

        console.log(listExercise.length)
        res.render('layout', {
            contentPage: '../views/classes/classDetailCourses',
            classDetail: classDetail,
            listExercise: listExercise
        })
    } catch (err) {
        console.log(err);
        throw err;
    }
}

classController.getAddExercise = async (req, res, next) => {
    const classCode = req.params.classCode;
    try {
        const classDetail = await classes.findOne({
            classCode: classCode
        });
        res.render('../views/exercise/addExercise', {
            classDetail: classDetail
        })
    } catch (err) {
        console.log(err);
        throw err;
    }
}

classController.getSubmitExercise = async (req, res, next) => {
    const classCode = req.params.classCode;
    const exerciseId = req.params._id;
    try {
        const classDetail = await classes.findOne({
            classCode: classCode
        });
        const exercise = await exercises.findById(exerciseId);
        res.render('../views/exercise/submitExercise', {
            classDetail: classDetail,
            exercise: exercise
        })
    } catch (err) {
        console.log(err);
        throw err;
    }
}

classController.getManagement = async (req, res, next) => {
    const classCode = req.params.classCode;
    const exerciseId = req.params._id;
    try {
        const classDetail = await classes.findOne({
            classCode: classCode
        });
        const exercise = await exercises.findById(exerciseId);
        const listSubmission = await submissions.find(
            {
                $and: [{ classCode: classCode }, { exerciseId: exerciseId }]
            })
        console.log(classCode)
        console.log(exerciseId)
        console.log(exercise)

        res.render('../views/exercise/management', {
            classDetail: classDetail,
            exercise: exercise,
            listSubmission: listSubmission
        })
    } catch (err) {
        console.log(err);
        throw err;
    }
}

classController.postSubmitExercise = (req, res, next) => {
    console.log("==================Form submit ======================");
    const form = new formidable.IncomingForm({ multiples: true });
    form.parse(req, async (err, fields, files) => {
        console.log(fields)

        let fileurl
        if (files.file.name != '') {
            console.log(files.file.name);
            await cloudinary.v2.uploader.upload(files.file.path, {
                public_id: files.file.name,
                resource_type: "raw",
                folder: "submission"
            }, (err, result) => {
                if (err) console.log(err)
                else {
                    console.log(result.url);
                    fileurl = result.url;
                }
            }
            );
        }

        var currentdate = new Date()
        var month = currentdate.getMonth() + 1
        var datetime = month + "/" + currentdate.getDate() + "/" + currentdate.getFullYear() + " - "
            + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        console.log(datetime)

        try {
            const newSubmission = new submissions({
                classCode: req.params.classCode,
                exerciseId: req.params._id,
                user: res.locals.username,
                file: fileurl,
                filename: files.file.name,
                description: fields.message,
                createDate: datetime
            });

            const resultSubmission = await newSubmission.save();
            console.log(resultSubmission)

            const listSubmission = await submissions.find()
            console.log(listSubmission)

            res.redirect("/classes/class-detail/" + req.params.classCode + "/courses")
        } catch (err) {
            if (err)
                console.log(err);
        }
    });
}

classController.getExerciseDetail = async (req, res, next) => {
    const exerciseId = req.params._id;
    const classCode = req.params.classCode;
    try {
        const classDetail = await classes.findOne({
            classCode: classCode
        });
        const exercise = await exercises.findById(exerciseId);
        console.log(classDetail)
        console.log(exercise)
        res.render('../views/exercise/exerciseDetail', {
            classDetail: classDetail,
            exercise: exercise
        })
    } catch (err) {
        console.log(err);
        throw err;
    }
}

classController.postAddExercise = (req, res, next) => {
    console.log("==================Form upload ======================");
    const form = new formidable.IncomingForm({ multiples: true });
    form.parse(req, async (err, fields, files) => {
        console.log(fields)

        let exercise
        try {
            if (req.params._id != null) {
                exercise = await exercises.findById(req.params._id);
                console.log("========edit exercise============== \n", exercise)
            }
            else {
                exercise = new exercises();
                console.log("========Create new exercise=========")
            }

            if (files.file.name != '') {
                console.log(files.file.path)
                await cloudinary.v2.uploader.upload(files.file.path, {
                    public_id: files.file.name,
                    resource_type: "raw",
                    folder: "exercise"
                }, (err, result) => {
                    if (err) console.log(err)
                    else {
                        console.log(result.url);
                        exercise.file = result.url;
                        exercise.filename = files.file.name;
                    }
                }
                );
            }

            exercise.classCode = req.params.classCode;
            exercise.title = fields.titleExercise;
            exercise.description = fields.message;
            exercise.studentAssigned = fields.selected;
            exercise.deadline = fields.deadline

            const exerciseResult = await exercise.save();
            console.log(exerciseResult)
            res.redirect("/classes/class-detail/" + req.params.classCode + "/courses")

        } catch (error) {
            if (err)
                console.log(err);
        }

    });
}

classController.getClassDetailPeople = async (req, res, next) => {
    const classCode = req.params.classCode;
    try {
        const classDetail = await classes.findOne({
            classCode: classCode
        });
        res.render('layout', {
            contentPage: '../views/classes/classDetailPeople',
            classDetail: classDetail
        })
    } catch (err) {
        console.log(err);
        throw err;
    }
}

classController.getAdduser = async (req, res, next) => {
    const classCode = req.params.classCode;
    try {
        const addUser = await classes.findOne({
            classCode: classCode
        });
        res.render('layout', {
            contentPage: '../views/classes/addUser',
            addUser: addUser
        })
    } catch (err) {
        console.log(err);
        throw err;
    }
}

classController.deleteClass = async (req, res, next) => {
    const classCode = req.body.classCode;
    console.log(classCode)
    try {
        await classes.deleteOne({
            classCode: classCode
        });
        res.send("Class deleted successfully")
    } catch (err) {
        console.log(err);
        throw err;
    }
}
module.exports = classController;