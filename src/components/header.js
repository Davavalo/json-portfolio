export async function loadHeader() {
  const header = document.getElementById("header");

  if (!header) return;

  const normalize = (path) =>
    path.replace(/\/index\.html$/, "").replace(/\/$/, "") || "/";

  const currentPath = normalize(window.location.pathname);

  try {
    const response = await fetch("/src/components/header.html");

    if (!response.ok) {
      throw new Error("Failed to load header");
    }

    const html = await response.text();

    header.innerHTML = html;

    // Highlight active nav link
    header.querySelectorAll(".menu a").forEach((link) => {
      const linkPath = normalize(new URL(link.href, location.origin).pathname);

      if (linkPath === currentPath) {
        link.classList.add("active");
      }
    });

    const toggleButton = header.querySelector(".menu-toggle");
    const navMenu = header.querySelector(".menu");

    if (!toggleButton || !navMenu) return;

    toggleButton.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      toggleButton.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });

    // Close menu when navigation link clicked
    navMenu.querySelectorAll(".menu-list a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        toggleButton.classList.remove("active");
        document.body.classList.remove("menu-open");
      });
    });

    // ESC closes menu
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        navMenu.classList.remove("active");
        toggleButton.classList.remove("active");
        document.body.classList.remove("menu-open");
      }
    });
  } catch (err) {
    console.error("Header load failed:", err);
  }
}
