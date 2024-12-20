// Function to fetch health records for user_id 1711
async function fetchHealthRecords() {
  try {
    // Fetch data from the API endpoint
    const response = await fetch('http://localhost:3000/api/records/records');
    const data = await response.json();

    if (response.ok) {
      const records = data.data;

      // Check if records exist
      if (records.length === 0) {
        displayNoRecordsMessage();
        return;
      }

      // Populate the table with records
      populateRecordsTable(records);
    } else {
      console.error('Failed to fetch health records:', data.error);
      displayErrorMessage('Failed to fetch health records. Please try again later.');
    }
  } catch (error) {
    console.error('Error fetching health records:', error);
    displayErrorMessage('An error occurred while fetching health records.');
  }
}

// Function to populate the table with records
function populateRecordsTable(records) {
  const tableBody = document.querySelector('#recordsTable tbody');

  // Clear any existing rows
  tableBody.innerHTML = '';

  // Loop through records and add rows to the table
  records.forEach(record => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${record.heart_rate || 'N/A'}</td>
      <td>${record.stress_level || 'N/A'}</td>
      <td>${record.hrv || 'N/A'}</td>
      <td>${record.respiratory_rate || 'N/A'}</td>
      <td>${record.illness_index || 'N/A'}</td>
      <td>${record.mood || 'N/A'}</td>
      <td>${record.sleep_quality || 'N/A'}</td>
      <td>${record.cardiac_risk || 'N/A'}</td>
      <td>${record.activity_level || 'N/A'}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Function to display a message when no records are available
function displayNoRecordsMessage() {
  const tableBody = document.querySelector('#recordsTable tbody');
  tableBody.innerHTML = `
    <tr>
      <td colspan="9" style="text-align: center;">No health records available.</td>
    </tr>
  `;
}

// Function to display an error message
function displayErrorMessage(message) {
  const tableBody = document.querySelector('#recordsTable tbody');
  tableBody.innerHTML = `
    <tr>
      <td colspan="9" style="text-align: center; color: red;">${message}</td>
    </tr>
  `;
}

// Call the function to fetch records when the page loads
document.addEventListener('DOMContentLoaded', fetchHealthRecords);
