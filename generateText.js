const { TextServiceClient } = require("@google-ai/generativelanguage").v1beta2;
const { GoogleAuth } = require("google-auth-library");
const dotenv = require("dotenv");

dotenv.config();

const MODEL_NAME = "models/text-bison-001";
const API_KEY = process.env.GOOGLE_API_KEY;

async function generateText(promptText) {
  const authClient = new GoogleAuth().fromAPIKey(API_KEY);
  const client = new TextServiceClient({ authClient });

  try {
    const [response] = await client.generateText({
      model: MODEL_NAME,
      prompt: { text: promptText },
    });
    if (response && response.candidates && response.candidates.length > 0) {
      return response.candidates[0].output;
    } else {
      return "No candidates found.";
    }
  } catch (error) {
    console.error("Error generating text:", error);
    return "Error generating text.";
  }
}

module.exports = generateText;
