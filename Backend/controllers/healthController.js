const { spawn } = require('child_process');
const pool = require('../db/db');
const path = require('path');

const runModel = (user_id) => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, 'calculate_heart_rate.py');
    const pythonProcess = spawn('python', [scriptPath, user_id]);

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
          if (!result) {
            reject('Python script returned empty output');
          }
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

const saveHealthData = async (user_id, modelOutput) => {
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

  const checkAndSetInteger = (value) => (typeof value === 'number' && !isNaN(value) ? Math.round(value) : null);
  const checkAndSetString = (value) => (typeof value === 'string' ? value : null);

  const query = `
    INSERT INTO analysis (
      heart_rate, stress_level, hrv, respiratory_rate, illness_index, mood, sleep_quality, cardiac_risk, activity_level, user_id
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;

  const values = [
    checkAndSetInteger(heart_rate),
    checkAndSetString(stress_level),
    checkAndSetInteger(hrv),
    checkAndSetInteger(respiratory_rate),
    checkAndSetInteger(illness_index),
    mood,
    checkAndSetString(sleep_quality),
    cardiac_risk,
    checkAndSetString(activity_level),
    checkAndSetInteger(user_id)
  ];

  try {
    const result = await pool.query(query, values);
    console.log('Health data saved successfully:', result.rows[0]);
    return result.rows[0];
  } catch (err) {
    console.error('Error inserting health data:', err);
    throw new Error('Database insertion failed');
  }
};

const processHealthData = async (req, res) => {
  const { user_id } = req.body;

  try {
    const modelOutput = await runModel(user_id);
    const savedData = await saveHealthData(user_id, modelOutput);

    res.status(200).json({
      message: 'Health data processed and saved successfully',
      data: savedData
    });
  } catch (error) {
    console.error('Error processing health data:', error);
    res.status(500).json({ message: 'Error processing health data' });
  }
};

module.exports = { runModel, saveHealthData, processHealthData };
