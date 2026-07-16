export function initReviewModal() {
  const navbar = document.querySelector(".navbar");
  const navToggle = document.querySelector(".nav-toggle");

  const openReviewFormBtn = document.getElementById("openReviewForm");
  const reviewModal = document.getElementById("reviewModal");
  const closeReviewFormBtn = document.getElementById("closeReviewForm");
  const reviewForm = document.getElementById("reviewForm");

  const signupModal = document.getElementById("signupModal");
  const signupForm = document.getElementById("signupForm");

  const pickupRequestModal = document.getElementById("pickupRequestModal");
  const pickupRequestForm = document.getElementById("pickupRequestForm");

  const setNavState = (isOpen) => {
    if (!navbar || !navToggle) return;
    navbar.classList.toggle("nav-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  };

  const setSignupModalState = (isOpen) => {
    signupModal?.classList.toggle("hidden", !isOpen);
    signupModal?.setAttribute("aria-hidden", String(!isOpen));
    signupForm?.classList.toggle("hidden", !isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  };

  const setPickupModalState = (isOpen) => {
    pickupRequestModal?.classList.toggle("hidden", !isOpen);
    pickupRequestModal?.setAttribute("aria-hidden", String(!isOpen));
    pickupRequestForm?.classList.toggle("hidden", !isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  };

  const setReviewModalState = (isOpen) => {
    reviewModal?.classList.toggle("hidden", !isOpen);
    reviewModal?.setAttribute("aria-hidden", String(!isOpen));
    reviewForm?.classList.toggle("hidden", !isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  };

  openReviewFormBtn?.addEventListener("click", (event) => {
    event.preventDefault();
    setReviewModalState(true);
    setSignupModalState(false);
    setPickupModalState(false);
    setNavState(false);
  });

  closeReviewFormBtn?.addEventListener("click", () => setReviewModalState(false));

  reviewModal?.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement && event.target.dataset.closeReview === "true") {
      setReviewModalState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && reviewModal && !reviewModal.classList.contains("hidden")) {
      setReviewModalState(false);
    }
  });
}