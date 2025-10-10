import puppeteer from "puppeteer";

export async function scrapeLinkedInJobs(keyword) {
  // * Launching a Browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  // * Launching a Browser end

  //  * Setting a User-Agent
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
      "AppleWebKit/537.36 (KHTML, like Gecko) " +
      "Chrome/115 Safari/537.36"
  );
  //  * Setting a User-Agent end
  //   ! Notes for the above user-agent
  //   ? Websites sometimes block automated browsers.

  // ? Setting a user-agent makes Puppeteer look like a normal Chrome browser instead of a bot.

  //  ? This helps LinkedIn return normal content rather than a CAPTCHA or blank page.

  //   * Navigating to LinkedIn Jobs Page
  const searchUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(
    keyword
  )}`;
  await page.goto(searchUrl, { waitUntil: "networkidle2" });
  //  * Navigating to LinkedIn Jobs Page end

  //   * Wait for Job Results to Appear
  await page.waitForSelector("ul.jobs-search__results-list li");
  //   * Wait for Job Results to Appear end

  //   * Extracting Job Data
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
  //   * Extracting Job Data end
  await browser.close();
  return jobs;
}
