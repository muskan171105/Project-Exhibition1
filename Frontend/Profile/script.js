document.addEventListener('DOMContentLoaded', () => {
    const editModal = document.getElementById('edit-modal');
    const editInfoBtn = document.getElementById('edit-info-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const editForm = document.getElementById('edit-form');
  
    const profileName = document.getElementById('profile-name');
    const profileAge = document.getElementById('profile-age');
    const profileId = document.getElementById('profile-id');
  
    const avgHeartRate = document.getElementById('avg-heart-rate');
    const restingHeartRate = document.getElementById('resting-heart-rate');
    const hrv = document.getElementById('hrv');
    const lastHeartRate = document.getElementById('last-heart-rate');
  
    // Open modal
    editInfoBtn.addEventListener('click', () => {
      editModal.classList.remove('hidden');
    });
  
    // Close modal
    cancelBtn.addEventListener('click', () => {
      editModal.classList.add('hidden');
    });
  
    // Save changes
    editForm.addEventListener('submit', (event) => {
      event.preventDefault();
      profileName.textContent = editForm.name.value;
      profileAge.textContent = editForm.age.value;
      profileId.textContent = editForm['user-id'].value;
      editModal.classList.add('hidden');
    });
  
    // Simulated heart rate data
    const metrics = {
      avg: 75,
      resting: 65,
      hrv: 50,
      last: 82,
    };
  
    avgHeartRate.textContent = `${metrics.avg} bpm`;
    restingHeartRate.textContent = `${metrics.resting} bpm`;
    hrv.textContent = `${metrics.hrv} ms`;
    lastHeartRate.textContent = `${metrics.last} bpm`;
  });