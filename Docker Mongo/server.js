const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// UPDATE THIS: Agar localhost hai toh localhost likhein
const MONGO_URL = "mongodb://admin:parth@localhost:27017"; 
const client = new MongoClient(MONGO_URL);

let db;

async function startApp() {
    try {
        await client.connect();
        db = client.db("apnacollege-db");
        console.log("✅ Database se connection ban gaya hai!");
        
        app.listen(PORT, () => {
            console.log(`🚀 Server http://localhost:${PORT} par chalu hai`);
        });
    } catch (err) {
        console.error("❌ Database connection error:", err);
    }
}

startApp();

app.post("/addUser", async (req, res) => {
    try {
        console.log("Received Data:", req.body); // Check karein terminal mein
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).send("Form ke saare fields bharna zaroori hai!");
        }

        const result = await db.collection("users").insertOne({ email, username, password });
        console.log("DB Insert Result:", result);
        
        res.send("<h1>Badhai ho! Data DB mein chala gaya.</h1><a href='/getUsers'>Data Dekhein</a>");
    } catch (err) {
        console.error("Insertion Error:", err);
        res.status(500).send("DB mein data dalne mein error aayi: " + err.message);
    }
});