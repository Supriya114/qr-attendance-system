console.log("NEW ROUTE FILE RUNNING");

const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

let db;

async function connectDB() {
    if (!db) {
        await client.connect();
        db = client.db("attendanceDB");
        console.log("MongoDB Connected");
    }
    return db;
}

router.post("/mark-attendance", async (req, res) => {
    try {
        console.log("ROUTE HIT");

        const { studentName } = req.body;

        const database = await connectDB();

        const result = await database.collection("attendances").insertOne({
            studentName,
            date: new Date()
        });

        res.json({
            message: "Attendance Marked Successfully",
            id: result.insertedId
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

router.get("/attendance", async (req, res) => {

    try {

        const Attendance =
            require("../models/Attendance");

        const records =
            await Attendance.find();

        res.json(records);

    } catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Error fetching records"

        });

    }

});

module.exports = router;