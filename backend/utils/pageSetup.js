const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
  "AppleWebKit/537.36 (KHTML, like Gecko) " +
  "Chrome/124.0.0.0 Safari/537.36";

// Creates a page with realistic settings and blocks heavy resources (faster, less RAM)
async function createPage(browser) {
  const page = await browser.newPage();

  await page.setUserAgent(USER_AGENT);
  await page.setViewport({ width: 1366, height: 768 });
  await page.setExtraHTTPHeaders({ "Accept-Language": "en-IN,en;q=0.9" });
  page.setDefaultNavigationTimeout(45000);

  await page.setRequestInterception(true);
  page.on("request", (req) => {
    if (["image", "font", "media"].includes(req.resourceType())) {
      req.abort().catch(() => {});
    } else {
      req.continue().catch(() => {});
    }
  });

  return page;
}

// Logs what the page really is, so you can tell a block page from a layout change
async function logPageState(page, label) {
  try {
    const title = await page.title();
    const html = await page.content();
    console.log(`[${label}] URL:`, page.url());
    console.log(`[${label}] Title:`, title);
    console.log(`[${label}] HTML length:`, html.length);

    const t = title.toLowerCase();
    const u = page.url().toLowerCase();
    if (
      t.includes("access denied") ||
      t.includes("just a moment") ||
      t.includes("captcha") ||
      t.includes("robot") ||
      u.includes("authwall") ||
      u.includes("login") ||
      u.includes("checkpoint")
    ) {
      console.log(
        `🚫 [${label}] Looks BLOCKED (IP/bot protection), not a code problem.`,
      );
    }
  } catch (e) {
    console.log(`[${label}] Could not read page state:`, e.message);
  }
}

module.exports = { createPage, logPageState };
