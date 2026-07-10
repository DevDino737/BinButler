export function initPricing() {
  const pricingSection = document.getElementById("pricing");
  const pricingGrid =
    pricingSection?.querySelector(".pricing-grid") || null;

  const pricingCards = document.querySelectorAll(".pricing-option");
  const primaryPricingCard = document.querySelector(
    '.pricing-option[data-primary="true"]'
  );

  const centerPrimaryPricingCard = (behavior = "auto") => {
    if (
      window.innerWidth <= 768 &&
      pricingGrid &&
      primaryPricingCard
    ) {
      const targetScrollLeft =
        primaryPricingCard.offsetLeft -
        (pricingGrid.clientWidth - primaryPricingCard.clientWidth) / 2;

      pricingGrid.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior,
      });
    }
  };

  if (
    window.innerWidth <= 768 &&
    pricingGrid &&
    primaryPricingCard
  ) {
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
        card.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    });
  });
}