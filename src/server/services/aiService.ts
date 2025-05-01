
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your-api-key',
});

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
    let messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ];
    
    // Call OpenAI API with the latest SDK format
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: messages.map(m => ({ role: m.role as any, content: m.content })),
      temperature: 0.7,
      max_tokens: 1000
    });
    
    return completion.choices[0].message.content || 'I apologize, but I couldn\'t generate a response.';
  } catch (error: any) {
    console.error('Error generating AI response:', error);
    
    // Fallback response if API call fails
    return "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
  }
};
