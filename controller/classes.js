'use strict';
const mongoose = require("../models/index");
const classes = require('../models/classes')

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

classController.getAdduser = async (req, res, next) => {
    const classCode = req.params.classCode;
    try {
        const Adduser = await classes.findOne({
            classCode: classCode
        });
        res.render('layout', {
            contentPage: '../views/classes/classAdduser',
            Adduser: Adduser
        })
    } catch (err) {
        console.log(err);
        throw err;
    }

}
module.exports = classController;