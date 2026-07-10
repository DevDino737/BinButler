export function initSignupModal() {
  const navbar = document.querySelector(".navbar");
  const navToggle = document.querySelector(".nav-toggle");

  const openFormBtn = document.getElementById("openForm");
  const signupModal = document.getElementById("signupModal");
  const closeFormBtn = document.getElementById("closeForm");
  const signupForm = document.getElementById("signupForm");

  const pickupRequestModal = document.getElementById("pickupRequestModal");
  const pickupRequestForm = document.getElementById("pickupRequestForm");

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

  openFormBtn?.addEventListener("click", () => {
    setModalState(true);
    setPickupModalState(false);
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
}