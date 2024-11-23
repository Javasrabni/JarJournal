const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let savedContents = []; // Array untuk menyimpan konten kumulatif

app.post("/save-content", (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }

  savedContents.push(content); // Tambahkan konten baru ke array
  res.json({ message: "Content saved successfully!", contents: savedContents });
});

app.get("/get-contents", (req, res) => {
  res.json({ contents: savedContents }); // Kirim semua konten yang disimpan
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
