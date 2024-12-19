const express = require('express');
const pool = require('./db/db');  // Correct path to db.js
const loginRouter = require('./routes/loginRoute');  // Import the login route
const detectionRouter = require('./routes/detectionRoute');  // Import the detection route
const profileRouter = require('./routes/profileRoutes');  // Import the profile route
const cors = require('cors');  // Import the CORS package
const path = require('path');  // Import path for handling file paths

const app = express();

// Enable CORS for all routes and origins
app.use(cors());  // This allows all origins by default

// Middleware to parse JSON request bodies
app.use(express.json());  // This allows us to access req.body as JSON

// Middleware to parse URL-encoded form data (used by FormData in frontend)
app.use(express.urlencoded({ extended: true }));

// Example route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Register the login route
app.use('/api', loginRouter);  // All login routes will now be under /api

// Register the detection route
app.use('/api/detection', detectionRouter);  // All detection routes will be under /api/detection

// Register the profile route
app.use('/api/profile', profileRouter);  // All profile routes will now be under /api/profile

// New route to handle profile details submission
app.post('/api/profile', (req, res) => {
  const { name, date_of_birth, age, gender, height_cm, weight_kg, phone_number } = req.body;

  // Log the incoming data to check if it's being received correctly
  console.log("Received data:", req.body);

  // Insert the data into the 'profile' table
  pool.query(
    'INSERT INTO profile (name, date_of_birth, age, gender, height_cm, weight_kg, phone_number) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [name, date_of_birth, age, gender, height_cm, weight_kg, phone_number],
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
