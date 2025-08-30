
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function reviewCode(code: string, language: string): Promise<string> {
  const prompt = `
    As an expert senior software engineer and a master of ${language}, your task is to perform a thorough code review.
    Analyze the following code snippet for quality, correctness, performance, and style.

    Please provide your feedback in Markdown format. Structure your review with the following sections if applicable:
    1.  **Overall Assessment:** A brief summary of the code's quality.
    2.  **Bugs & Potential Issues:** Identify any bugs, logical errors, or edge cases that might have been missed.
    3.  **Performance Optimizations:** Suggest ways to improve the code's performance and efficiency.
    4.  **Style & Readability:** Comment on code style, naming conventions, and overall readability. Suggest improvements for clarity.
    5.  **Refactored Code (Optional):** If applicable, provide a refactored version of the code that incorporates your suggestions.

    Be constructive, clear, and provide code examples where necessary using Markdown code blocks.

    **Language:** ${language}

    **Code to Review:**
    \`\`\`${language}
    ${code}
    \`\`\`
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get review from Gemini API. Please check your API key and network connection.");
  }
}
