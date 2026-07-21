export async function loadFooter() {
  const footer = document.getElementById("footer");

  if (!footer) return;

  try {
    const response = await fetch("/components/footer.html");

    if (!response.ok) {
      throw new Error("Failed to load footer");
    }

    const html = await response.text();

    footer.innerHTML = html;

    // Get the current year
    const yearSpan = footer.querySelector("#year");

    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  } catch (err) {
    console.error("Footer load failed:", err);
  }
}
