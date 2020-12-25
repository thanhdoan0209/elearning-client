var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define User Schema

var exercises = new Schema({
    classCode: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    description: String,
    file: String,
    filename: String,
    deadline: String,
    studentAssigned: Array
    // salt: {
    //     type: String
    // }

});

module.exports = mongoose.model('Exercises', exercises);