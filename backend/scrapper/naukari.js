const puppeteer = require("puppeteer");

async function scrapeNaukriJobs(keyword) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Set a realistic user agent
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
  );

  const url = `https://www.naukri.com/${keyword.replace(/\s+/g, "-")}-jobs`;

  console.log("🔍 Navigating to Naukri:", url);

  try {
    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    // Wait for page to load properly
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const jobs = await page.evaluate(() => {
      const jobs = [];

      // Multiple possible selectors for job containers
      const selectors = [
        ".jobTuple",
        ".srp-jobtuple-wrapper",
        "[data-job-id]",
        ".styles_job-listing-container__OCfZC .cust-job-tuple",
        ".tuple",
      ];

      let jobElements = [];

      for (const selector of selectors) {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
          jobElements = Array.from(elements);
          break;
        }
      }

      if (jobElements.length === 0) {
        // Fallback: look for any elements that might contain job info
        const allLinks = document.querySelectorAll('a[href*="/job-listings"]');
        jobElements = Array.from(allLinks).map(
          (link) => link.closest("div, article, section") || link.parentElement
        );
      }

      jobElements.slice(0, 15).forEach((element) => {
        try {
          // Title - look for common title selectors
          let title = "N/A";
          const titleSelectors = [
            "h2 a",
            "h1 a",
            "h3 a",
            ".title",
            ".job-title",
            ".title a",
            'a[title*="Developer"]',
            'a[title*="Engineer"]',
          ];

          for (const selector of titleSelectors) {
            const titleEl = element.querySelector(selector);
            if (titleEl && titleEl.textContent.trim()) {
              title = titleEl.textContent.trim();
              break;
            }
          }

          // Company - look for company name
          let company = "Unknown";
          const companySelectors = [
            ".comp-name",
            ".company",
            ".org",
            ".employer",
          ];
          for (const selector of companySelectors) {
            const companyEl = element.querySelector(selector);
            if (companyEl && companyEl.textContent.trim()) {
              company = companyEl.textContent.trim();
              break;
            }
          }

          // Location
          let location = "N/A";
          const locationSelectors = [".loc", ".location", ".locWdth", ".place"];
          for (const selector of locationSelectors) {
            const locEl = element.querySelector(selector);
            if (locEl && locEl.textContent.trim()) {
              location = locEl.textContent.trim();
              break;
            }
          }

          // Experience
          let experience = "N/A";
          const expSelectors = [".exp", ".experience", ".expwdth", ".years"];
          for (const selector of expSelectors) {
            const expEl = element.querySelector(selector);
            if (expEl && expEl.textContent.trim()) {
              experience = expEl.textContent.trim();
              break;
            }
          }

          // Salary
          let salary = "Not specified";
          const salarySelectors = [
            ".sal",
            ".salary",
            ".rupee",
            ".compensation",
          ];
          for (const selector of salarySelectors) {
            const salEl = element.querySelector(selector);
            if (salEl && salEl.textContent.trim()) {
              salary = salEl.textContent.trim();
              break;
            }
          }

          // Job Link
          let link = "#";
          const linkEl =
            element.querySelector('a[href*="/job-listings"]') ||
            element.querySelector("a.title") ||
            element.querySelector("h2 a") ||
            element.querySelector('a[href*="naukri.com/job"]');
          if (linkEl) {
            link = linkEl.href;
          }

          // Description
          let description = "No description available";
          const descSelectors = [
            ".job-desc",
            ".description",
            ".job-descri",
            ".desc",
          ];
          for (const selector of descSelectors) {
            const descEl = element.querySelector(selector);
            if (descEl && descEl.textContent.trim()) {
              description = descEl.textContent.trim().substring(0, 200) + "...";
              break;
            }
          }

          // Only add job if we have at least a title
          if (title !== "N/A") {
            jobs.push({
              title,
              company,
              location,
              experience,
              salary,
              description,
              link,
              source: "naukri",
            });
          }
        } catch (error) {
          console.log("Error parsing job element");
          console.log("Error:", error,error.message);
        }
      });

      return jobs;
    });

    await browser.close();

    if (jobs.length === 0) {
      console.log(
        "❌ No jobs found on Naukri. The site structure may have changed."
      );
    } else {
      console.log(`✅ Naukri jobs scraped: ${jobs.length}`);
    }

    return jobs.slice(0, 10);
  } catch (error) {
    console.log("❌ Error scraping Naukri:", error.message);
    await browser.close();
    return [];
  }
}

module.exports = scrapeNaukriJobs;
