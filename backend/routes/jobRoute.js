const express = require("express");
const scrapeLinkedInJobs = require("../scrapper/linkedin");
const router = express.Router();

router.post("/", async (req, res) => {
  const { keyword, sites } = req.body;
  // * validation for the keyword and sites
  if (!keyword || !Array.isArray(sites)) {
    return res.status(400).json({ error: "Keyword and sites are required" });
  }
  // * validation for the keyword and sites end

  try {
    //   * Scraping Jobs from Multiple Sites
    const results = await Promise.all(
      sites.map(async (site) => {
        switch (site) {
          case "linkedin":
            return scrapeLinkedInJobs(keyword);
          //   case "naukri":
          //     return scrapeNaukriJobs(keyword);
          //   case "glassdoor":
          //     return scrapeGlassdoorJobs(keyword);
          default:
            return [];
        }
      })
      //   * Scraping Jobs from Multiple Sites end
    );

    // * Combining the results
    const combined = results.flat().map((job, i) => ({
      ...job,
      source: job.source || sites[i % sites.length],
    }));

    res.json(combined);
    // * Combining the results end
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

module.exports = router;
