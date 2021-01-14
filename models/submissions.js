var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define User Schema

var submissions = new Schema({
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
    exerciseTitle: String,
    file: String,
    point: Number,
    filename: String,
    createDate: String
});

module.exports = mongoose.model('Submissions', submissions);