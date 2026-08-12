const puppeteerCore = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

const isProduction = process.env.NODE_ENV === "production";

async function launchBrowser() {
  // Local development
  if (!isProduction) {
    const puppeteer = require("puppeteer");

    console.log("🖥️ Local environment detected");
    console.log("🚀 Using Puppeteer's bundled Chrome");

    return await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  }

  // Render / production
  const executablePath = await chromium.executablePath();

  console.log("☁️ Production environment detected");
  console.log("🚀 Chromium executable:", executablePath);

  return await puppeteerCore.launch({
    args: [...chromium.args, "--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: chromium.defaultViewport,
    executablePath,
    headless: true,
  });
}

module.exports = launchBrowser;
