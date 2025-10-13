const puppeteer = require("puppeteer");

async function scrapeNaukriJobs(keyword) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const url = `https://www.naukri.com/${encodeURIComponent(
    keyword
  )}-jobs?k=${encodeURIComponent(keyword)}`;
  await page.goto(url, { waitUntil: "networkidle2" });

  const jobs = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".jobTuple.bgWhite.br4.mb-8"))
      .slice(0, 10)
      .map((el) => ({
        title: el.querySelector(".title.ellipsis")?.innerText.trim(),
        company: el.querySelector(".subTitle.ellipsis.fleft")?.innerText.trim(),
        location: el.querySelector(".loc")?.innerText.trim(),
        link: el.querySelector("a.title")?.href,
        source: "naukri",
      }))
  );

  await browser.close();
  return jobs;
}

module.exports = scrapeNaukriJobs;