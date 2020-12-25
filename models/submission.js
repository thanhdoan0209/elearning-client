var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define User Schema

var submission = new Schema({
    classCode: {
        type: String,
        require: true
    },
    exerciseId: {
        type: String,
        require: true
    },
    user: {
        type: String,
        require: true
    },
    description: String,
    file: String,
    filename: String,
    createDate: String
});

module.exports = mongoose.model('Submission', submission);