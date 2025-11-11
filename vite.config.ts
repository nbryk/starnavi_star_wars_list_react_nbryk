/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    // Встановлює jsdom як середовище для емуляції DOM, що є обов'язковим для React
    environment: "jsdom",

    // Додає функціонал @testing-library/jest-dom
    setupFiles: ["./src/setupTests.ts"],

    // Налаштування для звітів про покриття коду
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      // Вказує, які файли аналізувати
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/main.tsx", "src/types.ts"],
    },
  },
});
