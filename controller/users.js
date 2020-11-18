'use strict';
const mongoose = require("../models/index");
const user = require('../models/users')

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
    console.log(userData)
    const newUser = new user({
        username: userData.username,
        password: userData.password,
        email: userData.email,
        firstName: userData.firstname,
        lastName: userData.lastname,
        teacher: teacher
    });

    try {
        const user = await newUser.save();
        console.log(user)
        res.send(user);
    } catch (err) {
        if (err)
            console.log(err);
    }
}

userController.signIn = async (req, res, next) => {

    try {
        const userdata = await user.find({ username: req.body.username })
        if (userdata.length == 0) {
            res.send("Account not exsit")
        }
        else {
            if (req.body.password == userdata.password) {
                res.redirect('/user')
            }
        }
    } catch (err) {
        if (err)
            console.log(err);
    }
}

module.exports = userController;