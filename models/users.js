var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define User Schema

var users = new Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true
    },
    phone: String,
    address: String,
    firstName: String,
    lastName: String,
    teacher: Boolean,
    password: {
        type: String,
        require: true
    },
    // salt: {
    //     type: String
    // }
});



module.exports = mongoose.model('Users', users);