// Alternative Glassdoor scraper - more aggressive
const puppeteer = require("puppeteer");

async function scrapeGlassdoorJobs(keyword) {
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: "new", // Set to true to see what's happening
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );
    await page.setViewport({ width: 1280, height: 800 });

    const url = `https://www.glassdoor.co.in/Job/jobs.htm?sc.keyword=${encodeURIComponent(
      keyword
    )}`;
    console.log("🔍 Navigating to Glassdoor:", url);

    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90000 });
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Try to get all job information using a different approach
    const jobs = await page.evaluate(() => {
      const jobs = [];

      // Get all job cards using multiple possible selectors
      const jobCards = document.querySelectorAll(
        '.jobCard, [data-test="job-card"], .react-job-listing, [class*="job-listing"]'
      );

      jobCards.forEach((card, index) => {
        if (index >= 15) return; // Limit to 15 jobs

        try {
          // Get all text content and split by newlines
          const textContent = card.innerText || card.textContent || "";
          const lines = textContent
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line.length > 0);

          // The first substantial line is usually the title
          let title =
            lines.find((line) => line.length > 10 && line.length < 100) ||
            "N/A";
          let company =
            lines.find(
              (line) => line.includes("Company") || line.length < 50
            ) || "Unknown";
          let location =
            lines.find(
              (line) =>
                line.includes("Location") || /[A-Z][a-z]+, [A-Z]{2}/.test(line)
            ) || "N/A";

          // ✅ FIXED LINK HANDLING
          let link = "#";
          const linkEl = card.querySelector(
            'a[href*="/Job/"], a[href*="partner/jobListing"]'
          );

          if (linkEl) {
            const href = linkEl.getAttribute("href");
            if (href.startsWith("http")) {
              link = href;
            } else if (href.startsWith("/")) {
              link = `https://www.glassdoor.co.in${href}`;
            } else {
              link = `https://www.glassdoor.co.in/${href}`;
            }
          }

          if (title !== "N/A" && !title.includes("Sign In")) {
            jobs.push({
              title,
              company: company.replace("Company", "").trim(),
              location: location.replace("Location", "").trim(),
              salary: "Not specified",
              link,
              source: "glassdoor",
            });
          }
        } catch (error) {
          console.log("Error processing job card:", error);
        }
      });

      return jobs;
    });

    console.log(`✅ Glassdoor jobs found: ${jobs.length}`);
    return jobs;
  } catch (error) {
    console.log("❌ Error scraping Glassdoor:", error.message);
    return [];
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

module.exports = scrapeGlassdoorJobs;
