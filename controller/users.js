'use strict';
const mongoose = require("../models/index");
const user = require('../models/users')
var bcrypt = require('bcryptjs');

const userController = {};

userController.getUser = async (req, res, next) => {
    const usersList = await user.find();
    console.log(usersList);
    res.send(JSON.stringify(usersList));
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

module.exports = userController;