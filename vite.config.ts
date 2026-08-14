import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    VitePWA({
      // The learner never sees an update prompt — new versions install silently
      // and apply on the next launch (curriculum §16.2).
      registerType: "autoUpdate",
      includeAssets: ["icons/apple-touch-icon.png"],
      manifest: {
        name: "Tiếng Anh Thực Chiến",
        // Home-screen label. iOS truncates past ~12 characters.
        short_name: "Tiếng Anh",
        description: "Học tiếng Anh giao tiếp 45 phút mỗi ngày",
        lang: "vi",
        start_url: "/",
        scope: "/",
        // Removes the Safari address bar, which is what makes it read as an app
        // rather than a web page (curriculum §16.3, item 1).
        display: "standalone",
        orientation: "portrait",
        background_color: "#1B4965",
        theme_color: "#1B4965",
        icons: [
          { src: "icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png" },
          {
            src: "icons/icon-maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        // App shell only. Lesson media is fetched and cached by the content
        // layer instead, so it can be evicted independently and never counts
        // against the shell's freshness.
        globPatterns: ["**/*.{js,css,html,woff2}", "icons/*.png"],
        navigateFallback: "/index.html",
        cleanupOutdatedCaches: true,
      },
      devOptions: { enabled: true, type: "module" },
    }),
  ],
  server: {
    host: true,
    // Same-origin in development, so the client never needs to know where the
    // proxy lives or deal with CORS.
    proxy: { "/api": { target: "http://localhost:8787", changeOrigin: true } },
  },
});
