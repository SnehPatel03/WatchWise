import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const getMovieRecommendation = async (prompt) => {
  try {
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.1,
    });

    return completion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Groq Error:", error);
    throw error;
  }
};
