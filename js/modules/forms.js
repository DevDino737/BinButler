export function initForms() {
  const signupForm = document.getElementById("signupForm");
  const pickupRequestForm = document.getElementById("pickupRequestForm");

  const selectedPlan = document.getElementById("selected_plan");
  const serviceDateContainer = document.getElementById("service-date-container");
  const serviceDateInput = document.getElementById("service_date");

  const binSelect = document.getElementById("bin_location");
  const otherContainer = document.getElementById("other-container");

  const contactMethod = document.getElementById("contact_method");
  const emailContainer = document.getElementById("email-input-container");
  const phoneContainer = document.getElementById("phone-input-container");

  const emailInput = document.getElementById("contact_email");
  const phoneInput = document.getElementById("contact_phone");

  const popup = document.getElementById("successPopup");
  const pickupSuccessPopup = document.getElementById("pickupSuccessPopup");

  const submitButton =
    signupForm?.querySelector('input[type="submit"]');

  const pickupSubmitButton =
    pickupRequestForm?.querySelector('input[type="submit"]');

  const defaultSubmitText =
    submitButton?.value || "Submit Request";

  const defaultPickupSubmitText =
    pickupSubmitButton?.value || "Send Pickup Request";

  const syncServiceDateField = () => {
    const showServiceDate =
      selectedPlan?.value === "on_demand";

    serviceDateContainer?.classList.toggle(
      "hidden",
      !showServiceDate
    );

    if (serviceDateInput) {
      serviceDateInput.required = showServiceDate;

      if (!showServiceDate) {
        serviceDateInput.value = "";
      }
    }
  };

  selectedPlan?.addEventListener("change", syncServiceDateField);
  syncServiceDateField();

  binSelect?.addEventListener("change", () => {
    otherContainer?.classList.toggle(
      "hidden",
      binSelect.value !== "other"
    );
  });

  contactMethod?.addEventListener("change", () => {
    emailContainer?.classList.add("hidden");
    phoneContainer?.classList.add("hidden");

    if (emailInput) emailInput.required = false;
    if (phoneInput) phoneInput.required = false;

    if (contactMethod.value === "email") {
      emailContainer?.classList.remove("hidden");
      if (emailInput) emailInput.required = true;
    } else if (contactMethod.value === "text") {
      phoneContainer?.classList.remove("hidden");
      if (phoneInput) phoneInput.required = true;
    }
  });

  signupForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (popup && !popup.classList.contains("hidden")) return;

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.value = "Submitting...";
      submitButton.classList.add("is-loading");
    }

    try {
      await fetch(signupForm.action, {
        method: "POST",
        body: new FormData(signupForm),
      });

      popup?.classList.remove("hidden");

      signupForm.reset();
      syncServiceDateField();

      otherContainer?.classList.add("hidden");
      emailContainer?.classList.add("hidden");
      phoneContainer?.classList.add("hidden");

      document.getElementById("signupModal")
        ?.classList.add("hidden");

      document.body.style.overflow = "";
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

  pickupRequestForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Honeypot check: real visitors never fill this hidden field, bots usually do.
    const honeypot = document.getElementById("pickup_website");
    if (honeypot && honeypot.value) {
      // Pretend it worked so the bot doesn't learn it was caught, but send nothing.
      pickupSuccessPopup?.classList.remove("hidden");
      pickupRequestForm.reset();
      document.getElementById("pickupRequestModal")?.classList.add("hidden");
      document.body.style.overflow = "";
      return;
    }

    if (pickupSubmitButton) {
      pickupSubmitButton.disabled = true;
      pickupSubmitButton.value = "Sending...";
      pickupSubmitButton.classList.add("is-loading");
    }

    try {
      await fetch(pickupRequestForm.action, {
        method: "POST",
        body: new FormData(pickupRequestForm),
      });

      pickupSuccessPopup?.classList.remove("hidden");

      pickupRequestForm.reset();

      document
        .getElementById("pickupRequestModal")
        ?.classList.add("hidden");

      document.body.style.overflow = "";
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      if (pickupSubmitButton) {
        pickupSubmitButton.disabled = false;
        pickupSubmitButton.value =
          defaultPickupSubmitText;
        pickupSubmitButton.classList.remove("is-loading");
      }
    }
  });
}