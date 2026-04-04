document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll(".nav-links a");
  const openFormBtn = document.getElementById("openForm");
  const signupModal = document.getElementById("signupModal");
  const closeFormBtn = document.getElementById("closeForm");
  const signupForm = document.getElementById("signupForm");
  const binSelect = document.getElementById("bin_location");
  const otherContainer = document.getElementById("other-container");
  const popup = document.getElementById("successPopup");
  const closePopup = document.getElementById("closePopup");
  const pricingSection = document.getElementById("pricing");
  const pricingGrid = pricingSection?.querySelector(".pricing-grid") || null;
  const pricingCards = document.querySelectorAll(".pricing-option");
  const primaryPricingCard = document.querySelector('.pricing-option[data-primary="true"]');
  const contactMethod = document.getElementById("contact_method");
  const emailContainer = document.getElementById("email-input-container");
  const phoneContainer = document.getElementById("phone-input-container");
  const emailInput = document.getElementById("contact_email");
  const phoneInput = document.getElementById("contact_phone");
  const submitButton = signupForm.querySelector('input[type="submit"]');
  const defaultSubmitText = submitButton?.value || "Submit Request";
  const setNavState = (isOpen) => {
    if (!navbar || !navToggle) return;

    navbar.classList.toggle("nav-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  };
  const centerPrimaryPricingCard = (behavior = "auto") => {
    if (window.innerWidth <= 768 && pricingGrid && primaryPricingCard) {
      const targetScrollLeft =
        primaryPricingCard.offsetLeft - (pricingGrid.clientWidth - primaryPricingCard.clientWidth) / 2;

      pricingGrid.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior,
      });
    }
  };
  const setModalState = (isOpen) => {
    signupModal.classList.toggle("hidden", !isOpen);
    signupModal.setAttribute("aria-hidden", String(!isOpen));
    signupForm.classList.toggle("hidden", !isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  };

  navToggle?.addEventListener("click", () => {
    setNavState(!navbar?.classList.contains("nav-open"));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        setNavState(false);
      }
    });
  });

  document.addEventListener("pointerdown", (event) => {
    const target = event.target;

    if (
      window.innerWidth <= 768 &&
      navbar?.classList.contains("nav-open") &&
      target instanceof Element &&
      !target.closest(".navbar")
    ) {
      setNavState(false);
    }
  });

  // Open form
  openFormBtn.addEventListener("click", () => {
    setModalState(true);
    setNavState(false);
  });

  closeFormBtn.addEventListener("click", () => {
    setModalState(false);
  });

  signupModal.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement && event.target.dataset.closeForm === "true") {
      setModalState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navbar?.classList.contains("nav-open")) {
      setNavState(false);
    }

    if (event.key === "Escape" && !signupModal.classList.contains("hidden")) {
      setModalState(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      setNavState(false);
    }
  });

  if (window.innerWidth <= 768 && pricingGrid && primaryPricingCard) {
    requestAnimationFrame(() => {
      centerPrimaryPricingCard("auto");
    });

    window.addEventListener("load", () => {
      centerPrimaryPricingCard("auto");
    });
  }

  pricingCards.forEach((card) => {
    card.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    });
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
      otherContainer.classList.add("hidden");
      emailContainer.classList.add("hidden");
      phoneContainer.classList.add("hidden");
      setModalState(false);
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
