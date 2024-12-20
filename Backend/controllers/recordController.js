const pool = require('../db/db'); // Correct path to db.js

// Function to fetch health data for user_id 1711
const getHealthData = async () => {
  const userId = 1711; // Fixed user_id
  const query = 'SELECT * FROM analysis WHERE user_id = $1'; // Fetch data for the given user_id
  try {
    const result = await pool.query(query, [userId]);
    return result.rows; // Return the health data
  } catch (err) {
    console.error('Error fetching health data:', err.message);
    throw new Error('Error fetching health data');
  }
};

// Controller to handle API requests for fetching health data
const fetchHealthData = async (req, res) => {
  try {
    const healthData = await getHealthData(); // Fetch data for user_id 1711
    res.status(200).json({
      message: 'Health data fetched successfully',
      data: healthData,
    });
  } catch (error) {
    console.error('Error fetching health data:', error);
    res.status(500).json({
      message: 'Error fetching health data',
      error: error.message,
    });
  }
};

module.exports = { fetchHealthData };
