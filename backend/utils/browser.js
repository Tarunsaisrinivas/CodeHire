const puppeteer = require("puppeteer-core");

const isProduction = process.env.NODE_ENV === "production";

/**
 * options.residentialProxy = true -> route traffic through Browserless's
 * residential proxy pool (only applies when BROWSERLESS_TOKEN is set).
 * Uses more of your Browserless quota, so only use it for sites that block you.
 */
async function launchBrowser({ residentialProxy = false } = {}) {
  // Option A: hosted browser (Render + Vercel)
  if (process.env.BROWSERLESS_TOKEN) {
    let endpoint = `wss://production-sfo.browserless.io?token=${process.env.BROWSERLESS_TOKEN}&stealth=true`;

    if (residentialProxy) {
      const country = process.env.PROXY_COUNTRY || "in";
      endpoint += `&proxy=residential&proxyCountry=${country}`;
    }

    console.log(
      `🌐 Connecting to Browserless${residentialProxy ? " (residential proxy)" : ""}`,
    );
    return await puppeteer.connect({ browserWSEndpoint: endpoint });
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

  // Local development
  console.log("🖥️ Local environment");
  const localPuppeteer = require("puppeteer");
  return await localPuppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
}

module.exports = launchBrowser;
