function backToTopButton() {
  const btn = document.getElementById("back-to-top");

  if (!btn) return;

  const showAfter = 400;
  let ticking = false;

  const toggleButton = () => {
    if (ticking) return;

    ticking = true;

    requestAnimationFrame(() => {
      btn.classList.toggle("visible", window.scrollY > showAfter);
      ticking = false;
    });
  };

  window.addEventListener("scroll", toggleButton, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  toggleButton();
}

backToTopButton();
