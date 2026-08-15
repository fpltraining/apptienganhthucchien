import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

/**
 * Where the app is served from.
 *
 * Root in development and on a domain of its own; a sub-path on GitHub Pages,
 * which serves a project site at /<repo>/. Getting this wrong does not fail
 * loudly — the page loads and every asset 404s — and it has to reach the
 * manifest's `start_url` and `scope` as well as the asset URLs, or the
 * installed icon opens a blank screen instead of the app.
 *
 * Always ends in a slash, because `start_url` and `navigateFallback` are built
 * by appending to it.
 */
const base = withTrailingSlash(process.env.BASE_PATH ?? "/");

function withTrailingSlash(path: string): string {
  const prefixed = path.startsWith("/") ? path : `/${path}`;
  return prefixed.endsWith("/") ? prefixed : `${prefixed}/`;
}

export default defineConfig({
  base,
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
        start_url: base,
        scope: base,
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
        navigateFallback: `${base}index.html`,
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
