const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://sup:sup123@cluster0.c0xedzq.mongodb.net/attendanceDB")
.then(() => {
    console.log("CONNECTED SUCCESSFULLY");

    return mongoose.connection.db.collection("test").insertOne({ name: "test" });
})
.then(() => {
    console.log("INSERT WORKED");
})
.catch(err => {
    console.log("ERROR:", err);
});