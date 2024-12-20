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
  const { name, dob, age, gender, height, weight, phone, user_id } = req.body;

  // Ensure all required fields are provided
  if (!name || !dob || !age || !gender || !height || !weight || !phone || !user_id) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = `
    INSERT INTO profile (name, date_of_birth, age, gender, height_cm, weight_kg, phone_number, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id;
  `;

  try {
    const result = await pool.query(query, [name, dob, age, gender, height, weight, phone, user_id]);
    const profileId = result.rows[0].id;

    res.status(200).json({
      message: 'Profile saved successfully',
      profileId: profileId,
      userId: user_id, // Include user_id in the response
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
