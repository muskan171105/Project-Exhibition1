const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables from .env file

// Initialize the pool with your database connection details from environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Function to handle login
const login = async (req, res) => {
  const { username, password } = req.body; // Get username and password from request body

  console.log('Login attempt with username:', username);

  try {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1 AND password = $2', [username, password]);

    console.log('Query result:', result.rows);

    if (result.rows.length > 0) {
      res.status(200).json({ message: 'Login successful', user: result.rows[0] });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ error: 'Error during login' });
  }
};

// Function to handle registration
const register = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const existingUser = await pool.query('SELECT * FROM users WHERE user_id = $1', [username]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    const result = await pool.query(
      'INSERT INTO users (user_id, email, password) VALUES ($1, $2, $3) RETURNING user_id, email',
      [username, email, password]
    );

    res.status(201).json({ message: 'Registration successful', user: result.rows[0] });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ error: 'Error registering user' });
  }
};

module.exports = { login, register };
