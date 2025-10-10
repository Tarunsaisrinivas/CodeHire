import puppeteer from "puppeteer";

export async function scrapeLinkedInJobs(keyword) {
  
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
      "AppleWebKit/537.36 (KHTML, like Gecko) " +
      "Chrome/115 Safari/537.36"
  );

  const searchUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(
    keyword
  )}`;
  await page.goto(searchUrl, { waitUntil: "networkidle2" });

  await page.waitForSelector("ul.jobs-search__results-list li");

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

        return { title, company, location, link };
      });
  });

  await browser.close();
  return jobs;
}
