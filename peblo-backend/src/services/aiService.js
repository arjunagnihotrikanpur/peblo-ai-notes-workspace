import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",

  apiKey: process.env.OPENROUTER_API_KEY,
});

export const generateNoteInsights = async (content) => {
  const prompt = `
You are an AI assistant for a notes application.

Analyze the following note content.

Return ONLY valid JSON in this exact format:

{
  "summary": "short summary",
  "action_items": ["item 1", "item 2"],
  "suggested_title": "title"
}

Note Content:
${content}
`;

  const response = await openai.chat.completions.create({
    model: "openai/gpt-oss-120b:free",

    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],

    temperature: 0.3,
  });

  const text = response.choices[0].message.content;

  const cleanedText = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleanedText);
  } catch (error) {
    return {
      summary: cleanedText,
      action_items: [],
      suggested_title: "AI Generated Note",
    };
  }
};
