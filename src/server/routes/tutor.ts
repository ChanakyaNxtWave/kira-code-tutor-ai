
import { Router, Request, Response } from 'express';
import { getSession } from '../database/neo4j';
import { generateTutorResponse } from '../services/aiService';

const router = Router();

// Get AI tutor response
router.post('/chat', async (req: Request, res: Response) => {
  const { userId, message, conversationHistory } = req.body;
  
  if (!userId || !message) {
    return res.status(400).json({ message: 'userId and message are required' });
  }
  
  try {
    // Get user's learning context from the database
    const session = getSession();
    const userContext = await getUserLearningContext(userId, session);
    
    // Generate AI response
    const response = await generateTutorResponse(message, userContext, conversationHistory);
    
    // Store conversation in database
    await session.run(`
      MATCH (u:User {id: $userId})
      CREATE (m:Message {
        id: randomUUID(),
        content: $message,
        timestamp: datetime(),
        type: 'user'
      })
      CREATE (r:Message {
        id: randomUUID(),
        content: $response,
        timestamp: datetime(),
        type: 'ai'
      })
      CREATE (u)-[:SENT]->(m)-[:FOLLOWED_BY]->(r)
      CREATE (u)-[:RECEIVED]->(r)
    `, { userId, message, response });
    
    await session.close();
    
    res.status(200).json({
      response,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error generating tutor response:', error);
    res.status(500).json({ message: 'Error generating tutor response', error });
  }
});

// Get conversation history
router.get('/:userId/conversations', async (req: Request, res: Response) => {
  const { userId } = req.params;
  const session = getSession();
  
  try {
    const result = await session.run(`
      MATCH (u:User {id: $userId})-[:SENT|:RECEIVED]-(m:Message)
      RETURN m
      ORDER BY m.timestamp
    `, { userId });
    
    const messages = result.records.map(record => {
      const message = record.get('m').properties;
      return {
        id: message.id,
        content: message.content,
        timestamp: message.timestamp,
        type: message.type
      };
    });
    
    res.status(200).json(messages);
  } catch (error) {
    console.error(`Error fetching conversations for user ${userId}:`, error);
    res.status(500).json({ message: 'Error fetching conversations', error });
  } finally {
    await session.close();
  }
});

// Helper function to get user's learning context
async function getUserLearningContext(userId: string, session: any) {
  const result = await session.run(`
    MATCH (u:User {id: $userId})
    OPTIONAL MATCH (u)-[:SUBMITTED]->(s:Submission)-[:FOR]->(p:Problem)
    WITH u, collect(distinct p) as attemptedProblems
    OPTIONAL MATCH (p:Problem)
    WHERE NOT p IN attemptedProblems
    WITH u, attemptedProblems, collect(p) as unattemptedProblems
    RETURN attemptedProblems, unattemptedProblems
  `, { userId });
  
  if (result.records.length === 0) {
    return { attemptedProblems: [], unattemptedProblems: [] };
  }
  
  const record = result.records[0];
  const attemptedProblems = record.get('attemptedProblems').map((problem: any) => problem.properties);
  const unattemptedProblems = record.get('unattemptedProblems').map((problem: any) => problem.properties);
  
  return {
    attemptedProblems,
    unattemptedProblems
  };
}

export default router;
