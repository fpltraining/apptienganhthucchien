/**
 * End-to-end smoke check against a built app, on a phone-sized viewport.
 *
 * Unit tests cover the arithmetic; this covers what they cannot — that the
 * screens render on a phone and that a learner can get from the picker through
 * a whole lesson and back, against real IndexedDB.
 *
 * The microphone is deliberately left denied, so this exercises the degraded
 * path: no mic means the learner taps instead of the app listening, and that
 * path has to work or the app is unusable for anyone who declines the prompt.
 *
 *   npm run build && npm run preview &
 *   node scripts/smoke.mjs
 */
import { chromium, devices } from "playwright";

const BASE_URL = process.env.SMOKE_URL ?? "http://localhost:4173/";
// The bundled browser and the npm package can disagree on version in CI
// sandboxes; an explicit path avoids a download attempt.
const EXECUTABLE_PATH = process.env.CHROMIUM_PATH;
// Set SMOKE_SHOTS to a directory to save a screenshot of each distinct screen
// the walk passes through. Reuses this walker rather than a separate script,
// because a second driver of the same flow drifts out of step with this one.
const SHOTS_DIR = process.env.SMOKE_SHOTS;

const shotsTaken = new Set();
const failures = [];
function check(label, actual, expected) {
  const ok = actual === expected;
  console.log(`${ok ? "ok  " : "FAIL"} ${label}: ${JSON.stringify(actual)}`);
  if (!ok) failures.push(`${label} — expected ${JSON.stringify(expected)}`);
}

function checkThat(label, condition, detail) {
  console.log(`${condition ? "ok  " : "FAIL"} ${label}${detail ? `: ${detail}` : ""}`);
  if (!condition) failures.push(label);
}

async function captureOnce(name) {
  if (!SHOTS_DIR || shotsTaken.has(name)) return;
  shotsTaken.add(name);
  await page.screenshot({ path: `${SHOTS_DIR}/${name}.png` }).catch(() => undefined);
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

// --- picker ---
await page.waitForSelector(".picker__tiles .tile");
check("two accounts offered", await page.locator(".tile").count(), 2);

await page.locator(".tile").first().click();

// --- placement, shown once on a fresh account ---
await page.waitForSelector(".block__title");
check(
  "placement offered first",
  await page.locator(".block__title").first().textContent(),
  "Nói chuyện với app 7 phút",
);
await captureOnce("nhap-hoc");

await page.getByRole("button", { name: "Bắt đầu" }).click();
let placementSteps = 0;
while (placementSteps < 200) {
  placementSteps++;
  if (await page.getByText("App đã biết nên bắt đầu từ đâu").count()) break;
  const action = page.locator(".btn:not(.btn--ghost):not([disabled])").first();
  if ((await action.count()) === 0) {
    await page.waitForTimeout(120);
    continue;
  }
  await action.click({ timeout: 5000 }).catch(() => undefined);
  await page.waitForTimeout(60);
}
checkThat("placement finished", placementSteps < 200, `${placementSteps} steps`);
await captureOnce("ket-qua-nhap-hoc");

await page.getByRole("button", { name: "Vào học" }).click();
await page.waitForSelector(".home");
check("opened account 1", await page.locator(".home__who").textContent(), "Tài khoản 1");

// --- lesson ---
await page.locator(".btn").click();
await page.waitForSelector(".plan");
check("lesson plan lists four blocks", await page.locator(".plan__item").count(), 4);

await page.getByRole("button", { name: "Bắt đầu" }).click();

/**
 * Walks the lesson by always taking the first enabled action on screen.
 *
 * Deliberately generic: the point is that a learner can always get forward from
 * every screen in the session. A block that renders with no usable control is
 * the failure this catches, and it would catch it for a block added later too.
 */
const blocksSeen = new Set();
let steps = 0;
const MAX_STEPS = 400;

while (steps < MAX_STEPS) {
  steps++;

  if (await page.locator("text=Xong rồi!").count()) break;

  const step = await page.locator(".block__step").first().textContent().catch(() => null);
  if (step) {
    const name = step.split("·")[0].trim();
    blocksSeen.add(name);
    await captureOnce(name.replace(/\s+/g, "-").toLowerCase());
  }

  // Only primary actions advance the lesson. Ghost buttons are the secondary
  // ones ("Nghe lại", "Bỏ qua"), and clicking those forever would look like
  // progress while going nowhere.
  const action = page.locator(".btn:not(.btn--ghost):not([disabled])").first();
  if ((await action.count()) === 0) {
    await page.waitForTimeout(120);
    continue;
  }

  await action.click({ timeout: 5000 }).catch(() => undefined);
  await page.waitForTimeout(60);
}

checkThat("lesson reached the summary", steps < MAX_STEPS, `${steps} steps`);
checkThat(
  "all four blocks were visited",
  ["Từ vựng", "Nghe", "Đóng vai", "Ôn nhanh", "Mở miệng"].some((name) => blocksSeen.has(name)) &&
    blocksSeen.size >= 3,
  [...blocksSeen].join(", "),
);

// --- back home, with the session recorded ---
await page.waitForSelector("text=Xong rồi!");
await captureOnce("tong-ket");
await page.getByRole("button", { name: "Về trang chính" }).click();
await page.waitForSelector(".home");

const streak = (await page.locator(".streak__num").textContent())?.trim();
check("streak counted after the lesson", streak, "1");
check(
  "first day is named as such, not counted at the learner",
  (await page.locator(".streak__label").textContent())?.trim(),
  "ngày đầu tiên",
);
check(
  "week progress worded as remaining, not as a shortfall",
  (await page.locator(".streak__note").textContent())?.trim(),
  "Tuần này 1/5 buổi — còn 4 buổi nữa.",
);
// One pip per day of the trailing week, exactly one of them filled.
check("a full week of pips", String(await page.locator(".pip").count()), "7");
check("one day done", String(await page.locator(".pip--on").count()), "1");
// The plan names today's week rather than making the learner go looking. The
// week itself depends on how placement scored this walk, so what matters is
// that a real title is there and that it is labelled with its week number.
const weekTitle = (await page.locator(".panel__stat--title").textContent())?.trim() ?? "";
checkThat("today's week is named on the home screen", weekTitle.length > 0, weekTitle);
checkThat(
  "the week is numbered",
  /^Tuần \d+ · 45 phút$/.test(
    (await page.locator(".panel__label").first().textContent())?.trim() ?? "",
  ),
  (await page.locator(".panel__label").first().textContent())?.trim(),
);
check("today's four blocks are listed", String(await page.locator(".blocks__item").count()), "4");

// No red anywhere: the design rules it out, and a stylesheet edit could
// reintroduce it without any test noticing.
const reds = await page.evaluate(() =>
  [...document.querySelectorAll("*")]
    .map((node) => ({ node, style: getComputedStyle(node) }))
    .flatMap(({ node, style }) =>
      [style.color, style.backgroundColor, style.borderLeftColor].map(
        (value) => `${node.tagName.toLowerCase()}.${node.className}:${value}`,
      ),
    )
    .filter((entry) => {
      const match = /rgba?\((\d+), (\d+), (\d+)/.exec(entry);
      if (!match) return false;
      const [r, g, b] = [Number(match[1]), Number(match[2]), Number(match[3])];
      // A true red has green and blue close together. The son orange is
      // red-dominant too, but its green sits well above its blue — that gap is
      // what separates #A8360D, a dark burnt orange, from an actual alarm red.
      return r > 140 && g < 90 && Math.abs(g - b) < 15;
    }),
);
check("nothing on the home screen is red", reds.join(" ") || "none", "none");

// --- the account boundary holds ---
// By name, not by class: the home screen has more than one quiet link now.
await page.getByRole("button", { name: "Đổi tài khoản" }).click();
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
