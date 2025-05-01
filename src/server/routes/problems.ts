
import { Router, Request, Response } from 'express';
import { getSession } from '../database/neo4j';

const router = Router();

// Get all problems
router.get('/', async (req: Request, res: Response) => {
  const session = getSession();
  try {
    const result = await session.run(`
      MATCH (p:Problem)
      RETURN p
      ORDER BY p.difficulty
    `);
    
    const problems = result.records.map(record => {
      const problem = record.get('p').properties;
      return {
        id: problem.id,
        name: problem.name,
        description: problem.description,
        difficulty: problem.difficulty.toNumber(),
        hint: problem.hint
      };
    });
    
    res.status(200).json(problems);
  } catch (error) {
    console.error('Error fetching problems:', error);
    res.status(500).json({ message: 'Error fetching problems', error });
  } finally {
    await session.close();
  }
});

// Get problem by ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const session = getSession();
  
  try {
    const result = await session.run(`
      MATCH (p:Problem {id: $id})
      RETURN p
    `, { id });
    
    if (result.records.length === 0) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    
    const problem = result.records[0].get('p').properties;
    
    res.status(200).json({
      id: problem.id,
      name: problem.name,
      description: problem.description,
      difficulty: problem.difficulty.toNumber(),
      hint: problem.hint
    });
  } catch (error) {
    console.error(`Error fetching problem ${id}:`, error);
    res.status(500).json({ message: 'Error fetching problem', error });
  } finally {
    await session.close();
  }
});

// Submit a solution
router.post('/:id/submissions', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, solution } = req.body;
  const session = getSession();
  
  if (!userId || !solution) {
    return res.status(400).json({ message: 'userId and solution are required' });
  }
  
  try {
    // Store the submission
    await session.run(`
      MATCH (u:User {id: $userId})
      MATCH (p:Problem {id: $problemId})
      CREATE (s:Submission {
        id: randomUUID(),
        solution: $solution,
        timestamp: datetime(),
        status: 'submitted'
      })
      CREATE (u)-[:SUBMITTED]->(s)-[:FOR]->(p)
    `, { userId, problemId: id, solution });
    
    // Here you would add logic to evaluate the solution
    // For now, we'll simulate a successful submission
    
    res.status(201).json({ message: 'Solution submitted successfully' });
  } catch (error) {
    console.error(`Error submitting solution for problem ${id}:`, error);
    res.status(500).json({ message: 'Error submitting solution', error });
  } finally {
    await session.close();
  }
});

export default router;
