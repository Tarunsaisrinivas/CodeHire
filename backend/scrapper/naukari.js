const launchBrowser = require("../utils/browser");
const { createPage, logPageState } = require("../utils/pageSetup");

const CARD_SELECTOR =
  ".srp-jobtuple-wrapper, .cust-job-tuple, .jobTuple, [data-job-id]";

async function scrapeNaukriJobs(keyword, sharedBrowser) {
  const ownsBrowser = !sharedBrowser;
  let browser = sharedBrowser;
  let page;

  try {
    browser = browser || (await launchBrowser());
    page = await createPage(browser);

    const slug = keyword.trim().toLowerCase().replace(/\s+/g, "-");
    const url = `https://www.naukri.com/${encodeURIComponent(slug)}-jobs`;

    console.log("🔍 Navigating to Naukri:", url);

    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });

    try {
      await page.waitForSelector(CARD_SELECTOR, { timeout: 15000 });
    } catch {
      console.log("❌ Naukri: no job cards appeared.");
      await logPageState(page, "Naukri");
      return [];
    }

    const jobs = await page.evaluate((cardSelector) => {
      const pick = (root, selectors) => {
        for (const s of selectors) {
          const el = root.querySelector(s);
          const text = el && el.textContent.trim();
          if (text) return text;
        }
        return null;
      };

      const cards = Array.from(document.querySelectorAll(cardSelector)).slice(0, 15);
      const results = [];

      for (const card of cards) {
        try {
          const title = pick(card, [
            "a.title", "h2 a", "h3 a", ".title", ".job-title",
          ]);
          if (!title) continue;

          const linkEl =
            card.querySelector("a.title") ||
            card.querySelector('a[href*="/job-listings"]') ||
            card.querySelector("h2 a");

          const desc = pick(card, [".job-desc", ".job-description", ".desc", ".description"]);

          results.push({
            title,
            company: pick(card, ["a.comp-name", ".comp-name", ".company", ".org"]) || "Unknown",
            location: pick(card, [".locWdth", ".loc", ".location", ".place"]) || "N/A",
            experience: pick(card, [".expwdth", ".exp", ".experience"]) || "N/A",
            salary: pick(card, [".sal-wrap span", ".sal", ".salary"]) || "Not specified",
            description: desc ? desc.substring(0, 200) + "..." : "No description available",
            link: linkEl ? linkEl.href : "#",
            source: "naukri",
          });
        } catch (e) {
          console.log("naukari error message",e)
          // skip a broken card
        }
      }
      return results;
    }, CARD_SELECTOR);

    if (jobs.length === 0) {
      console.log("❌ Naukri: cards found but nothing parsed. Selectors may have changed.");
    } else {
      console.log(`✅ Naukri jobs scraped: ${jobs.length}`);
    }

    return jobs.slice(0, 10);
  } catch (error) {
    console.log("❌ Error scraping Naukri:", error.message);
    return [];
  } finally {
    if (page) await page.close().catch(() => {});
    if (ownsBrowser && browser) await browser.close().catch(() => {});
  }
}

module.exports = scrapeNaukriJobs;