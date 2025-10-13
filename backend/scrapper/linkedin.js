const puppeteer = require("puppeteer");

async function scrapeLinkedInJobs(keyword) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // * Set User-Agent to avoid bot detection
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
      "AppleWebKit/537.36 (KHTML, like Gecko) " +
      "Chrome/115 Safari/537.36"
  );

  // * Navigate to LinkedIn job search page
  const searchUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(
    keyword
  )}`;
  console.log("🔍 Navigating to:", searchUrl);

  await page.goto(searchUrl, { waitUntil: "networkidle2", timeout: 60000 });

  // * Wait for job results
  await page.waitForSelector("ul.jobs-search__results-list li", {
    timeout: 15000,
  });

  // * Extract job data including company logos
  const jobs = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll("ul.jobs-search__results-list li")
    )
      .slice(0, 15)
      .map((el) => {
        const title = el
          .querySelector(".base-search-card__title")
          ?.innerText.trim();
        const company = el
          .querySelector(".base-search-card__subtitle")
          ?.innerText.trim();
        const location = el
          .querySelector(".job-search-card__location")
          ?.innerText.trim();
        const link = el.querySelector("a.base-card__full-link")?.href;
        const logo =
          el
            .querySelector(".artdeco-entity-image")
            ?.getAttribute("data-delayed-url") ||
          el.querySelector(".artdeco-entity-image")?.getAttribute("src") ||
          null;

        return {
          title,
          company,
          location,
          link,
          logo,
          source: "linkedin",
        };
      });
  });

  await browser.close();

  console.log(`✅ Scraped ${jobs.length} LinkedIn jobs`);
  return jobs;
}

module.exports = scrapeLinkedInJobs;
