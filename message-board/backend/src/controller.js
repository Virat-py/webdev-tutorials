// controller.js
import pool from "../db.js";

// get all messages
export async function getAllMessages(req, res) {
  try {
    const result = await pool.query(
      "SELECT * FROM messages ORDER BY created_at DESC"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Database error" });
  }
}

// add new message
export async function addMessage(req, res) {
  const { sender, body } = req.body;
  if (!sender || !body) {
    return res.status(400).json({ error: "Sender and body required" });
  }

  try {
    const query =
      `INSERT INTO messages (sender, body) VALUES ($1, $2) RETURNING *`;
    const values = [sender, body];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting message:", err);
    res.status(500).json({ error: "Database error" });
  }
}
