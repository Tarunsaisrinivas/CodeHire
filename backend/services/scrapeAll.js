const launchBrowser = require("../utils/browser");
const scrapeNaukriJobs = require("../scrapper/naukari");
const scrapeLinkedInJobs = require("../scrapper/linkedin");
const scrapeGlassdoorJobs = require("../scrapper/glassdoor");

const CACHE_TTL_MS = 30 * 60 * 1000;
const cache = new Map();

// Naukri + Glassdoor use the residential proxy (LinkedIn works without it).
// Turn off with USE_RESIDENTIAL_PROXY=false
const USE_PROXY = process.env.USE_RESIDENTIAL_PROXY !== "false";

async function safeClose(browser) {
  if (browser) await browser.close().catch(() => {});
}

async function scrapeAll(keyword) {
  const key = keyword.trim().toLowerCase();

  const hit = cache.get(key);
  if (hit && Date.now() - hit.time < CACHE_TTL_MS) {
    console.log("⚡ Serving cached results for:", key);
    return hit.jobs;
  }

  let plainBrowser;
  let proxyBrowser;

  try {
    // LinkedIn: normal browser (already working)
    plainBrowser = await launchBrowser();
    const linkedin = await scrapeLinkedInJobs(keyword, plainBrowser);

    // Naukri + Glassdoor: separate browser through the residential proxy
    proxyBrowser = await launchBrowser({ residentialProxy: USE_PROXY });
    const naukri = await scrapeNaukriJobs(keyword, proxyBrowser);
    const glassdoor = await scrapeGlassdoorJobs(keyword, proxyBrowser);

    const jobs = [...naukri, ...linkedin, ...glassdoor];

    if (jobs.length > 0) cache.set(key, { time: Date.now(), jobs });
    return jobs;
  } finally {
    await safeClose(plainBrowser);
    await safeClose(proxyBrowser);
  }
}

module.exports = scrapeAll;
