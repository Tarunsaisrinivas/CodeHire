const express = require("express");
const scrapeLinkedInJobs = require("../scrapper/linkedin");
const scrapeNaukriJobs = require("../scrapper/naukari");

const router = express.Router();

router.post("/", async (req, res) => {
  const { keyword, sites } = req.body;

  if (!keyword || !Array.isArray(sites) || sites.length === 0) {
    return res.status(400).json({ error: "Keyword and sites are required" });
  }

  try {
    console.log(`🔍 Fetching jobs for "${keyword}" from:`, sites);

    const results = await Promise.allSettled(
      sites.map(async (site) => {
        try {
          switch (site) {
            case "linkedin":
              return await scrapeLinkedInJobs(keyword);
            case "naukri":
              return await scrapeNaukriJobs(keyword);
            default:
              console.warn(`⚠️ Unsupported site: ${site}`);
              return [];
          }
        } catch (err) {
          console.error(`❌ Error scraping ${site}:`, err.message);
          return [];
        }
      })
    );

    const combined = results
      .filter((r) => r.status === "fulfilled")
      .flatMap((r) => r.value)
      .map((job) => ({
        ...job,
        title: job.title || "Untitled Job",
        company: job.company || "Unknown",
        location: job.location || "N/A",
        link: job.link || "#",
        source: job.source || "unknown",
      }));

    console.log(`✅ Total jobs fetched: ${combined.length}`);
    if (combined.length === 0)
      return res.status(404).json({ message: "No jobs found" });

    res.status(200).json(combined);
  } catch (err) {
    console.error("🔥 Fatal error fetching jobs:", err);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

module.exports = router;
