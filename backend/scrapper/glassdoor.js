const launchBrowser = require("../utils/browser");
const { createPage, logPageState } = require("../utils/pageSetup");

const CARD_SELECTOR =
  '[data-test="jobListing"], li[class*="JobsList_jobListItem"], .jobCard, [data-test="job-card"], .react-job-listing';

async function scrapeGlassdoorJobs(keyword, sharedBrowser) {
  const ownsBrowser = !sharedBrowser;
  let browser = sharedBrowser;
  let page;

  try {
    browser = browser || (await launchBrowser());
    page = await createPage(browser);

    const url = `https://www.glassdoor.co.in/Job/jobs.htm?sc.keyword=${encodeURIComponent(
      keyword,
    )}`;

    console.log("🔍 Navigating to Glassdoor:", url);

    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

    try {
      await page.waitForSelector(CARD_SELECTOR, { timeout: 15000 });
    } catch {
      console.log("❌ Glassdoor: no job cards appeared.");
      await logPageState(page, "Glassdoor"); // "Just a moment..." = Cloudflare block
      return [];
    }

    const jobs = await page.evaluate((cardSelector) => {
      const pick = (root, selectors) => {
        for (const s of selectors) {
          const el = root.querySelector(s);
          const t = el && el.textContent.trim();
          if (t) return t;
        }
        return null;
      };

      const results = [];
      const cards = Array.from(document.querySelectorAll(cardSelector)).slice(
        0,
        15,
      );

      for (const card of cards) {
        try {
          // Preferred: stable data-test attributes
          let title = pick(card, [
            '[data-test="job-title"]',
            'a[class*="JobCard_jobTitle"]',
            ".jobTitle",
          ]);
          let company = pick(card, [
            '[data-test="employer-short-name"]',
            '[class*="EmployerProfile_compactEmployerName"]',
            '[data-test="emp-name"]',
            ".employerName",
          ]);
          let location = pick(card, [
            '[data-test="emp-location"]',
            '[class*="JobCard_location"]',
            ".location",
          ]);
          const salary =
            pick(card, [
              '[data-test="detailSalary"]',
              '[class*="JobCard_salaryEstimate"]',
              ".salary-estimate",
            ]) || "Not specified";

          // Fallback: guess from text lines (your original approach)
          if (!title || !company) {
            const lines = (card.innerText || "")
              .split("\n")
              .map((l) => l.trim())
              .filter(Boolean);
            title =
              title ||
              lines.find((l) => l.length > 5 && l.length < 100) ||
              null;
            company =
              company ||
              lines.find((l) => l !== title && l.length < 50) ||
              "Unknown";
          }
          location = location || "N/A";

          const linkEl = card.querySelector(
            'a[data-test="job-link"], a[href*="/job-listing/"], a[href*="/Job/"], a[href*="partner/jobListing"]',
          );
          let link = "#";
          if (linkEl) {
            const href = linkEl.getAttribute("href");
            if (href) {
              link = href.startsWith("http")
                ? href
                : `https://www.glassdoor.co.in${href.startsWith("/") ? "" : "/"}${href}`;
            }
          }

          if (title && !title.includes("Sign In")) {
            results.push({
              title,
              company: company.replace(/\d(\.\d)?\s*★?$/, "").trim(), // strip trailing rating
              location,
              salary,
              link,
              source: "glassdoor",
            });
          }
        } catch (e) {
          console.log("glassdoor error message", e.message);
          // skip a broken card
        }
      }
      return results;
    }, CARD_SELECTOR);

    console.log(`✅ Glassdoor jobs found: ${jobs.length}`);
    return jobs;
  } catch (error) {
    console.log("❌ Error scraping Glassdoor:", error.message);
    return [];
  } finally {
    if (page) await page.close().catch(() => {});
    if (ownsBrowser && browser) await browser.close().catch(() => {});
  }
}

module.exports = scrapeGlassdoorJobs;
