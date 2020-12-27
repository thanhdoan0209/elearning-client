var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define User Schema

var classes = new Schema({
    className: {
        type: String,
        require: true
    },
    classCode: {
        type: String,
        unique: true,
        require: true
    },
    classTeachers: Array,
    classStudents: Array,
    numberOfStudent: Number,
    pic: String
});



module.exports = mongoose.model('Classes', classes);