const { spawn } = require('child_process');
const pool = require('../db/db');

const startDetection = async (req, res) => {
  // Start the Python process
  const pythonProcess = spawn('python', ['calculate_heart_rate.py']);

  let data = '';
  
  // Listen for data from the Python script
  pythonProcess.stdout.on('data', (chunk) => {
    data += chunk.toString();
  });

  // Handle errors from Python script
  pythonProcess.stderr.on('data', (error) => {
    console.error(`Python Error: ${error.toString()}`);
  });

  // Handle process exit
  pythonProcess.on('close', async (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: 'Python script failed' });
    }

    try {
      // Ensure the Python script output is a valid JSON string
      let modelOutput;
      try {
        modelOutput = JSON.parse(data);
      } catch (jsonError) {
        return res.status(500).json({ error: 'Invalid JSON output from Python script' });
      }

      // Ensure the modelOutput contains all the necessary fields
      if (!modelOutput.heart_rate || !modelOutput.hrv || !modelOutput.stress_level ||
          !modelOutput.spo2 || !modelOutput.respiratory_rate || !modelOutput.wellness_index) {
        return res.status(400).json({ error: 'Incomplete data received from the Python model' });
      }

      // SQL query to insert data into the database
      const query = `
        INSERT INTO patient (heart_rate, hrv, stress_level, spo2, respiratory_rate, wellness_index) 
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
      `;
      const values = [
        modelOutput.heart_rate,
        modelOutput.hrv,
        modelOutput.stress_level,
        modelOutput.spo2,
        modelOutput.respiratory_rate,
        modelOutput.wellness_index,
      ];

      // Execute the query
      const result = await pool.query(query, values);

      // Respond with the inserted data
      res.status(200).json({ message: 'Data saved successfully', data: result.rows[0] });
    } catch (error) {
      console.error(`Database Error: ${error.message}`);
      res.status(500).json({ error: 'Failed to save data to the database' });
    }
  });
};

// Export the controller
module.exports = {
  startDetection,
};
