import { defineConfig } from "vite";
import { resolve } from "path";
import fs from "fs";

const projectInputs = {};

const projectFolders = fs.readdirSync("projects", {
  withFileTypes: true,
});

for (const folder of projectFolders) {
  if (!folder.isDirectory()) continue;

  projectInputs[folder.name] = resolve(
    import.meta.dirname,
    `projects/${folder.name}/index.html`,
  );
}

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        about: resolve(import.meta.dirname, "about/index.html"),
        work: resolve(import.meta.dirname, "work/index.html"),

        ...projectInputs,
      },
    },
  },
});
