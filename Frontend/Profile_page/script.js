const sidebar = document.querySelector(".sidebar");
const sidebarToggler = document.querySelector(".toggler");

// Toggle sidebar's collapsed state
sidebarToggler.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
});

// Handle form submission to store profile data in the database
const profileForm = document.getElementById("user-details-form"); // Profile form element

// Trigger form submission when the form is submitted
profileForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission to handle it manually

    // Get the values from the form fields
    const name = document.getElementById("name").value;
    const date_of_birth = document.getElementById("dob").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const height_cm = document.getElementById("height").value;
    const weight_kg = document.getElementById("weight").value;
    const phone_number = document.getElementById("phone").value;

    // Log the values to check if they are being correctly retrieved
    console.log("Name:", name);
    console.log("Date of Birth:", date_of_birth);
    console.log("Age:", age);
    console.log("Gender:", gender);
    console.log("Height (cm):", height_cm);
    console.log("Weight (kg):", weight_kg);
    console.log("Phone Number:", phone_number);

    // Prepare data as a URL-encoded string
    const data = new URLSearchParams();
    data.append("name", name);
    data.append("date_of_birth", date_of_birth);
    data.append("age", age);
    data.append("gender", gender);
    data.append("height_cm", height_cm);
    data.append("weight_kg", weight_kg);
    data.append("phone_number", phone_number);

    // Send the form data to the backend
    fetch("http://localhost:3000/api/profile", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",  // Ensure the backend receives data in the correct format
        },
        body: data.toString(),  // Convert URLSearchParams to a query string
    })
    .then(response => {
        if (response.ok) {
            alert("Profile details saved successfully!");
        } else {
            alert("Error saving profile details.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred while saving the profile.");
    });
});
