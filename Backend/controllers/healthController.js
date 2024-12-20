const { spawn } = require('child_process');
const pool = require('../db/db');
const path = require('path');

// Function to run the model (Python script)
const runModel = () => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, 'calculate_heart_rate.py');
    const pythonProcess = spawn('python', [scriptPath]);

    let result = '';

    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python script error: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        try {
          console.log('Python output:', result); // Log raw output for debugging
          const modelOutput = JSON.parse(result);
          resolve(modelOutput);
        } catch (error) {
          reject(`Error parsing Python output: ${error.message}`);
        }
      } else {
        reject(`Python script failed with code ${code}`);
      }
    });
  });
};

// Function to save the model output data into the database with user_id
const saveHealthData = async (modelOutput, userId) => {
  const {
    heart_rate,
    stress_level,
    hrv,
    respiratory_rate,
    illness_index,
    mood,
    sleep_quality,
    cardiac_risk,
    activity_level
  } = modelOutput;

  // Helper functions to check and format values
  const checkAndSetInteger = (value) => (typeof value === 'number' && !isNaN(value) ? Math.round(value) : null);
  const checkAndSetString = (value) => (typeof value === 'string' ? value : null);

  // SQL query to insert health data into the database with user_id
  const query = `
    INSERT INTO analysis (
      user_id, heart_rate, stress_level, hrv, respiratory_rate, illness_index, mood, sleep_quality, cardiac_risk, activity_level
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;

  // Values to insert into the database, including user_id
  const values = [
    userId, // Include user_id here
    checkAndSetInteger(heart_rate),
    checkAndSetString(stress_level),
    checkAndSetInteger(hrv),
    checkAndSetInteger(respiratory_rate),
    checkAndSetInteger(illness_index),
    mood,
    checkAndSetString(sleep_quality),
    cardiac_risk,
    checkAndSetString(activity_level)
  ];

  try {
    // Perform the database query
    const result = await pool.query(query, values);
    console.log('Health data saved successfully:', result.rows[0]);
    return result.rows[0]; // Return the saved data
  } catch (err) {
    console.error('Error inserting health data:', err.message); // Log specific error message
    throw new Error('Database insertion failed');
  }
};

// Function to handle the process of running the model and saving data
const processHealthData = async (req, res) => {
  try {
    const userId = 1711; // Set the user_id to 1711
    // Run the model and get the output
    const modelOutput = await runModel();

    // Save the model output data to the database with user_id
    const savedData = await saveHealthData(modelOutput, userId);

    // Send the response back to the frontend
    res.status(200).json({
      message: 'Health data processed and saved successfully',
      data: savedData
    });
  } catch (error) {
    console.error('Error processing health data:', error);
    res.status(500).json({
      message: 'Error processing health data',
      error: error.message, // Include the error message in the response
    });
  }
};

module.exports = { runModel, saveHealthData, processHealthData };
