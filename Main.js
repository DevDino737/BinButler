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
  const submitButton = signupForm.querySelector('input[type="submit"]');
  const defaultSubmitText = submitButton?.value || "Submit Request";

  // Open form
  openFormBtn.addEventListener("click", () => {
    signupForm.classList.remove("hidden");
    openFormBtn.classList.add("hidden");
  });

  // Show "other" bin location
  binSelect.addEventListener("change", () => {
    otherContainer.classList.toggle("hidden", binSelect.value !== "other");
  });

  // Show email or phone input
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

  // AJAX submit
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!popup.classList.contains("hidden")) return; // prevent double-show

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.value = "Submitting...";
      submitButton.classList.add("is-loading");
    }

    try {
      await fetch(signupForm.action, { method: "POST", body: new FormData(signupForm) });

      // Show popup
      popup.classList.remove("hidden");

      signupForm.reset();
      signupForm.classList.add("hidden");
      openFormBtn.textContent = "Tap to Sign Up";
      openFormBtn.classList.remove("hidden");
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.value = defaultSubmitText;
        submitButton.classList.remove("is-loading");
      }
    }
  });

  // Close popup
  closePopup.addEventListener("click", () => {
    popup.classList.add("hidden");
  });
});
