
import { GoogleGenAI, Type } from "@google/genai";
import { UserSettings } from '../types';

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Using a mock API key.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "mock-api-key" });

const generateTailoredDocumentsPrompt = (jobDescription: string, userSettings: UserSettings): string => `
  As an expert career coach and resume writer, your task is to tailor a resume and cover letter for a specific job.
  
  **Job Description:**
  ---
  ${jobDescription}
  ---
  
  **Base Resume:**
  ---
  ${userSettings.baseResume}
  ---
  
  **Base Cover Letter:**
  ---
  ${userSettings.baseCoverLetter}
  ---
  
  **Instructions:**
  1.  **Analyze:** Carefully analyze the job description to identify key skills, experiences, and qualifications the employer is seeking.
  2.  **Tailor Resume:** Rewrite the base resume to highlight the most relevant experiences and skills that match the job description. Use action verbs and quantify achievements where possible. The output should be a single string of text, formatted with newlines for readability.
  3.  **Tailor Cover Letter:** Rewrite the base cover letter to directly address the specific company and role. Mention how the applicant's skills align with the job requirements. Keep it professional, concise, and engaging. The output should be a single string of text.
  4.  **Format:** Provide the output in the specified JSON format.
`;


export const generateTailoredDocuments = async (
  jobDescription: string,
  userSettings: UserSettings
): Promise<{ tailoredResume: string; tailoredCoverLetter: string }> => {
  // In a real scenario, process.env.API_KEY would be set. 
  // For this environment, we'll return a mock response if the key is missing.
  if (!process.env.API_KEY) {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
      return {
          tailoredResume: `// --- MOCK RESPONSE --- //\n\n**John Doe**\n123 Main St, Anytown, USA | (555) 123-4567 | john.doe@email.com\n\n**Summary**\nA highly-skilled Senior Frontend Engineer with over 5 years of experience, specializing in React and TypeScript. Proven ability to lead development on high-traffic e-commerce platforms and mentor engineering teams to success. Expert in building beautiful, performant applications that precisely match product and design specifications.\n\n**Experience**\n**Senior Frontend Developer** | Tech Solutions Inc. | 2018 - Present\n- Led the architecture and development of a next-generation e-commerce platform using React, resulting in a 30% increase in user engagement.\n- Mentored a team of 4 junior developers, enhancing team productivity and improving code quality by 20% through rigorous code reviews and pair programming sessions.\n\n**Skills**\n- **Languages:** TypeScript, JavaScript (ES6+)\n- **Frameworks:** React, Next.js\n- **Tools:** Webpack, Babel, Git, Figma`,
          tailoredCoverLetter: `// --- MOCK RESPONSE --- //\n\n**Dear Hiring Manager at Innovate Inc.,**\n\nI am writing to express my enthusiastic interest in the Senior Frontend Engineer position advertised on your careers page. With over five years of dedicated experience in developing scalable, high-performance web applications with React and TypeScript, I am confident that I possess the skills and passion necessary to excel in this role and contribute significantly to Innovate Inc.'s next-generation user interfaces.\n\nIn my previous role at Tech Solutions Inc., I led the development of a major e-commerce platform, a project that honed my abilities in collaborating effectively with product and design teams to translate vision into reality. My commitment to mentoring junior engineers and fostering a culture of quality aligns with the responsibilities outlined in your job description. I am particularly excited by Innovate Inc.'s reputation for innovation and look forward to the opportunity to bring my expertise to your team.\n\nThank you for considering my application. I am eager to discuss how my background can benefit Innovate Inc.\n\n**Sincerely,\nJohn Doe**`,
      };
  }

  try {
    const prompt = generateTailoredDocumentsPrompt(jobDescription, userSettings);
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tailoredResume: {
              type: Type.STRING,
              description: 'The full text of the tailored resume, formatted with newlines.'
            },
            tailoredCoverLetter: {
              type: Type.STRING,
              description: 'The full text of the tailored cover letter, formatted with newlines.'
            }
          },
          required: ["tailoredResume", "tailoredCoverLetter"]
        },
      },
    });

    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);

    return {
      tailoredResume: result.tailoredResume,
      tailoredCoverLetter: result.tailoredCoverLetter,
    };
  } catch (error) {
    console.error("Error generating documents with Gemini:", error);
    throw new Error("Failed to generate tailored documents. Please check your API key and try again.");
  }
};
