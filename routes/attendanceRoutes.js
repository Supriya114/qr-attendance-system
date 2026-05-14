const express = require("express");

const router = express.Router();

const Attendance = require("../models/Attendance");

router.post("/mark-attendance", async (req, res) => {

    try {

        const { studentName } = req.body;

        const newAttendance = new Attendance({
            studentName
        });

        await newAttendance.save();

        res.json({
            message: "Attendance Marked Successfully"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

module.exports = router;