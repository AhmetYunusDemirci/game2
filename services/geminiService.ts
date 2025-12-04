import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini AI client inside functions to ensure it uses the 
// latest API Key selected by the user via the Gate in index.tsx.

export const generateStory = async (characterName: string, characterType: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a very short, simple, 2-sentence story in Turkish for a 5-year-old child.
      The main character is a ${characterType} named ${characterName}.
      They are going on an adventure to find hidden colors.
      Keep it very simple and encouraging. Do not add titles.`,
    });
    return response.text || `Merhaba ${characterName}! Hadi renkli maceramıza başlayalım.`;
  } catch (error) {
    console.error("Story generation failed", error);
    return `Merhaba ${characterName}! Hadi harika bir oyun oynayalım!`;
  }
};

export const generateRewardSticker = async (characterType: string): Promise<string | null> => {
  try {
    // gemini-3-pro-image-preview requires a paid API key or specific setup, handled by the Key Gate.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
            parts: [
                { text: `A cute, high-quality, 3D cartoon style sticker of a happy ${characterType} holding a gold medal. White background. Bright colors. Vector art style.` }
            ]
        },
        config: {
            imageConfig: {
                aspectRatio: "1:1",
                imageSize: "1K" // "1K" is supported for pro-image model
            }
        }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
            return `data:image/png;base64,${part.inlineData.data}`;
        }
    }
    return null;
  } catch (error) {
    console.error("Image generation failed", error);
    return null;
  }
};