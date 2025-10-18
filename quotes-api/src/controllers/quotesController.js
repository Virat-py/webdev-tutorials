import { readFile, writeFile } from "fs/promises";

export async function getAllQuotes(req, res) {
  try {
    const data = await readFile("data/quotes.json", "utf-8");
    const quotes = JSON.parse(data);
    res.status(200).json(quotes);
  } catch (error) {
    res.status(500).json({ message: "Error reading quotes file" });
  }
}

export async function getRandomQuote(req, res) {
  try {
    const data = await readFile("data/quotes.json", "utf-8");
    const quotes = JSON.parse(data);
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.status(200).json(randomQuote);
  } catch (error) {
    res.status(500).json({ message: "Error reading quotes file" });
  }
}

export async function addQuote(req, res) {
  try {
    //POST data (string)->convert to JSON first
    const newQuote = req.body;
    // writeFile overwrites prev data, so load prev data then add using writeFile
    const data = await readFile("data/quotes.json", "utf-8");
    const quotes = JSON.parse(data);
    quotes.push(newQuote);
    await writeFile(
      "data/quotes.json",
      JSON.stringify(quotes, null, 2),
      "utf-8"
    );
    res.status(201).send("Added quote");
  } catch (error) {
    console.log("Error writing in file", error);
  }
}
