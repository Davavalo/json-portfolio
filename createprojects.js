import fs from "fs";
import path from "path";

const ROOT_DIR = "./public/projects";
const OUTPUT_FILE = "./public/projects.json";
const PROJECT_PAGES_DIR = "./projects";

function getAllProjectDataFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);

    if (fs.statSync(filePath).isDirectory()) {
      getAllProjectDataFiles(filePath, arrayOfFiles);
    } else if (file.toLowerCase() === "data.json") {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

/**
 * Escapes values that will be inserted into HTML attributes/content.
 */
function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Creates a project index.html file.
 */
function generateProjectPage(slug, project) {
  const projectDir = path.join(PROJECT_PAGES_DIR, slug);
  const outputPath = path.join(projectDir, "index.html");

  fs.mkdirSync(projectDir, { recursive: true });

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>${escapeHtml(project.title)} — Victor Davalos</title>

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/victor-favicon.svg" />

    <!-- Stylesheet -->
    <link rel="stylesheet" href="/src/styles/styles.css" />
  </head>

  <body>
    <!-- Header -->
    <div id="header"></div>

    <!-- Project Information -->
    <main id="project-container" data-project="${escapeHtml(slug)}"></main>

    <!-- Back to Top Button -->
    <button id="back-to-top" aria-label="Back to top" title="Back to top">
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="12" y1="19" x2="12" y2="5"></line>
        <polyline points="5 12 12 5 19 12"></polyline>
      </svg>
    </button>

    <!-- Lightbox -->
    <div id="lightbox" class="lightbox">
      <img src="" alt="" class="lightbox-full" />
      <button class="lightbox-prev" aria-label="Previous image">
        &#10094;
      </button>
      <button class="lightbox-next" aria-label="Next image">
        &#10095;
      </button>
      <span class="lightbox-close">&times;</span>
    </div>

    <!-- Footer -->
    <div id="footer"></div>

    <!-- Scripts -->
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
`;

  fs.writeFileSync(outputPath, html, "utf8");

  return outputPath;
}

/**
 * Reads all project data, creates projects.json,
 * and generates an index.html page for every project.
 */
function mergeJsonFiles() {
  try {
    const jsonPaths = getAllProjectDataFiles(ROOT_DIR);
    const combinedData = [];

    jsonPaths.forEach((filePath) => {
      const fileData = fs.readFileSync(filePath, "utf8");
      const project = JSON.parse(fileData);

      const { thumbnail, title, year, role, featured } = project;

      const slug = path.basename(path.dirname(filePath));

      combinedData.push({
        slug,
        thumbnail,
        title,
        year,
        role,
        featured,
      });

      generateProjectPage(slug, project);
    });

    combinedData.sort((a, b) => Number(b.year) - Number(a.year));

    fs.writeFileSync(
      OUTPUT_FILE,
      JSON.stringify(combinedData, null, 2),
      "utf8",
    );

    console.log(
      `Success! Combined ${jsonPaths.length} projects into ${OUTPUT_FILE}`,
    );

    console.log(
      `Generated ${jsonPaths.length} project pages in ${PROJECT_PAGES_DIR}`,
    );
  } catch (error) {
    console.error("An error occurred during execution:", error.message);
    process.exit(1);
  }
}

mergeJsonFiles();
