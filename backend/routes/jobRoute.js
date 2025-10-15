const express = require("express");
const scrapeLinkedInJobs = require("../scrapper/linkedin");
const scrapeNaukriJobs = require("../scrapper/naukari");
const scrapeGlassdoorJobs = require("../scrapper/glassdoor");

const router = express.Router();

router.post("/", async (req, res) => {
  const { keyword, sites } = req.body;

  console.log("📨 Received request:", { keyword, sites });

  if (!keyword || !Array.isArray(sites) || sites.length === 0) {
    return res.status(400).json({
      error: "Keyword and sites are required",
      received: { keyword, sites },
    });
  }

  try {
    console.log(`🔍 Fetching jobs for "${keyword}" from:`, sites);

    const scrapePromises = sites.map(async (site) => {
      try {
        let jobs = [];
        switch (site) {
          case "linkedin":
            jobs = await scrapeLinkedInJobs(keyword);
            break;
          case "naukri":
            jobs = await scrapeNaukriJobs(keyword);
            break;
          case "glassdoor":
            jobs = await scrapeGlassdoorJobs(keyword);
            break;
          default:
            console.warn(`⚠️ Unsupported site: ${site}`);
            return [];
        }
        console.log(`✅ ${site}: ${jobs.length} jobs found`);
        return jobs;
      } catch (err) {
        console.error(`❌ Error scraping ${site}:`, err.message);
        return [];
      }
    });

    const results = await Promise.allSettled(scrapePromises);

    const combined = results
      .filter((r) => r.status === "fulfilled")
      .flatMap((r) => r.value)
      .filter(
        (job) =>
          job &&
          job.title &&
          job.title !== "N/A" &&
          job.title !== "Untitled Job"
      )
      .map((job, index) => ({
        ...job,
        id: `${job.source}-${Date.now()}-${index}`,
        title: job.title || "Untitled Job",
        company: job.company || "Unknown",
        location: job.location || "N/A",
        link: job.link || "#",
        source: job.source || "unknown",
      }));

    console.log(`✅ Total valid jobs fetched: ${combined.length}`);

    if (combined.length === 0) {
      return res.status(200).json([]); // Return empty array instead of 404
    }

    res.status(200).json(combined);
  } catch (err) {
    console.error("🔥 Fatal error in jobs route:", err);
    res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
});



module.exports = router;
