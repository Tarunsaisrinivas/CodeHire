const puppeteer = require("puppeteer-core");

const isProduction = process.env.NODE_ENV === "production";

async function launchBrowser() {
  // Option A: hosted browser (Render + Vercel, best against IP blocks)
  if (process.env.BROWSERLESS_TOKEN) {
    console.log("🌐 Connecting to Browserless");
    return await puppeteer.connect({
      browserWSEndpoint: `wss://production-sfo.browserless.io?token=${process.env.BROWSERLESS_TOKEN}&stealth=true`,
    });
  }

  // Option B: Chrome inside Docker (Render)
  if (isProduction) {
    console.log("☁️ Launching Chrome in production");
    return await puppeteer.launch({
      executablePath:
        process.env.PUPPETEER_EXECUTABLE_PATH ||
        "/usr/bin/google-chrome-stable",
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    });
  }

  // Local development: full puppeteer with bundled Chrome
  console.log("🖥️ Local environment");
  const localPuppeteer = require("puppeteer");
  return await localPuppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
}

module.exports = launchBrowser;
