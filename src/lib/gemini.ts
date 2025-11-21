import { GoogleGenAI } from "@google/genai";
import { AnalysisResult } from '@/types/doc-analysis';
import { generateAnalysisPrompt } from '@/lib/prompts';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeDocument(text: string, rules: string[]): Promise<AnalysisResult[]> {
  const prompt = generateAnalysisPrompt(text, rules);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const textResponse = response.text;
    
    if (!textResponse) {
        throw new Error("No response text received");
    }

    // Clean up markdown code blocks if present (though responseMimeType should handle it, it's safe to keep)
    const cleanJson = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(cleanJson) as AnalysisResult[];
  } catch (error) {
    console.error('Error calling Gemini:', error);
    throw new Error('Failed to analyze document with Gemini');
  }
}
