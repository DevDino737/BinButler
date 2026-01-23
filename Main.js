document.addEventListener("DOMContentLoaded", () => {
  const openFormBtn = document.getElementById("openForm");
  const signupForm = document.getElementById("signupForm");
  const binSelect = document.getElementById("bin_location");
  const otherContainer = document.getElementById("other-container");
  const popup = document.getElementById("successPopup");
  const closePopup = document.getElementById("closePopup");

  // Toggle signup form
  openFormBtn.addEventListener("click", () => {
    signupForm.classList.toggle("hidden");
  });

  // Show "other" text box
  binSelect.addEventListener("change", () => {
    if (binSelect.value === "other") {
      otherContainer.classList.remove("hidden");
    } else {
      otherContainer.classList.add("hidden");
    }
  });

  // Handle form submit
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    signupForm.reset();
    signupForm.classList.add("hidden");

    popup.classList.remove("hidden");
  });

  // Close popup
  closePopup.addEventListener("click", () => {
    popup.classList.add("hidden");
  });
});
