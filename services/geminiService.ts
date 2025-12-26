
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDashboardInsights = async (data: any) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
        Analyze the following data for Arba Minch Water Supply and Sewerage Service Enterprise and provide a concise summary with 3 actionable insights for management.
        
        Customer Status: ${JSON.stringify(data.customers)}
        Billing Status: ${JSON.stringify(data.billing)}
        Budget Tracking: ${JSON.stringify(data.budget)}
        
        The summary should be professional, encouraging, and focused on operational efficiency. Format with bullet points.
      `,
      config: {
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching AI insights:", error);
    return "Unable to load intelligent insights at this time. Please check your connectivity.";
  }
};
