const launchBrowser = require("../utils/browser");
const scrapeNaukriJobs = require("../scrapers/naukri");
const scrapeLinkedInJobs = require("../scrapers/linkedin");
const scrapeGlassdoorJobs = require("../scrapers/glassdoor");

// Simple in-memory cache so repeat searches don't re-scrape (30 min)
const CACHE_TTL_MS = 30 * 60 * 1000;
const cache = new Map();

// Set PARALLEL_SCRAPE=true only if your server has 2GB+ RAM or you use Browserless
const PARALLEL = process.env.PARALLEL_SCRAPE === "true";

async function scrapeAll(keyword) {
  const key = keyword.trim().toLowerCase();

  const hit = cache.get(key);
  if (hit && Date.now() - hit.time < CACHE_TTL_MS) {
    console.log("⚡ Serving cached results for:", key);
    return hit.jobs;
  }

  const browser = await launchBrowser();

  try {
    let results;

    if (PARALLEL) {
      const settled = await Promise.allSettled([
        scrapeNaukriJobs(keyword, browser),
        scrapeLinkedInJobs(keyword, browser),
        scrapeGlassdoorJobs(keyword, browser),
      ]);
      results = settled.map((r) => (r.status === "fulfilled" ? r.value : []));
    } else {
      results = [
        await scrapeNaukriJobs(keyword, browser),
        await scrapeLinkedInJobs(keyword, browser),
        await scrapeGlassdoorJobs(keyword, browser),
      ];
    }

    const jobs = results.flat();

    // Don't cache empty results (likely a block), so the next try can succeed
    if (jobs.length > 0) cache.set(key, { time: Date.now(), jobs });

    return jobs;
  } finally {
    await browser.close().catch(() => {});
  }
}

module.exports = scrapeAll;
