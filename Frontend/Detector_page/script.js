// Sidebar toggler logic
const sidebar = document.querySelector(".sidebar");
const sidebarToggler = document.querySelector(".sidebar-toggler");

// Toggle sidebar's collapsed state
sidebarToggler.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
});

// Get the "Start Detection" button
document.getElementById("start-detection-button").addEventListener("click", startDetection);

function startDetection() {
    const button = document.getElementById("start-detection-button");
    button.disabled = true; // Disable the button to prevent multiple clicks
    button.textContent = "Processing..."; // Change button text to show progress

    // Make a POST request to the backend to start the heart rate detection
    fetch("http://localhost:3000/api/health/processHealthData", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        // Optionally, you can send any required data in the body if needed
        body: JSON.stringify({ message: "Start heart rate detection" })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Detection completed successfully:", data);
        alert("Detection completed successfully!"); // You can replace this with a more customized UI message
        button.disabled = false; // Re-enable the button
        button.textContent = "Start Detection"; // Reset button text
    })
    .catch(error => {
        console.error("Error during detection:", error);
        alert("Error during detection. Please try again.");
        button.disabled = false; // Re-enable the button
        button.textContent = "Start Detection"; // Reset button text
    });
}


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
