const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
  try {
    console.log('Calling Gemini...');
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: "Explain how AI works in 50 words.",
      config: {
        responseMimeType: "application/json",
      }
    });
    console.log('Response:', response.text);
  } catch (error) {
    console.error('Error:', error);
  }
}

run();
