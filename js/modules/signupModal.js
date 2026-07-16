export function initSignupModal() {
  const navbar = document.querySelector(".navbar");
  const navToggle = document.querySelector(".nav-toggle");

  const openFormBtn = document.getElementById("openForm");
  const signupModal = document.getElementById("signupModal");
  const closeFormBtn = document.getElementById("closeForm");
  const signupForm = document.getElementById("signupForm");

  const pickupRequestModal = document.getElementById("pickupRequestModal");
  const pickupRequestForm = document.getElementById("pickupRequestForm");

  const reviewModal = document.getElementById("reviewModal");
  const reviewForm = document.getElementById("reviewForm");

  const setNavState = (isOpen) => {
    if (!navbar || !navToggle) return;

    navbar.classList.toggle("nav-open", isOpen);

    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  };

  const setModalState = (isOpen) => {
    signupModal.classList.toggle("hidden", !isOpen);
    signupModal.setAttribute("aria-hidden", String(!isOpen));
    signupForm.classList.toggle("hidden", !isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  };

  const setPickupModalState = (isOpen) => {
    pickupRequestModal.classList.toggle("hidden", !isOpen);
    pickupRequestModal.setAttribute("aria-hidden", String(!isOpen));
    pickupRequestForm.classList.toggle("hidden", !isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  };

  const setReviewModalState = (isOpen) => {
    reviewModal?.classList.toggle("hidden", !isOpen);
    reviewModal?.setAttribute("aria-hidden", String(!isOpen));
    reviewForm?.classList.toggle("hidden", !isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  };

  openFormBtn?.addEventListener("click", () => {
    setModalState(true);
    setPickupModalState(false);
    setReviewModalState(false);
    setNavState(false);
  });

  closeFormBtn?.addEventListener("click", () => {
    setModalState(false);
  });

  signupModal?.addEventListener("click", (event) => {
    if (
      event.target instanceof HTMLElement &&
      event.target.dataset.closeForm === "true"
    ) {
      setModalState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      signupModal &&
      !signupModal.classList.contains("hidden")
    ) {
      setModalState(false);
    }
  });

  const planSelect = document.getElementById("selected_plan");
  const chooseButtons = document.querySelectorAll(".pricing-choose-btn");

  chooseButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();

      const plan = button.dataset.plan;

      if (planSelect && plan) {
        planSelect.value = plan;
        planSelect.dispatchEvent(new Event("change", { bubbles: true }));
      }

      setModalState(true);
      setPickupModalState(false);
      setReviewModalState(false);
      setNavState(false);
    });
  });
}