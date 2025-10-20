import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../data/message_data.json");

export async function getAllMessages(req, res) {
  try {
    const raw_data = await readFile(filePath, "utf-8");
    const messages_json = JSON.parse(raw_data);
    res.status(200).json(messages_json);
  } catch (err) {
    res.status(500).send("Error reading data", err);
    console.log(err);
  }
}
export async function addMessage(req, res) {
  try {
    const raw_data = await readFile(filePath, "utf-8");
    const messages_json = JSON.parse(raw_data);
    const newMessage = req.body;
    messages_json.push(newMessage);
    await writeFile(filePath, JSON.stringify(messages_json, null, 2), "utf-8");
    res.status(201).send("Added Message Succesfully");
  } catch (err) {
    res.status(500).send("Error reading or writing data", err);
  }
}
