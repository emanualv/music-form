// /api/subscribe.js
import mysql from "mysql2/promise";

let pool;
async function getPool() {
  if (pool) return pool;
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
  });
  return pool;
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body ?? {};
    if (!email) return res.status(400).json({ success: false, error: "email required" });
    try {
      const db = await getPool();
      const [result] = await db.execute("INSERT INTO subscribers (email) VALUES (?)", [email]);
      return res.status(201).json({ success: true, id: result.insertId });
    } catch (err) {
      console.error("DB error /api/subscribe:", err);
      return res.status(500).json({ success: false, error: "Database error" });
    }
  } else if (req.method === "GET") {
    try {
      const db = await getPool();
      const [rows] = await db.query("SELECT id, email FROM subscribers ORDER BY id DESC");
      return res.status(200).json(rows);
    } catch (err) {
      console.error("DB error /api/subscribe GET:", err);
      return res.status(500).json({ error: "Database error" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
