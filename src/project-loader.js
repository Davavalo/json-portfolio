import { lightbox } from "./lightbox.js";

async function loadProject() {
  const container = document.querySelector("#project-container");

  if (!container) return;

  const projectName = container.dataset.project;

  const response = await fetch(`/projects/${projectName}/data.json`);

  const project = await response.json();

  document.title = `${project.title} — Victor Davalos`;

  let html = `
    <section class="container work-entry mb-4">
      <div class="work-heading">
        <h2 class="work-title">
          ${project.title}
        </h2>

        <div class="work-meta">
          <span>${project.year}</span>
          <span class="separator">&middot;</span>
          <span>${project.role}</span>
        </div>
      </div>

      <div class="work-line"></div>

      <p class="work-description">
        ${project.description}
      </p>
    </section>
  `;

  // Thumbnail / hero image
  if (project.thumbnail) {
    html += `
      <section class="full-width bg-dark mb-4">
        <div class="container image-grid-section">
          <div class="image-grid">
            <figure>
              <img
                src="./images/${project.thumbnail.image}"
                alt="${project.thumbnail.alt}"
                class="lightbox-img"
              >
            </figure>
          </div>
        </div>
      </section>
    `;
  }

  project.sections.forEach((section) => {
    switch (section.type) {
      case "image":
        html += `
          <section class="container image-grid-section mb-4">
            <div class="image-grid">

              ${
                section.heading
                  ? `<h3 class="grid-title">${section.heading}</h3>`
                  : ""
              }

              <figure>
                <img
                  src="./images/${section.image}"
                  alt="${section.alt}"
                  class="lightbox-img"
                >
              </figure>

            </div>
          </section>
        `;
        break;

      case "gallery":
        html += `
          <section class="container image-grid-section mb-4">

            ${
              section.heading
                ? `<h3 class="grid-title">${section.heading}</h3>`
                : ""
            }

            <div class="image-grid">

              ${section.images
                .map(
                  (image) => `
                    <figure>
                      <img
                        src="./images/${image.image}"
                        alt="${image.alt}"
                        class="lightbox-img"
                      >
                    </figure>
                  `,
                )
                .join("")}

            </div>

          </section>
        `;
        break;

      case "text":
        html += `
          <section class="container image-grid-section mb-4">

            ${
              section.heading
                ? `<p><strong>${section.heading}</strong></p>`
                : ""
            }

            <p>
              ${section.content}
            </p>

          </section>
        `;
        break;
    }
  });

  container.innerHTML = html;

  lightbox();
}

loadProject();
