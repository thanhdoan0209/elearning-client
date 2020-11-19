'use strict';
const mongoose = require("../models/index");
const users = require("../models/users");
const user = require('../models/users')

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
    const newUser = new user({
        username: userData.username,
        password: userData.password,
        email: userData.email,
        firstName: userData.firstname,
        lastName: userData.lastname
    });
    try {
        const user = await newUser.save();
        console.log(user)
        res.send(user);
        console
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