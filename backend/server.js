const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const QRCode = require("qrcode");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../frontend")));

/* DB */
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const User = require("./models/User");
const Attendance = require("./models/Attendance");

/* AUTH */
app.post("/api/signup", async (req, res) => {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.json({ success: false, message: "User exists" });

    await User.create({ name, email, password });

    res.json({ success: true, message: "Signup success" });
});

app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) return res.json({ success: false });

    res.json({ success: true, token: "demo-token" });
});

/* ATTENDANCE */
app.post("/api/mark-attendance", async (req, res) => {
    await Attendance.create({
        studentName: req.body.studentName,
        date: new Date()
    });

    res.json({ success: true, message: "Attendance marked" });
});

app.get("/api/get-attendance", async (req, res) => {
    const data = await Attendance.find().sort({ date: -1 });
    res.json(data);
});

app.put("/api/update-attendance/:id", async (req, res) => {
    await Attendance.findByIdAndUpdate(req.params.id, {
        studentName: req.body.studentName
    });

    res.json({ success: true });
});

app.delete("/api/delete-attendance/:id", async (req, res) => {
    await Attendance.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

/* QR GENERATE */
app.get("/api/generate-qr/:name", async (req, res) => {
    try {
        const qr = await QRCode.toDataURL(req.params.name);
        res.json({ qr });
    } catch (err) {
        res.json({ error: err.message });
    }
});

/* PAGES */
app.get("/", (req,res)=> res.sendFile(path.join(__dirname,"../frontend/index.html")));
app.get("/login", (req,res)=> res.sendFile(path.join(__dirname,"../frontend/login.html")));
app.get("/dashboard", (req,res)=> res.sendFile(path.join(__dirname,"../frontend/dashboard.html")));
app.get("/qr", (req,res)=> res.sendFile(path.join(__dirname,"../frontend/qr.html")));
app.get("/attendance", (req,res)=> res.sendFile(path.join(__dirname,"../frontend/attendance.html")));
app.get("/student-qr", (req,res)=> res.sendFile(path.join(__dirname,"../frontend/student-qr.html")));

app.listen(5000, ()=> console.log("Server running on http://localhost:5000"));