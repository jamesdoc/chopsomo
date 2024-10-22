import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/chopsomo/", // Set the repository name as the base path
  plugins: [react()],
});
