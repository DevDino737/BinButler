document.addEventListener("DOMContentLoaded", () => {
  const openFormBtn = document.getElementById("openForm");
  const signupForm = document.getElementById("signupForm");
  const binSelect = document.getElementById("bin_location");
  const otherContainer = document.getElementById("other-container");
  const popup = document.getElementById("successPopup");
  const closePopup = document.getElementById("closePopup");
  const contactMethod = document.getElementById("contact_method");
  const emailContainer = document.getElementById("email-input-container");
  const phoneContainer = document.getElementById("phone-input-container");
  const emailInput = document.getElementById("contact_email");
  const phoneInput = document.getElementById("contact_phone");

  // Toggle signup form
  openFormBtn.addEventListener("click", () => {
    signupForm.classList.remove("hidden");
    openFormBtn.classList.add("hidden");
  });

  // Show "other" text box
  binSelect.addEventListener("change", () => {
    if (binSelect.value === "other") {
      otherContainer.classList.remove("hidden");
    } else {
      otherContainer.classList.add("hidden");
    }
  });

  // Show Email or Phone input based on selection
  contactMethod.addEventListener("change", () => {
    emailContainer.classList.add("hidden");
    phoneContainer.classList.add("hidden");
    emailInput.required = false;
    phoneInput.required = false;

    if (contactMethod.value === "email") {
      emailContainer.classList.remove("hidden");
      emailInput.required = true;
    } else if (contactMethod.value === "text") {
      phoneContainer.classList.remove("hidden");
      phoneInput.required = true;
    }
  });

  // Handle form submit
  signupForm.addEventListener("submit", () => {
    popup.classList.remove("hidden");

    signupForm.reset();
    signupForm.classList.add("hidden");
    openFormBtn.textContent = "Tap to Sign Up";
    openFormBtn.classList.remove("hidden");

    popup.classList.remove("hidden");
  });

  // Close popup
  closePopup.addEventListener("click", () => {
    popup.classList.add("hidden");
  });
});
