const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MySQL
const db = mysql.createConnection({
  host: "localhost",       // your host
  user: "your_username",   // your MySQL user
  password: "your_password",
  database: "music-form"
});

db.connect(err => {
  if (err) {
    console.log("DB connection error:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// POST route to save email
app.post("/subscribe", (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).send("Email is required");

  db.query("INSERT INTO subscribers (email) VALUES (?)", [email], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json({ id: results.insertId, email });
  });
});

app.listen(5000, () => console.log("Backend running on port 5000"));
