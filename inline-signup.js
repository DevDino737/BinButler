const nextBtn = document.getElementById("nextBtn");
const step2 = document.getElementById("step2");
const step1 = document.getElementById("step1");
const form = document.getElementById("signupForm");
const success = document.getElementById("success");

nextBtn.addEventListener("click", () => {
  step1.style.display = "none";
  step2.classList.remove("hidden");
});

form.addEventListener("submit", e => {
  e.preventDefault();
  fetch(form.action, {
    method: "POST",
    body: new FormData(form)
  }).then(res => {
    if (res.ok) {
      form.style.display = "none";
      success.classList.remove("hidden");
    } else {
      alert("Submission failed.");
    }
  });
});
