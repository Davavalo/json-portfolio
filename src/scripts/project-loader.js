import { lightbox } from "./lightbox.js";

async function loadProject() {
  const container = document.querySelector("#project-container");

  if (!container) return;

  const projectName = container.dataset.project;

  const response = await fetch(`/projects/${projectName}/data.json`);

  if (!response.ok) {
    throw new Error(`Failed to load project: ${response.status}`);
  }

  const project = await response.json();

  document.title = `${project.title} — Victor Davalos`;

  const thumbnailHTML = project.thumbnail
    ? `
      <section class="full-width bg-dark mb-4">
        <div class="container image-grid-section">
          <div class="image-grid">
            <figure>
              <img
                src="./images/${project.thumbnail.image}"
                alt="${project.thumbnail.alt || ""}"
                class="lightbox-img"
                loading="eager"
                fetchpriority="high"
              >

              ${
                project.thumbnail.caption
                  ? `<figcaption>${project.thumbnail.caption}</figcaption>`
                  : ""
              }
            </figure>
          </div>
        </div>
      </section>
    `
    : "";

  let html = `
    ${thumbnailHTML}

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

  project.sections.forEach((section) => {
    switch (section.type) {
      case "image": {
        const imageHTML = section.link
          ? `
            <a
              href="${section.link}"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="./images/${section.image}"
                alt="${section.alt || ""}"
              >
            </a>
          `
          : `
            <img
              src="./images/${section.image}"
              alt="${section.alt || ""}"
              class="lightbox-img"
              loading="lazy"
            >
          `;

        const captionHTML = section.caption
          ? `<figcaption>${section.caption}</figcaption>`
          : "";

        html += `
          <section class="container image-grid-section mb-4">
            ${
              section.heading
                ? `<h3 class="grid-title">${section.heading}</h3>`
                : ""
            }

            <div class="image-grid">
              <figure>
                ${imageHTML}
                ${captionHTML}
              </figure>
            </div>
          </section>
        `;

        break;
      }

      case "gallery": {
        const imagesHTML = section.images
          .map(
            (image) => `
              <figure>
                <img
                  src="./images/${image.image}"
                  alt="${image.alt || ""}"
                  class="lightbox-img"
                  loading="lazy"
                >

                ${
                  image.caption
                    ? `<figcaption>${image.caption}</figcaption>`
                    : ""
                }
              </figure>
            `,
          )
          .join("");

        html += `
          <section class="container image-grid-section mb-4">
            ${
              section.heading
                ? `<h3 class="grid-title">${section.heading}</h3>`
                : ""
            }

            <div class="image-grid">
              ${imagesHTML}
            </div>
          </section>
        `;

        break;
      }

      case "text": {
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
    }
  });

  container.innerHTML = html;

  lightbox();
}

loadProject();
