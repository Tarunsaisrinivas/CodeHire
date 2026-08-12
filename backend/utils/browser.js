const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

async function launchBrowser() {
  const executablePath = await chromium.executablePath();

  console.log("🚀 Chromium executable:", executablePath);

  return await puppeteer.launch({
    args: [...chromium.args, "--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: chromium.defaultViewport,
    executablePath,
    headless: true,
  });
}

module.exports = launchBrowser;
