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

module.exports = connectDB;