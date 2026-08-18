export function lightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  const lightboxImg = lightbox?.querySelector(".lightbox-full");
  const closeBtn = lightbox?.querySelector(".lightbox-close");
  const prevBtn = lightbox?.querySelector(".lightbox-prev");
  const nextBtn = lightbox?.querySelector(".lightbox-next");

  let currentImages = [];
  let currentIndex = 0;

  function showImage(index) {
    const img = currentImages[index];

    if (!img || !lightboxImg) return;

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || "";

    currentIndex = index;
    lightbox.style.display = "flex";

    document.body.classList.add("no-scroll");

    const showArrows = currentImages.length > 1;

    if (nextBtn) nextBtn.style.display = showArrows ? "block" : "none";
    if (prevBtn) prevBtn.style.display = showArrows ? "block" : "none";
  }

  function closeLightbox() {
    lightbox.style.display = "none";
    lightboxImg.src = "";

    // Re-enable scroll
    document.body.classList.remove("no-scroll");
  }

  document.querySelectorAll(".lightbox-img").forEach((img) => {
    img.addEventListener("click", () => {
      const grid = img.closest(".image-grid");
      currentImages = Array.from(grid.querySelectorAll(".lightbox-img"));
      const clickedIndex = currentImages.indexOf(img);
      showImage(clickedIndex);
    });
  });

  nextBtn?.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    showImage(currentIndex);
  });

  prevBtn?.addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + currentImages.length) % currentImages.length;
    showImage(currentIndex);
  });

  closeBtn?.addEventListener("click", closeLightbox);

  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target === lightboxImg) {
      closeLightbox();
    }
  });

  // Keyboard navigation for lightbox
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
      if (e.key === "ArrowRight") {
        currentIndex = (currentIndex + 1) % currentImages.length;
        showImage(currentIndex);
      } else if (e.key === "ArrowLeft") {
        currentIndex =
          (currentIndex - 1 + currentImages.length) % currentImages.length;
        showImage(currentIndex);
      } else if (e.key === "Escape") {
        closeLightbox();
      }
    }
  });
}
