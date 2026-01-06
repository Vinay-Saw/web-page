
import { GoogleGenAI } from "@google/genai";
import { portfolio } from "../data/portfolio";

/**
 * List of available API keys from environment variables.
 * We prioritize the standard API_KEY and fall back to alternatives if provided.
 */
const API_KEYS = [
  process.env.API_KEY,
  (process.env as any).API_KEY_2,
  (process.env as any).API_KEY_3,
  (process.env as any).API_KEY_4,
  (process.env as any).API_KEY_5,
].filter(Boolean) as string[];

let currentKeyIndex = 0;

/**
 * Helper to get the next available API key in the pool.
 */
const rotateKey = () => {
  currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
  console.log(`Rotating to API Key at index: ${currentKeyIndex}`);
};

/**
 * Interface with Vinay's AI Portfolio Assistant.
 * Includes a robust retry mechanism with key rotation.
 */
export const getAIResponse = async (userMessage: string) => {
  const { profile, experience, projects, education, skills, certifications } = portfolio;

  const context = `
[PROFESSIONAL PROFILE]
Name: ${profile.name}
Role: ${profile.role}
Summary: ${profile.description}
Location: ${profile.location}
Availability: ${profile.relocationInfo}

[WORK EXPERIENCE]
${experience.map(e => `- ${e.title} at ${e.company} (${e.period}): ${e.points.join(". ")}`).join("\n")}

[PROJECTS & CASE STUDIES]
${projects.map(p => `- ${p.title} (${p.categories.join(", ")}): ${p.desc}. Key Tech: ${p.tech.join(", ")}`).join("\n")}

[EDUCATION]
${education.map(ed => `- ${ed.degree} from ${ed.institution} (${ed.period})`).join("\n")}

[SKILLS & PROFICIENCIES]
${skills.map(s => `${s.name} (${s.level}%)`).join(", ")}

[CERTIFICATIONS & VERIFICATION LINKS]
${certifications.map(c => `- ${c.name} (${c.date}). Credential Link: ${c.url}`).join("\n")}
    `;

  const systemInstruction = `
    You are "Vinay's AI Portfolio Consultant". You represent Vinay Saw, a Data Analyst and IIT Madras Data Science student.
    
    CORE GUIDELINES:
    - Use ONLY the provided context to answer questions about Vinay's professional background.
    - If asked about something not in the context, politely state that you represent Vinay's professional work and suggest contacting him directly at ${profile.email}.
    - Maintain a professional, analytical, yet approachable tone.
    - Use Markdown for formatting: **bold** for key terms, bullet points for lists, and [Link Text](URL) for links.
    - If asked for his resume, provide this direct link: ${profile.links.resume}
    - If asked about certifications or credentials, provide the relevant [Verification Link](URL) from the context.
    
    USER INTERACTION:
    - Be concise but thorough.
    - Highlight Vinay's strengths in MIS, Operations, Data Analysis and Data Science.
  `;

  // Maximum attempts equal to number of keys available
  const maxAttempts = API_KEYS.length;
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      // Re-initialize with the current key from the pool
      const currentKey = API_KEYS[currentKeyIndex];
      const ai = new GoogleGenAI({ apiKey: currentKey });

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { 
          parts: [
            { text: `CONTEXT DATA:\n${context}` },
            { text: `USER QUESTION: ${userMessage}` }
          ] 
        },
        config: {
          systemInstruction,
          temperature: 0.2,
          topP: 0.8,
        },
      });

      const text = response.text?.trim();
      if (!text) throw new Error("Empty response from model");
      
      return text;

    } catch (error: any) {
      console.error(`Attempt ${attempt + 1} failed with key index ${currentKeyIndex}:`, error.message);
      
      // If it's a rate limit (429) or exhaustion, rotate and try again
      const isRateLimited = error.message?.includes('429') || error.message?.includes('exhausted');
      const isUnauthorized = error.message?.includes('401') || error.message?.includes('key');
      
      if ((isRateLimited || isUnauthorized) && attempt < maxAttempts - 1) {
        rotateKey();
        continue;
      }
      
      // If we've run out of keys or it's a non-retriable error
      break;
    }
  }

  return "I'm currently offline. Please try again in a few minutes or reach out to Vinay directly via email at " + profile.email;
};
