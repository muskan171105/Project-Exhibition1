const express = require('express');
const pool = require('./db/db');  // Correct path to db.js
const loginRouter = require('./routes/loginRoute');  // Import the login route
const cors = require('cors');  // Import the CORS package

const app = express();

// Enable CORS for all routes and origins
app.use(cors());  // This allows all origins by default

// Middleware to parse JSON request bodies
app.use(express.json());  // This allows us to access req.body as JSON

// Example route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Register the login route
app.use('/api', loginRouter);  // All login routes will now be under /api

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
