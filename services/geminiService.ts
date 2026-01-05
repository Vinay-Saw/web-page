
import { GoogleGenAI } from "@google/genai";
import { portfolio } from "../data/portfolio";

/**
 * Interface with Vinay's custom Gemini Consultant
 * Optimized to use the full portfolio data for high-context awareness.
 */
export const getAIResponse = async (userMessage: string) => {
  try {
    // Initializing the GenAI client with the required parameter structure
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Deconstruct portfolio for cleaner context building
    const { profile, projects, experience, education, certifications, skills } = portfolio;

    // Build comprehensive project context
    const projectContext = projects.map(p => {
      const metrics = p.metrics.map(m => `${m.label}: ${m.value}`).join(", ");
      const techStack = p.tech.join(", ");
      return `Project: "${p.title}"
Description: ${p.longDesc}
Tech: ${techStack}
Key Metrics: ${metrics}
---`;
    }).join("\n");

    // Build professional background context
    const experienceContext = experience.map(exp => 
      `${exp.title} at ${exp.company} (${exp.period}):\n${exp.points.map(pt => `- ${pt}`).join("\n")}`
    ).join("\n\n");

    // Build academic context
    const educationContext = education.map(edu => 
      `${edu.degree} from ${edu.institution} (${edu.period})`
    ).join("\n");

    // Build certification context
    const certContext = certifications.map(c => `- ${c.name} (${c.date})`).join("\n");

    const systemInstruction = `
      You are "Vinay's AI Consultant". You represent Vinay Saw, a Data Analyst and IIT Madras Data Science student.
      
      ABOUT VINAY:
      Name: ${profile.name}
      Current Role: ${profile.role}
      Location: ${profile.location}
      Bio: ${profile.description}
      
      PROFESSIONAL EXPERIENCE:
      ${experienceContext}
      
      EDUCATION:
      ${educationContext}
      
      CERTIFICATIONS:
      ${certContext}
      
      DETAILED PROJECTS:
      ${projectContext}
      
      SKILLS:
      ${skills.map(s => `${s.name} (${s.level}%)`).join(", ")}

      GUIDELINES:
      - Answer concisely and professionally (max 3-4 sentences).
      - Focus on technical skills (Advanced Excel, Python, SQL) and business impact.
      - If asked about availability, mention he is based in Surat and open to remote/relocation.
      - If you don't have specific info, provide his email (${profile.email}) for direct contact.
      - Never hallucinate certifications or projects not listed above.
    `;

    // Using the recommended generateContent call structure
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: userMessage }] }],
      config: {
        systemInstruction,
        temperature: 0.4, // Keep it grounded and factual
        topP: 0.8,
      },
    });

    // Extracting text using the .text property as per guidelines
    return response.text?.trim() || "I'm sorry, I couldn't formulate a response. Please reach out to Vinay directly via the contact page.";
  } catch (error) {
    console.error("Gemini AI Service Error:", error);
    return "I'm currently having trouble accessing Vinay's portfolio data. Please try again or contact him directly.";
  }
};
