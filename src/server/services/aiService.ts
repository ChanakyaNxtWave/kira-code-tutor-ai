
import { Configuration, OpenAIApi } from 'openai';

// Initialize OpenAI or use another AI service like Anthropic
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY || 'your-api-key',
});
const openai = new OpenAIApi(configuration);

interface UserContext {
  attemptedProblems: any[];
  unattemptedProblems: any[];
}

interface ConversationMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export const generateTutorResponse = async (
  message: string,
  userContext: UserContext,
  conversationHistory: ConversationMessage[] = []
): Promise<string> => {
  try {
    // Add system prompt to guide the AI tutor
    const systemPrompt = `You are an AI tutor specialized in data structures and algorithms. 
    You help students learn DSA concepts and solve coding problems.
    The student has attempted these problems: ${JSON.stringify(userContext.attemptedProblems.map(p => p.name))}.
    Problems they haven't tried yet: ${JSON.stringify(userContext.unattemptedProblems.map(p => p.name))}.`;
    
    // Build conversation context
    let messages: ConversationMessage[] = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ];
    
    // Call OpenAI API
    const completion = await openai.createChatCompletion({
      model: 'gpt-4-turbo',
      messages: messages.map(m => ({ role: m.role, content: m.content })),
      temperature: 0.7,
      max_tokens: 1000
    });
    
    return completion.data.choices[0].message?.content || 'I apologize, but I couldn\'t generate a response.';
  } catch (error: any) {
    console.error('Error generating AI response:', error);
    
    // Fallback response if API call fails
    return "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
  }
};
