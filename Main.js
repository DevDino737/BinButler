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

  // ------------------------
  // COUNT ANIMATION
  // ------------------------
  const animateSignupCount = (targetCount) => {
    if (!signupCount) return;

    const startCount = Number(signupCount.textContent) || 0;
    const range = targetCount - startCount;
    const duration = 800;
    const startTime = performance.now();

    const update = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      signupCount.textContent = Math.round(startCount + range * eased);

      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  };

  // ------------------------
  // BANNER TEXT
  // ------------------------
  const updateBannerMessage = (count) => {
    if (!signupBannerMessage) return;

    const spotsLeft = Math.max(foundingLimit - count, 0);

    if (spotsLeft > 0) {
      signupBannerMessage.textContent =
        `${count} signed up so far. Only ${spotsLeft} of the first ${foundingLimit} lifetime 30% off spots left.`;
    } else {
      signupBannerMessage.textContent =
        `${count} signed up so far. The first ${foundingLimit} spots have been claimed.`;
    }
  };

  const setSignupCount = (count) => {
    const safe = Math.max(Number(count) || 0, 0);
    animateSignupCount(safe);
    updateBannerMessage(safe);
  };

  // ------------------------
  // PARSE COUNT RESPONSE
  // ------------------------
  const parseSignupCount = (data) => {
    try {
      if (typeof data === "number") return data;

      if (typeof data === "string") {
        const parsed = JSON.parse(data);
        return Number(parsed.count);
      }

      if (typeof data === "object") {
        return Number(data.count);
      }
    } catch {
      return null;
    }

    return null;
  };

  // ------------------------
  // FETCH COUNT (FIXED)
  // ------------------------
  const fetchSignupCount = async () => {
    const res = await fetch(`${signupForm.action}?mode=count`);

    if (!res.ok) throw new Error("Failed to fetch");

    const text = await res.text();
    const count = parseSignupCount(text);

    if (!Number.isFinite(count)) throw new Error("Invalid count");

    return count;
  };

  // ------------------------
  // INITIAL LOAD
  // ------------------------
  setSignupCount(initialSignupCount);

  fetchSignupCount()
    .then((count) => setSignupCount(count))
    .catch(() => updateBannerMessage(initialSignupCount));

  // ------------------------
  // OPEN FORM
  // ------------------------
  openFormBtn.addEventListener("click", () => {
    signupForm.classList.remove("hidden");
    openFormBtn.classList.add("hidden");
  });

  // ------------------------
  // BIN LOCATION "OTHER"
  // ------------------------
  binSelect.addEventListener("change", () => {
    otherContainer.classList.toggle("hidden", binSelect.value !== "other");
  });

  // ------------------------
  // CONTACT METHOD SWITCH
  // ------------------------
  contactMethod.addEventListener("change", () => {
    emailContainer.classList.add("hidden");
    phoneContainer.classList.add("hidden");

    emailInput.required = false;
    phoneInput.required = false;

    if (contactMethod.value === "email") {
      emailContainer.classList.remove("hidden");
      emailInput.required = true;
    }

    if (contactMethod.value === "text") {
      phoneContainer.classList.remove("hidden");
      phoneInput.required = true;
    }
  });

  // ------------------------
  // FORM SUBMIT (FIXED)
  // ------------------------
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    fetch(signupForm.action, {
      method: "POST",
      body: new FormData(signupForm),
    })
      .then(async (res) => {
        const text = await res.text();

        if (text !== "Success") {
          throw new Error("Server error");
        }

        // Show success popup
        popup.classList.remove("hidden");

        // Update count
        try {
          const count = await fetchSignupCount();
          setSignupCount(count);
        } catch {
          setSignupCount(
            (Number(signupCount?.textContent) || initialSignupCount) + 1
          );
        }

        // Reset form
        signupForm.reset();
        signupForm.classList.add("hidden");
        openFormBtn.textContent = "Tap to Sign Up";
        openFormBtn.classList.remove("hidden");
      })
      .catch(() => {
        alert("Something went wrong. Please try again.");
      });
  });

  // ------------------------
  // CLOSE POPUP
  // ------------------------
  closePopup.addEventListener("click", () => {
    popup.classList.add("hidden");
  });
});