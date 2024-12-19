const sidebar = document.querySelector(".sidebar");
const sidebarToggler = document.querySelector(".sidebar-toggler");
// Toggle sidebar's collapsed state
sidebarToggler.addEventListener("click", () => {
sidebar.classList.toggle("collapsed");
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

