import { GoogleGenerativeAI, GenerateContentResult } from "@google/generative-ai";
import type { UserPersona } from "../types";

// Access the API key from Vite's environment variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error("VITE_GEMINI_API_KEY environment variable not found. App functionality will be limited.");
}

// Initialize the GoogleGenerativeAI client
const genAI = new GoogleGenerativeAI(apiKey || "MISSING_API_KEY");

const modelName = "gemini-1.5-flash-latest";

const generateSystemInstruction = (
  baseInstructionType: 'explanation' | 'evaluation',
  persona: UserPersona,
  blockType?: string,
  profession?: string
): string => {
  let instruction = "";

  if (baseInstructionType === 'explanation') {
    instruction = `You are a world-class expert in both programming/coding and learning science. You possess a deep understanding of pedagogical principles, especially for teaching children and absolute beginners. You combine this dual expertise to be the ultimate Coding Coach.
Your primary goal is to build confidence and make learning accessible and fun. Explain concepts clearly and concisely (2-3 short paragraphs). Use simple language and avoid jargon unless necessary; if used, explain it immediately in the simplest terms. Break down complex ideas into tiny, digestible pieces.
Celebrate curiosity and effort.`;

    if (persona === 'kid') {
      instruction += `\nYour style should be super playful and exciting! Your goal is to make learning feel like assembling \"Coding Blocks\" – fun, creative, and empowering.
Explain concepts using the \"Coding Blocks\" analogy. For example, if explaining variables, call them \"Storage Blocks.\" If explaining output, call them \"Display Blocks.\"
The current block they are learning about is: \"${blockType || 'a new Coding Block'}\". Relate it to building, games, or making cool things.`;
    } else { // adult
      instruction += `\nYour style should be insightful, respectful, and motivating. Your goal is to make learning to code feel like understanding fundamental \"Conceptual Blocks\" or \"Building Blocks of Logic.\"
Explain concepts using this \"Conceptual Blocks\" analogy. For example, variables can be thought of as \"Information Containers\" or \"Named Values.\" Output is like a \"Display Mechanism.\"
The current concept they are exploring is: \"${blockType || 'a new fundamental concept'}\".`;
      if (profession) {
        instruction += `\nThe user has mentioned their field of interest is \"${profession}\". Where natural and appropriate, try to subtly relate the explanation or an example to this field. For instance, how might an \"Information Container\" be used in ${profession}? Or how could a \"Display Mechanism\" show results relevant to ${profession}? This is to help them see the relevance of coding concepts in their context. Do this only if it feels organic.`;
      }
    }
  } else { // evaluation
    instruction = `As a Coding Coach with profound knowledge in programming, coding, and the science of learning (especially for novices and kids), your feedback is critical. You leverage this expertise to guide, motivate, and ensure genuine understanding.
Your primary goal is to encourage them and help them understand. Always start with positive reinforcement for their effort.
If their code/attempt is incorrect or incomplete, gently guide them. Offer clear, simple hints or ask leading questions.
Focus on the core function of the concept they are learning: \"${blockType || 'the current concept'}\".
If their attempt is mostly correct, praise them enthusiastically! Perhaps suggest another way to use the concept or how it might connect with others.
Keep feedback constructive, easy to understand, and highly motivational. Assume they are using pseudo-code or very basic syntax unless the language is specified.`;

    if (persona === 'kid') {
      instruction += `\nUse the \"Coding Blocks\" analogy. Their attempt is like trying to fit a new \"Coding Block.\" If it's not quite right, help them see how to make it fit. Your feedback should feel like a helpful friend showing them how cool their new building block is. Make it fun! The current block is: \"${blockType || 'this Coding Block'}\".`;
    } else { // adult
      instruction += `\nUse the \"Conceptual Blocks\" or \"Building Blocks of Logic\" analogy. Their attempt is to apply a \"Conceptual Block.\" Help them understand its application. Your feedback should be clear, respectful, and empowering. The current concept is: \"${blockType || 'this concept'}\".`;
      if (profession) {
        instruction += `\nRemember, the user is interested in \"${profession}\". If their attempt relates or could relate to this field, you can gently highlight that connection if it's encouraging or clarifying. But the primary focus is on their understanding of the coding concept.`;
      }
    }
  }
  return instruction;
};

export const explainConcept = async (
  conceptPrompt: string,
  persona: UserPersona,
  blockType?: string,
  profession?: string,
): Promise<string> => {
  if (!apiKey) return "API Key not configured. Cannot fetch explanation.";

  const systemInstruction = generateSystemInstruction('explanation', persona, blockType, profession);
  const model = genAI.getGenerativeModel({ model: modelName, systemInstruction });

  try {
    const result: GenerateContentResult = await model.generateContent(conceptPrompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error fetching concept explanation from Gemini:", error);
    throw new Error(`Failed to get explanation. ${error instanceof Error ? error.message : String(error)}`);
  }
};

export const evaluateCode = async (
  preamble: string,
  challengeDescription: string,
  userCode: string,
  persona: UserPersona,
  blockType?: string,
  profession?: string
): Promise<string> => {
  if (!apiKey) return "API Key not configured. Cannot evaluate code.";

  const systemInstruction = generateSystemInstruction('evaluation', persona, blockType, profession);
  const model = genAI.getGenerativeModel({ model: modelName, systemInstruction });
  
  const fullPrompt = `${preamble} The user was given this challenge related to \"${blockType || 'the current concept'}\": '${challengeDescription}'. They submitted the following attempt: \`\`\`\n${userCode}\n\`\`\` Please review their submission.`;

  try {
    const result: GenerateContentResult = await model.generateContent(fullPrompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error evaluating code with Gemini:", error);
    throw new Error(`Failed to evaluate code. ${error instanceof Error ? error.message : String(error)}`);
  }
};
