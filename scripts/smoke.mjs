/**
 * End-to-end smoke check against a built app, on a phone-sized viewport.
 *
 * Unit tests cover the streak arithmetic; this covers the part they cannot —
 * that the screens actually render on a phone and that the loop
 * picker → home → session → streak works against real IndexedDB.
 *
 *   npm run build && npm run preview &
 *   node scripts/smoke.mjs
 */
import { chromium, devices } from "playwright";

const BASE_URL = process.env.SMOKE_URL ?? "http://localhost:4173/";
// The bundled browser and the npm package can disagree on version in CI
// sandboxes; an explicit path avoids a download attempt.
const EXECUTABLE_PATH = process.env.CHROMIUM_PATH;

const failures = [];
function check(label, actual, expected) {
  const ok = actual === expected;
  console.log(`${ok ? "ok  " : "FAIL"} ${label}: ${JSON.stringify(actual)}`);
  if (!ok) failures.push(`${label} — expected ${JSON.stringify(expected)}`);
}

const browser = await chromium.launch(
  EXECUTABLE_PATH ? { executablePath: EXECUTABLE_PATH } : {},
);
const context = await browser.newContext(devices["iPhone 13"]);
const page = await context.newPage();

const consoleErrors = [];
page.on("pageerror", (error) => consoleErrors.push(String(error.message)));
page.on("console", (message) => {
  if (message.type() === "error") consoleErrors.push(message.text());
});

await page.goto(BASE_URL, { waitUntil: "networkidle" });

await page.waitForSelector(".picker__tiles .tile");
check("two accounts offered", await page.locator(".tile").count(), 2);

await page.locator(".tile").first().click();
await page.waitForSelector(".home");
check("opened account 1", await page.locator(".home__who").textContent(), "Tài khoản 1");

await page.locator(".btn").click();
await page.waitForFunction(() =>
  document.querySelector(".panel__stat")?.textContent?.includes("1"),
);
check("streak counted", (await page.locator(".panel__stat").first().textContent())?.trim(), "🔥 1");
check("week counted", await page.locator(".panel__stat").nth(1).textContent(), "1/5");

await page.reload({ waitUntil: "networkidle" });
await page.waitForSelector(".home");
check(
  "account remembered on reload",
  await page.locator(".home__who").textContent(),
  "Tài khoản 1",
);

await page.locator(".linkish").click();
await page.waitForSelector(".picker__tiles");
const streaks = await page.locator(".tile__streak").allTextContents();
check("account 1 streak on tile", streaks[0], "🔥 1 ngày");
// The isolation rule from curriculum §13.1, visible in the UI.
check("account 2 untouched", streaks[1], "Bắt đầu hôm nay");

await browser.close();

if (consoleErrors.length > 0) {
  failures.push(`console errors: ${consoleErrors.join(" | ")}`);
}

if (failures.length > 0) {
  console.error(`\n${failures.length} failure(s):`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log("\nsmoke passed");
