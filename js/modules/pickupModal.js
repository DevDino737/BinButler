export function initPickupModal() {
  const navbar = document.querySelector(".navbar");
  const navToggle = document.querySelector(".nav-toggle");

  const openPickupRequestBtn = document.getElementById("openPickupRequest");
  const pickupRequestModal = document.getElementById("pickupRequestModal");
  const closePickupRequestBtn = document.getElementById("closePickupRequest");
  const pickupRequestForm = document.getElementById("pickupRequestForm");

  const signupModal = document.getElementById("signupModal");
  const signupForm = document.getElementById("signupForm");

  const pickupDateInput = document.getElementById("pickup_date");

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

  openPickupRequestBtn?.addEventListener("click", () => {
    setPickupModalState(true);
    setModalState(false);
    setNavState(false);
  });

  closePickupRequestBtn?.addEventListener("click", () => {
    setPickupModalState(false);
  });

  pickupRequestModal?.addEventListener("click", (event) => {
    if (
      event.target instanceof HTMLElement &&
      event.target.dataset.closePickup === "true"
    ) {
      setPickupModalState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      pickupRequestModal &&
      !pickupRequestModal.classList.contains("hidden")
    ) {
      setPickupModalState(false);
    }
  });

  if (pickupDateInput) {
    pickupDateInput.min = new Date().toISOString().split("T")[0];
  }
}