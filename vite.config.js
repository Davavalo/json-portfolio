import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about/index.html"),
        work: resolve(__dirname, "work/index.html"),

        moonlight: resolve(
          __dirname,
          "projects/moonlight-dumplings/index.html",
        ),

        sga: resolve(__dirname, "projects/sga-design-group/index.html"),
      },
    },
  },
});
