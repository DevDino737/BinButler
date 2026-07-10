export function initNavbar() {
  const navbar = document.querySelector(".navbar");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll(".nav-links a");

  const setNavState = (isOpen) => {
    if (!navbar || !navToggle) return;

    navbar.classList.toggle("nav-open", isOpen);

    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  };

  navToggle?.addEventListener("click", () => {
    setNavState(!navbar.classList.contains("nav-open"));
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

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      navbar?.classList.contains("nav-open")
    ) {
      setNavState(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      setNavState(false);
    }
  });
}