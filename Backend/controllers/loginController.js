const pool = require('../db/db');

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Query to fetch user data based on username and password
    const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Return the user data, including the id
    res.status(200).json({ message: 'Login successful', user: result.rows[0] });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error logging in' });
  }
};

module.exports = { login };