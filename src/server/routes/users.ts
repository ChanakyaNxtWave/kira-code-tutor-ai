
import { Router } from 'express';
import type { Request, Response } from 'express';
import { getSession } from '../database/neo4j';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Get user profile
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const session = getSession();
  
  try {
    const result = await session.run(`
      MATCH (u:User {id: $id})
      OPTIONAL MATCH (u)-[:SUBMITTED]->(s:Submission)
      RETURN u, count(s) as submissionCount
    `, { id });
    
    if (result.records.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const user = result.records[0].get('u').properties;
    const submissionCount = result.records[0].get('submissionCount').toNumber();
    
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      submissionCount
    });
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    res.status(500).json({ message: 'Error fetching user', error });
  } finally {
    await session.close();
  }
});

// Create a new user
router.post('/', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const session = getSession();
  
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'name, email, and password are required' });
  }
  
  try {
    // Check if user already exists
    const checkResult = await session.run(`
      MATCH (u:User {email: $email})
      RETURN u
    `, { email });
    
    if (checkResult.records.length > 0) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }
    
    // Create new user
    const userId = uuidv4();
    await session.run(`
      CREATE (u:User {
        id: $id,
        name: $name,
        email: $email,
        password: $password,
        createdAt: datetime()
      })
    `, { id: userId, name, email, password });
    
    res.status(201).json({
      id: userId,
      name,
      email
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error });
  } finally {
    await session.close();
  }
});

// Get user progress
router.get('/:id/progress', async (req: Request, res: Response) => {
  const { id } = req.params;
  const session = getSession();
  
  try {
    const result = await session.run(`
      MATCH (u:User {id: $id})
      OPTIONAL MATCH (u)-[:SUBMITTED]->(s:Submission)-[:FOR]->(p:Problem)
      WITH u, p, collect(s) as submissions
      RETURN p.id as problemId, p.name as problemName, 
             p.difficulty as difficulty, size(submissions) as attemptCount,
             [s in submissions WHERE s.status = 'correct' | s][0] as solvedSubmission
      ORDER BY difficulty
    `, { id });
    
    const progress = result.records.map(record => {
      const solvedSubmission = record.get('solvedSubmission');
      
      return {
        problemId: record.get('problemId'),
        problemName: record.get('problemName'),
        difficulty: record.get('difficulty').toNumber(),
        attemptCount: record.get('attemptCount').toNumber(),
        solved: solvedSubmission !== null,
        solvedAt: solvedSubmission ? solvedSubmission.properties.timestamp : null
      };
    });
    
    res.status(200).json(progress);
  } catch (error) {
    console.error(`Error fetching progress for user ${id}:`, error);
    res.status(500).json({ message: 'Error fetching user progress', error });
  } finally {
    await session.close();
  }
});

export default router;
