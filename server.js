const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const QRCode = require("qrcode");

require("dotenv").config();

const attendanceRoutes = require("./routes/attendanceRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.use("/api", attendanceRoutes);

app.get("/test", (req, res) => {
    res.send("Test Route Working");
});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("QR Attendance System Running");
});

app.get("/generate-qr", async (req, res) => {

    const qrData = "http://localhost:5000";

    const qrImage = await QRCode.toDataURL(qrData);

    res.send(`
        <h1>Scan QR for Attendance</h1>
        <img src="${qrImage}" />
    `);

});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});