const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
const words = require("./lexicon_greek.json");

app.get("/api/words", (req, res) => {
  res.json(words);
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});