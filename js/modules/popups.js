export function initPopups() {
  const popup = document.getElementById("successPopup");
  const closePopup = document.getElementById("closePopup");

  const pickupSuccessPopup = document.getElementById(
    "pickupSuccessPopup"
  );

  const closePickupPopup = document.getElementById(
    "closePickupPopup"
  );

  closePopup?.addEventListener("click", () => {
    popup?.classList.add("hidden");
  });

  closePickupPopup?.addEventListener("click", () => {
    pickupSuccessPopup?.classList.add("hidden");
  });
}