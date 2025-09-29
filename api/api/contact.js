// /api/contact.js
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
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, email, address } = req.body ?? {};

  if (!name || !email || !address) {
    return res.status(400).json({ success: false, error: "name, email and address required" });
  }

  try {
    const db = await getPool();
    const [result] = await db.execute(
      "INSERT INTO users (name, email, address) VALUES (?, ?, ?)",
      [name, email, address]
    );
    return res.status(201).json({ success: true, id: result.insertId });
  } catch (err) {
    console.error("DB error /api/contact:", err);
    return res.status(500).json({ success: false, error: "Database error" });
  }
}
