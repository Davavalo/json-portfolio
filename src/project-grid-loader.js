async function loadGrid() {
  const container = document.querySelector("#grid-container");
  if (!container) return;
  const response = await fetch("/projects.json");
  const projects = await response.json();

  const projectListHtml = `
       ${projects
         .map(
           (project) => `
                <a href="/projects/${project.slug}/" class="project-card">
            <img
              src="/projects/${project.slug}/images/${project.thumbnail.image}"
              alt="${project.thumbnail.alt}"
            />
            <div class="project-info">
              <h3>${project.title}</h3>
              <p>${project.year}</p>
            </div>
          </a>
    `,
         )
         .join("")}
`;

  container.innerHTML = projectListHtml;
}

loadGrid();
