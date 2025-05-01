
import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import problemRoutes from './routes/problems';
import userRoutes from './routes/users';
import tutorRoutes from './routes/tutor';
import { connectToNeo4j } from './database/neo4j';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(json());

// Connect to Neo4j
connectToNeo4j()
  .then(() => console.log('Connected to Neo4j database'))
  .catch((error) => console.error('Neo4j connection error:', error));

// Routes
app.use('/api/problems', problemRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tutor', tutorRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
