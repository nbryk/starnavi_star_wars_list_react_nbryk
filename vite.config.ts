/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    // Use jsdom environment for React testing
    environment: "jsdom",

    // Include setup file for @testing-library/jest-dom
    setupFiles: ["./src/setupTests.ts"],

    // Code coverage configuration
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      // Files to include in coverage
      include: ["src/**/*.{ts,tsx}"],
      // Files to exclude from coverage
      exclude: ["src/main.tsx", "src/types.ts"],
    },
  },
});
