import { GoogleGenAI, Type } from '@google/genai';
import type { PerformanceTip, SafeBrowsingTip } from '../types';

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const performanceTipsSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      title: {
        type: Type.STRING,
        description: 'A short, actionable title for the tip.',
      },
      description: {
        type: Type.STRING,
        description: 'A brief explanation of the tip and why it helps.',
      },
      category: {
        type: Type.STRING,
        description: "The category of the tip. Must be one of: 'Cache', 'Extensions', 'Updates', 'Tabs', 'Other'.",
      },
    },
    required: ["title", "description", "category"],
  },
};

const safeBrowsingTipsSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      title: {
        type: Type.STRING,
        description: 'A short, actionable title for the security tip.',
      },
      description: {
        type: Type.STRING,
        description: 'A brief explanation of the tip and why it is important for security.',
      },
      category: {
        type: Type.STRING,
        description: "The category of the tip. Must be one of: 'Privacy', 'Phishing', 'Passwords', 'Updates', 'General'.",
      },
    },
    required: ["title", "description", "category"],
  },
};

/**
 * Fetches performance tips from the Gemini API.
 * @returns A promise that resolves to an array of PerformanceTip objects.
 */
export const getPerformanceTips = async (): Promise<PerformanceTip[]> => {
  console.log("Fetching performance tips from Gemini API...");
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "You are an expert on web browser performance optimization. Provide 3 actionable tips for a general user to speed up their web browser. For each tip, provide a concise title, a brief description, and a category. The categories must be one of the following: 'Cache', 'Extensions', 'Updates', 'Tabs', or 'Other'.",
      config: {
        responseMimeType: "application/json",
        responseSchema: performanceTipsSchema,
      },
    });

    const jsonString = response.text.trim();
    const tips = JSON.parse(jsonString);

    if (!Array.isArray(tips)) {
        throw new Error("API returned an invalid format for performance tips.");
    }

    return tips as PerformanceTip[];
  } catch (error) {
    console.error("Error fetching performance tips from Gemini:", error);
    throw new Error("Failed to get performance tips from AI. Please try again.");
  }
};

/**
 * Fetches safe browsing tips from the Gemini API.
 * @returns A promise that resolves to an array of SafeBrowsingTip objects.
 */
export const getSafeBrowsingTips = async (): Promise<SafeBrowsingTip[]> => {
    console.log("Fetching safe browsing tips from Gemini API...");
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "You are an expert on cybersecurity and safe web browsing. Provide 3 actionable tips for a general user to improve their online security. For each tip, provide a concise title, a brief description, and a category. The categories must be one of the following: 'Privacy', 'Phishing', 'Passwords', 'Updates', or 'General'.",
            config: {
                responseMimeType: "application/json",
                responseSchema: safeBrowsingTipsSchema,
            },
        });

        const jsonString = response.text.trim();
        const tips = JSON.parse(jsonString);
        
        if (!Array.isArray(tips)) {
            throw new Error("API returned an invalid format for safe browsing tips.");
        }

        return tips as SafeBrowsingTip[];
    } catch (error) {
        console.error("Error fetching safe browsing tips from Gemini:", error);
        throw new Error("Failed to get security tips from AI. Please try again.");
    }
};
