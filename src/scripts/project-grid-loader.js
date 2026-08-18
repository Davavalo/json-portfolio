async function loadGrid() {
  const container = document.querySelector("#grid-container");
  if (!container) return;

  try {
    const response = await fetch("/projects.json");

    if (!response.ok) {
      throw new Error(`Failed to load projects: ${response.status}`);
    }

    const projects = await response.json();

    const projectsToDisplay =
      container.dataset.gridType === "featured"
        ? projects.filter((project) => project.featured)
        : projects;

    container.innerHTML = projectsToDisplay
      .map(
        (project) => `
          <a href="/projects/${project.slug}/" class="project-card">
            <img
              src="/projects/${project.slug}/images/${project.thumbnail.image}"
              alt="${project.thumbnail.alt}"
              loading="lazy"
            />
            <div class="project-info">
              <h3>${project.title}</h3>
              <p>${project.role}</p>
            </div>
          </a>
        `,
      )
      .join("");
  } catch (error) {
    console.error("Failed to load project grid:", error);
  }
}

loadGrid();
