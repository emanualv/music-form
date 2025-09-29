const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MySQL
const db = mysql.createConnection({
  host: "dpg-d3d2tl37mgec73b08qjg-a",
  user: "music_form_backdb_user",
  password: "XYJGS0MC0BDL7fIALyirG8TYQushFe2U",
  database: "music_form_backdb"
});

db.connect(err => {
  if (err) return console.log("DB error:", err);
  console.log("Connected to MySQL");
});

// ---------------- Subscribe Form ----------------
app.post("/subscribe", (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).send("Email required");

  db.query("INSERT INTO subscribers (email) VALUES (?)", [email], (err, result) => {
    if (err) {
      console.error("DB error on /subscribe:", err);
      return res.status(500).send(err);
    }
    console.log("Inserted subscriber:", result.insertId); // debug log
    res.json({ id: result.insertId, email });
  });
});

// ---------------- Get Started Form ----------------
app.post("/contact", (req, res) => {
  const { name, email, address } = req.body;

  const sql = "INSERT INTO users (name, email, address) VALUES (?, ?, ?)";
  db.query(sql, [name, email, address], (err, result) => {
    if (err) {
      console.error("DB error:", err); // <-- logs exact MySQL error in terminal
      return res.status(500).send("Database error: " + err.message);
    }
    res.send("Contact saved successfully!");
  });
});


// ---------------- Optional: View data ----------------
app.get("/subscribers", (req, res) => {
  db.query("SELECT * FROM subscribers", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// ---------------- Start Server ----------------
app.listen(5000, () => console.log("Server running on port 5000"));
