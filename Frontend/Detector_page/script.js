const sidebar = document.querySelector(".sidebar");
const sidebarToggler = document.querySelector(".sidebar-toggler");
// Toggle sidebar's collapsed state
sidebarToggler.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
});

const startDetectionBtn = document.querySelector(".heart-rate-btn");

startDetectionBtn.addEventListener("click", async () => {
    try {
        // Make the POST request to start the detection
        const response = await fetch('/api/detection/start-detection', {
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
