const { Pool } = require('pg');

// Set up PostgreSQL client pool
const pool = new Pool({
  user: process.env.DB_USER, // Get DB user from .env
  host: process.env.DB_HOST,
  database: process.env.DB_NAME, // Get DB name from .env
  password: process.env.DB_PASSWORD, // Get DB password from .env
  port: process.env.DB_PORT || 5432,
});

// Controller to handle profile saving
const saveProfile = async (req, res) => {
  const { name, dob, age, gender, height, weight, phone } = req.body;

  const query = `
    INSERT INTO profile (name, date_of_birth, age, gender, height_cm, weight_kg, phone_number)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id;
  `;

  try {
    const result = await pool.query(query, [name, dob, age, gender, height, weight, phone]);
    const profileId = result.rows[0].id;

    res.status(200).json({
      message: 'Profile saved successfully',
      profileId: profileId,
    });
  } catch (error) {
    console.error('Error saving profile:', error);
    res.status(500).json({ message: 'Error saving profile', error: error.message });
  }
};

// Export the controller
module.exports = {
  saveProfile,
};
