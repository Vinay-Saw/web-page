
import { GoogleGenAI } from "@google/genai";
import { PROJECTS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIResponse = async (userMessage: string) => {
  try {
    const projectSummary = PROJECTS.map(p => `${p.title}: ${p.desc}`).join("\n");
    const systemInstruction = `
      You are "Vinay's AI Consultant". Vinay Saw is a Data Analyst.
      Use this context to answer questions about Vinay's portfolio:
      
      Vinay's Expertise: Data Analytics, MIS Reporting, Advanced Excel, ERP Management.
      Education: B.S. Data Science And Applications from IIT Madras (Present).
      Certifications: Google Data Analytics Professional, Excel Skills for Data Analytics, IBM Data Analysis.
      
      Vinay's Projects:
      ${projectSummary}
      
      Your tone should be professional, encouraging, and informative. 
      If a user asks about Vinay's skills, highlight his proficiency in Excel automation and his ongoing degree at IIT Madras.
      Keep responses concise and focused on how Vinay's analytical skills solve business problems.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't process that. How else can I help you today?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error: I am currently offline. Please try again later.";
  }
};
