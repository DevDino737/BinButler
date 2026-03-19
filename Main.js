document.addEventListener("DOMContentLoaded", () => {
  const openFormBtn = document.getElementById("openForm");
  const signupForm = document.getElementById("signupForm");
  const binSelect = document.getElementById("bin_location");
  const otherContainer = document.getElementById("other-container");
  const popup = document.getElementById("successPopup");
  const closePopup = document.getElementById("closePopup");
  const contactMethod = document.getElementById("contact_method");
  const emailContainer = document.getElementById("email-input-container");
  const phoneContainer = document.getElementById("phone-input-container");
  const emailInput = document.getElementById("contact_email");
  const phoneInput = document.getElementById("contact_phone");
  const signupCount = document.getElementById("signupCount");
  const signupBannerMessage = document.getElementById("signupBannerMessage");
  const initialSignupCount = Number(
    signupCount?.dataset.count || signupCount?.textContent || 0
  );
  const foundingLimit = Number(signupCount?.dataset.limit || 10);

  const animateSignupCount = (targetCount) => {
    if (!signupCount) return;

    const startCount = Number(signupCount.textContent) || 0;
    const countRange = targetCount - startCount;
    const duration = 900;
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      signupCount.textContent = Math.round(
        startCount + countRange * easedProgress
      );

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  };

  const updateBannerMessage = (count) => {
    if (!signupBannerMessage) return;

    const spotsLeft = Math.max(foundingLimit - count, 0);

    if (spotsLeft > 0) {
      signupBannerMessage.textContent =
        `${count} signed up so far. Only ${spotsLeft} of the first ${foundingLimit} lifetime 30% off spots left.`;
      return;
    }

    signupBannerMessage.textContent =
      `${count} signed up so far. The first ${foundingLimit} lifetime 30% off spots have been claimed.`;
  };

  const setSignupCount = (count) => {
    const safeCount = Math.max(Number(count) || 0, 0);
    animateSignupCount(safeCount);
    updateBannerMessage(safeCount);
  };

  const parseSignupCount = (payload) => {
    if (typeof payload === "number") return payload;

    if (typeof payload === "string") {
      const parsedTextNumber = Number(payload.trim());
      if (Number.isFinite(parsedTextNumber)) return parsedTextNumber;

      try {
        return parseSignupCount(JSON.parse(payload));
      } catch {
        return null;
      }
    }

    if (payload && typeof payload === "object") {
      const possibleCount = payload.count ?? payload.signupCount ?? payload.total;
      const parsedObjectNumber = Number(possibleCount);
      return Number.isFinite(parsedObjectNumber) ? parsedObjectNumber : null;
    }

    return null;
  };

  const fetchSignupCount = async () => {
    const response = await fetch(`${signupForm.action}?mode=count`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Unable to load signup count");
    }

    const responseText = await response.text();
    const parsedCount = parseSignupCount(responseText);

    if (!Number.isFinite(parsedCount)) {
      throw new Error("Invalid signup count response");
    }

    return parsedCount;
  };

  setSignupCount(initialSignupCount);

  fetchSignupCount()
    .then((liveCount) => {
      setSignupCount(liveCount);
    })
    .catch(() => {
      updateBannerMessage(initialSignupCount);
    });

  // Open form
  openFormBtn.addEventListener("click", () => {
    signupForm.classList.remove("hidden");
    openFormBtn.classList.add("hidden");
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

  // AJAX submit (NO redirect, NO extra success page)
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault(); // stop normal form submit


  if (!popup.classList.contains("hidden")) return; // prevent double-show

    fetch(signupForm.action, {
      method: "POST",
      body: new FormData(signupForm),
    })
      .then(async () => {
        popup.classList.remove("hidden");
        try {
          const liveCount = await fetchSignupCount();
          setSignupCount(liveCount);
        } catch {
          setSignupCount((Number(signupCount?.textContent) || initialSignupCount) + 1);
        }

        signupForm.reset();
        signupForm.classList.add("hidden");
        openFormBtn.textContent = "Tap to Sign Up";
        openFormBtn.classList.remove("hidden");
      })
      .catch(() => {
        alert("Something went wrong. Please try again.");
      });
  });

  // Close popup
  closePopup.addEventListener("click", () => {
    popup.classList.add("hidden");
  });
});
