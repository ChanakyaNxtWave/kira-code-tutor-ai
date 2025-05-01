
import neo4j, { Driver, Session } from 'neo4j-driver';

let driver: Driver;

export const connectToNeo4j = async (): Promise<void> => {
  const uri = process.env.NEO4J_URI || 'bolt://localhost:7687';
  const user = process.env.NEO4J_USER || 'neo4j';
  const password = process.env.NEO4J_PASSWORD || 'password';

  try {
    driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
    
    // Verify connectivity
    const session = driver.session();
    await session.run('RETURN 1');
    await session.close();
    
    // Initialize database with seed data if needed
    await initializeDatabase();
    
    console.log('Connected to Neo4j successfully');
  } catch (error) {
    console.error('Failed to connect to Neo4j:', error);
    throw error;
  }
};

export const getSession = (): Session => {
  if (!driver) {
    throw new Error('Neo4j driver not initialized. Call connectToNeo4j first.');
  }
  return driver.session();
};

export const closeNeo4jConnection = async (): Promise<void> => {
  if (driver) {
    await driver.close();
  }
};

// Initialize database with schema constraints and default data
const initializeDatabase = async (): Promise<void> => {
  const session = getSession();
  try {
    // Create constraints
    await session.run(`
      CREATE CONSTRAINT user_id IF NOT EXISTS
      FOR (u:User) REQUIRE u.id IS UNIQUE
    `);
    
    await session.run(`
      CREATE CONSTRAINT problem_id IF NOT EXISTS
      FOR (p:Problem) REQUIRE p.id IS UNIQUE
    `);
    
    // Check if we need to seed data
    const result = await session.run('MATCH (p:Problem) RETURN count(p) as count');
    const count = result.records[0].get('count').toNumber();
    
    if (count === 0) {
      // Seed problems
      await session.run(`
        CREATE (p1:Problem {
          id: 'array_reversal',
          name: 'Array Reversal',
          description: 'Write a function to reverse an array in-place.',
          difficulty: 1,
          hint: 'Use two pointers, one at the start and one at the end.'
        })
        CREATE (p2:Problem {
          id: 'reverse_linked_list',
          name: 'Reverse Linked List',
          difficulty: 2,
          description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
          hint: 'Keep track of prev, current, and next pointers.'
        })
        CREATE (p3:Problem {
          id: 'valid_parentheses',
          name: 'Valid Parentheses',
          difficulty: 2,
          description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets and in the correct order.',
          hint: 'Use a stack to keep track of opening brackets.'
        })
        
        // Create concept nodes
        CREATE (c1:Concept {id: 'arrays', name: 'Arrays', description: 'Linear data structure with elements stored in contiguous memory locations'})
        CREATE (c2:Concept {id: 'linked_lists', name: 'Linked Lists', description: 'Linear data structure where elements are stored in nodes with pointers to the next element'})
        CREATE (c3:Concept {id: 'stacks', name: 'Stacks', description: 'LIFO (Last In First Out) abstract data type'})
        
        // Create relationships between problems and concepts
        CREATE (p1)-[:USES]->(c1)
        CREATE (p2)-[:USES]->(c2)
        CREATE (p3)-[:USES]->(c3)
      `);
      console.log('Database seeded with initial data');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    await session.close();
  }
};
