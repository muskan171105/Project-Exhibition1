// Sidebar toggler logic
const sidebar = document.querySelector(".sidebar");
const sidebarToggler = document.querySelector(".sidebar-toggler");
// Toggle sidebar's collapsed state
sidebarToggler.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
});

// Start Detection button logic
const startDetectionBtn = document.querySelector(".heart-rate-btn");

startDetectionBtn.addEventListener("click", async () => {
    try {
        // Make the POST request to start the detection
        const response = await fetch('/api/health/processHealthData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Check if the response is OK (status 200)
        if (response.ok) {
            const data = await response.json();
            // Handle the successful response, you can display the data
            alert('Detection Started Successfully: ' + data.message);

            // Call function to display results (assuming response includes the result)
            displayResults(data.result);
        } else {
            // Handle error if the request failed
            const errorData = await response.json();
            alert('Error: ' + errorData.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while starting the detection.');
    }
});

// Function to display heart rate detection results
const displayResults = (result) => {
    // Assuming `result` contains the heart rate and other parameters
    const resultContainer = document.querySelector('.heart-rate-container');
    resultContainer.innerHTML = `
        <h3>Detection Results</h3>
        <p><strong>Heart Rate:</strong> ${result.heart_rate}</p>
        <p><strong>HRV:</strong> ${result.hrv}</p>
        <p><strong>Stress Level:</strong> ${result.stress_level}</p>
        <p><strong>Respiratory Rate:</strong> ${result.respiratory_rate}</p>
        <p><strong>Illness Index:</strong> ${result.illness_index}</p>
        <p><strong>Mood:</strong> ${result.mood}</p>
        <p><strong>Sleep Quality:</strong> ${result.sleep_quality}</p>
        <p><strong>Cardiac Risk:</strong> ${result.cardiac_risk}</p>
        <p><strong>Activity Level:</strong> ${result.activity_level}</p>
    `;
};

// Photo input handling for preview (not related to heart detection but for other input)
const photoInput = document.getElementById("photo");
const photoPreview = document.getElementById("photo-preview");

photoInput.addEventListener("change", (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            photoPreview.src = e.target.result;
            photoPreview.style.display = "block";
        };

        reader.readAsDataURL(file);
    } else {
        photoPreview.style.display = "none";
    }
});
