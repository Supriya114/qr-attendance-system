const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },

    date: {
        type: String,
        default: new Date().toLocaleDateString()
    },

    time: {
        type: String,
        default: new Date().toLocaleTimeString()
    }
});

module.exports = mongoose.model("Attendance", attendanceSchema);