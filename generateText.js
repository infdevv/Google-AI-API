const express = require("express");
const generateText = require("./generateText");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/generate-text", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).send({ error: "Prompt is required" });
  }

  try {
    const result = await generateText(prompt);
    res.send({ result });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
