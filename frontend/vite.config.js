import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  plugins: [react()],
  root: ".", // Make sure it's the correct root directory
  build: {
    outDir: "dist",
  },
});
