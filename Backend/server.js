const express = require('express');
const pool = require('./db/db');  // Correct path to db.js
const loginRouter = require('./routes/loginRoute');  // Import the login route
const profileRouter = require('./routes/profileRoutes');  // Import the profile route
const healthRouter = require('./routes/healthRoute');  // Import the health route
const recordRouter = require('./routes/recordRoute');  // Import the record route
const cors = require('cors');  // Import the CORS package
const path = require('path');  // Import path for handling file paths

const app = express();

// Enable CORS for all routes and origins
app.use(cors());  // This allows all origins by default

// Middleware to parse JSON request bodies
app.use(express.json());  // This allows us to access req.body as JSON

// Middleware to parse URL-encoded form data (used by FormData in frontend)
app.use(express.urlencoded({ extended: true }));

// Register the login route
app.use('/api', loginRouter);  // All login routes will now be under /api

// Register the profile route
app.use('/api/profile', profileRouter);  // All profile routes will now be under /api/profile

// Register the health route under /api/health
app.use('/api/health', healthRouter);  // All health-related routes will now be under /api/health

// Register the record route under /api/records
app.use('/api/records', recordRouter);  // All record routes will now be under /api/records

// New route to handle profile details submission
app.post('/api/profile', (req, res) => {
  const { name, date_of_birth, age, gender, height_cm, weight_kg, phone_number, user_id } = req.body;

  // Log the incoming data to check if it's being received correctly
  console.log("Received data:", req.body);

  // Validate that user_id is provided
  if (!user_id) {
    return res.status(400).send('User ID is required');
  }

  // Ensure user_id is an integer
  const parsedUserId = parseInt(user_id, 10);
  if (isNaN(parsedUserId)) {
    return res.status(400).send('User ID must be a valid integer');
  }

  // Insert the data into the 'profile' table
  pool.query(
    'INSERT INTO profile (name, date_of_birth, age, gender, height_cm, weight_kg, phone_number, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [name, date_of_birth, age, gender, height_cm, weight_kg, phone_number, parsedUserId],
    (err, result) => {
      if (err) {
        console.error('Error inserting profile data:', err);
        return res.status(500).send('Error saving profile details');
      }
      res.status(201).send('Profile details saved successfully');
    }
  );
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
