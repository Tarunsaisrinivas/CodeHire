const launchBrowser = require("../utils/browser");
const { createPage, logPageState } = require("../utils/pageSetup");

const LIST_SELECTOR = "ul.jobs-search__results-list li";

async function scrapeLinkedInJobs(keyword, sharedBrowser) {
  const ownsBrowser = !sharedBrowser;
  let browser = sharedBrowser;
  let page;

  try {
    browser = browser || (await launchBrowser());
    page = await createPage(browser);

    const searchUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(
      keyword,
    )}&location=India`;

    console.log("🔍 Navigating to LinkedIn:", searchUrl);

    await page.goto(searchUrl, {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });

    try {
      await page.waitForSelector(LIST_SELECTOR, { timeout: 15000 });
    } catch {
      console.log("❌ LinkedIn: job list did not appear.");
      await logPageState(page, "LinkedIn"); // "authwall"/"login" in URL = blocked
      return [];
    }

    const jobs = await page.evaluate((listSelector) => {
      const text = (el, sel) => {
        const node = el.querySelector(sel);
        const t = node && node.textContent.trim();
        return t || null;
      };

      return Array.from(document.querySelectorAll(listSelector))
        .slice(0, 15)
        .map((el) => {
          const img = el.querySelector(".artdeco-entity-image");
          return {
            title: text(el, ".base-search-card__title"),
            company: text(el, ".base-search-card__subtitle") || "Unknown",
            location: text(el, ".job-search-card__location") || "N/A",
            link: el.querySelector("a.base-card__full-link")?.href || "#",
            logo:
              (img &&
                (img.getAttribute("data-delayed-url") ||
                  img.getAttribute("src"))) ||
              null,
            salary: "Not specified",
            source: "linkedin",
          };
        })
        .filter((job) => job.title);
    }, LIST_SELECTOR);

    console.log(`✅ Scraped ${jobs.length} LinkedIn jobs`);
    return jobs;
  } catch (error) {
    console.log("❌ Error scraping LinkedIn:", error.message);
    return [];
  } finally {
    if (page) await page.close().catch(() => {});
    if (ownsBrowser && browser) await browser.close().catch(() => {});
  }
}

module.exports = scrapeLinkedInJobs;
