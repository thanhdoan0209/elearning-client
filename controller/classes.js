'use strict';
const mongoose = require("../models/index");
const classes = require('../models/classes');
const exercises = require('../models/exercises');

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
        classStudents: [2],
        classTeacher: "Gonzo"
    });
    try {
        const classes = await newClass.save();
        console.log(classes)
        res.redirect("/classes/class-detail/" + classes.classCode)
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
        res.render('layout', {
            contentPage: '../views/classes/classDetail',
            classDetail: classDetail
        })
    } catch (err) {
        console.log(err);
        throw err;
    }
}

classController.getClassDetailCourses = async (req, res, next) => {
    const classCode = req.params.classCode;
    const username = res.locals.username;
    console.log("xxxxxxxxxx:", username)

    try {
        const classDetail = await classes.findOne({
            classCode: classCode
        });
        const listExercise = await exercises.find({
            classCode: classCode,
            studentAssigned: { $in: [username] }
        })
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

classController.postSubmitExercise = async (req, res, next) => {
    const classCode = req.params.classCode;
    try {
        const classDetail = await classes.findOne({
            classCode: classCode
        });
        res.render('../views/exercise/submitExercise', {
            classDetail: classDetail
        })
    } catch (err) {
        console.log(err);
        throw err;
    }
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

classController.postAddExercise = async (req, res, next) => {
    const exerciseData = req.body
    console.log(exerciseData)
    if (exerciseData.submit == 'Đóng') {
        try {
            res.redirect("/classes/class-detail/" + req.params.classCode + "/courses")
        } catch (err) {
            if (err)
                console.log(err);
        }
    }
    else {
        try {
            let exercise
            if (req.params._id != null) {
                exercise = await exercises.findById(req.params._id);
                console.log("xxxxx", exercise)
            }
            else {
                exercise = new exercises();
            }
            console.log("new exercise")
            console.log(exercise);

            exercise.classCode = req.params.classCode;
            console.log(req.params.classCode)
            exercise.title = exerciseData.titleExercise;
            exercise.description = exerciseData.message;
            exercise.file = exerciseData.filelink;
            exercise.studentAssigned = exerciseData.selected;
            exercise.deadline = exerciseData.deadline

            const exerciseResult = await exercise.save();

            console.log(exerciseResult)

            res.redirect("/classes/class-detail/" + req.params.classCode + "/courses")

        } catch (err) {
            if (err)
                console.log(err);
        }
    }
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
module.exports = classController;