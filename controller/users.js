'use strict';
const mongoose = require("../models/index");
const user = require('../models/users')
var bcrypt = require('bcryptjs');
const classes = require('../models/classes');

const userController = {};

userController.getAllUser = async (req, res, next) => {
    try {
        const usersList = await user.find();
        res.render('layout', {
            contentPage: '../views/users/users',
            usersList: usersList
        })
    } catch (err) {
        console.log(err);
        throw err;
    }
}

userController.signUp = async (req, res, next) => {
    const userData = req.body
    let teacher = false
    if (userData.teacher == 'true') {
        teacher = true
    }

    try {
        const newUser = new user({
            username: userData.username,
            password: await bcrypt.hash(userData.password, 2),
            email: userData.email,
            firstName: userData.firstname,
            lastName: userData.lastname,
            teacher: teacher
        });

        const userResult = await newUser.save();
        console.log(userResult)

        req.login(userResult, function (err) {
            res.redirect('/');
        })

    } catch (err) {
        if (err)
            console.log(err);
    }
}

userController.getUserDetail = async (req, res, next) => {
    const username = req.params.username;
    try {
        const userDetail = await user.findOne({
            username: username
        });
        res.render('layout', {
            contentPage: '../views/users/userDetail',
            userDetail: userDetail
        })
    } catch (err) {
        console.log(err);
        throw err;
    }

}

userController.postInviteUser = async (req, res, next) => {
    const data = req.body;
    console.log(data)
    try {
        let classDetail = await classes.findOne({
            classCode: data.classCode
        });
        const userDetail = await user.findOne({
            username: data.username
        });
        if (classDetail.classStudents.indexOf(userDetail.username) == -1) {

            classDetail.classStudents.unshift(userDetail.username)
            const newClass = await classDetail.save()
            console.log(newClass)

            const resultUser = {
                username: userDetail.username,
                email: userDetail.email,
                firstName: userDetail.firstName,
                lastName: userDetail.lastName
            }
            res.send(resultUser)
        } else {
            res.send("user-existed")
        }
    } catch (err) {
        console.log(err);
        throw err;
    }

}


module.exports = userController;