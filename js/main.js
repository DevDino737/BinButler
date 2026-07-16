import { initNavbar } from "./modules/navbar.js";
import { initSignupModal } from "./modules/signupModal.js";
import { initPickupModal } from "./modules/pickupModal.js";
import { initPricing } from "./modules/pricing.js";
import { initForms } from "./modules/forms.js";
import { initPopups } from "./modules/popups.js";
import { initReviews } from "./modules/reviews.js";
import { initReviewModal } from "./modules/reviewModal.js";

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initSignupModal();
  initPickupModal();
  initPricing();
  initForms();
  initPopups();
  initReviews();
  initReviewModal();
});

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});