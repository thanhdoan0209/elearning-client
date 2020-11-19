'use strict';
const mongoose = require("../models/index");
const users = require("../models/users");
const user = require('../models/users')
var bcrypt = require('bcryptjs');

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
    const firstName = req.params.firstName;
    try {
        const userDetail = await users.findOne({
            firstName: firstName
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



module.exports = userController;