function backToTopButton() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  const showAfter = 400;

  const toggleButton = () => {
    btn.classList.toggle("visible", window.scrollY > showAfter);
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
