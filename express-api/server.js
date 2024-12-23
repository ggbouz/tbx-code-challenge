import express from 'express';
import cors from 'cors';
import { getFilesData } from './controllers/filesData.js';

// setup express app
const app = express();
const port = process.env.PORT || 3001;

// Middleware setup
app.use(cors());
app.use(express.json());

// Endpoint to get data from all files
app.get('/files/data', getFilesData);

// Start the server
app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});

// export module for testing
export { app };