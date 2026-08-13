import { defineConfig } from "vitest/config";

// Kept separate from vite.config.ts so the PWA plugin (and its service-worker
// build) never runs during tests.
export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
