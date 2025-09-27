const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",       // your MySQL username
  password: "",       // your MySQL password
  database: "music-form"
});

db.connect(err => {
  if (err) return console.log("DB error:", err);
  console.log("Connected to MySQL");
});

// ---------------- Subscribe Route ----------------
app.post("/subscribe", (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).send("Email required");

  db.query(
    "INSERT INTO subscribers (email) VALUES (?)",
    [email],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId, email });
    }
  );
});

// ---------------- Contact Route ----------------
app.post("/contact", (req, res) => {
  const { name, email, address } = req.body;
  if (!name || !email || !address)
    return res.status(400).send("All fields are required");

  db.query(
    "INSERT INTO users (name, email, address) VALUES (?, ?, ?)",
    [name, email, address],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId, name, email, address });
    }
  );
});

app.listen(5000, () => console.log("Server running on port 5000"));
    