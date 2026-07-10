export function initReviews() {
  const viewport = document.querySelector(".reviews-viewport");
  const track = document.getElementById("reviewsTrack");

  if (!viewport || !track) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const SPEED = 0.45; // px per animation frame

  // Clone the original cards once so we always have two full sets
  // back-to-back — that's what makes the loop invisible.
  const originalCards = Array.from(track.children);
  originalCards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    clone.querySelectorAll("[id]").forEach((el) => el.removeAttribute("id"));
    track.appendChild(clone);
  });

  let setWidth = 0; // width of ONE full set of cards (incl. gaps)
  let offset = 0; // how far we've scrolled left, in px
  let dragging = false;
  let hovering = false;
  let startX = 0;
  let startOffset = 0;
  let rafId = null;
  let wheelResumeTimer = null;

  function measure() {
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    setWidth = originalCards.reduce(
      (sum, card) => sum + card.getBoundingClientRect().width + gap,
      0
    );
  }

  function wrap(value) {
    if (!setWidth) return value;
    return ((value % setWidth) + setWidth) % setWidth;
  }

  function render() {
    track.style.transform = `translate3d(${-offset}px,0,0)`;
  }

  function frame() {
    if (!dragging && !hovering && !reduceMotion) {
      offset = wrap(offset + SPEED);
      render();
    }
    rafId = requestAnimationFrame(frame);
  }

  function pointerX(e) {
    return e.touches ? e.touches[0].clientX : e.clientX;
  }

  function onPointerDown(e) {
    dragging = true;
    viewport.classList.add("is-dragging");
    startX = pointerX(e);
    startOffset = offset;
  }

  function onPointerMove(e) {
    if (!dragging) return;
    const dx = pointerX(e) - startX;
    offset = wrap(startOffset - dx);
    render();
  }

  function onPointerUp() {
    dragging = false;
    viewport.classList.remove("is-dragging");
  }

  function onWheel(e) {
    // Ignore mostly-vertical scrolling so normal page scroll still works
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;

    e.preventDefault();
    offset = wrap(offset + e.deltaX);
    render();

    hovering = true; // pause the auto-drift while the user is swiping
    clearTimeout(wheelResumeTimer);
    wheelResumeTimer = setTimeout(() => {
      hovering = false;
    }, 600);
  }

  viewport.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
  window.addEventListener("pointercancel", onPointerUp);

  // Touch fallback for browsers without full Pointer Events support
  viewport.addEventListener("touchstart", onPointerDown, { passive: true });
  viewport.addEventListener("touchmove", onPointerMove, { passive: true });
  viewport.addEventListener("touchend", onPointerUp);

  // Trackpad two-finger horizontal swipe
  viewport.addEventListener("wheel", onWheel, { passive: false });

  viewport.addEventListener("mouseenter", () => (hovering = true));
  viewport.addEventListener("mouseleave", () => (hovering = false));

  viewport.addEventListener("dragstart", (e) => e.preventDefault());

  window.addEventListener("resize", measure);

  measure();
  render();
  rafId = requestAnimationFrame(frame);

  // Expose a teardown in case this ever needs to be re-initialized
  return () => {
    cancelAnimationFrame(rafId);
    clearTimeout(wheelResumeTimer);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    window.removeEventListener("pointercancel", onPointerUp);
    window.removeEventListener("resize", measure);
  };
}