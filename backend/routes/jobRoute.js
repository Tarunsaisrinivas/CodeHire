const express = require("express");

const router = express.Router();


// ============================================
// POST /jobs
// ============================================

router.post("/", async (req, res) => {
  try {
    const { keyword, sites } = req.body;

    console.log("📨 Received request:", {
      keyword,
      sites,
    });


    // ========================================
    // VALIDATION
    // ========================================

    if (
      !keyword ||
      !Array.isArray(sites) ||
      sites.length === 0
    ) {
      return res.status(400).json({
        error: "Keyword and sites are required",
        received: {
          keyword,
          sites,
        },
      });
    }


    console.log(
      `🔍 Fetching jobs for "${keyword}" from:`,
      sites
    );


    // ========================================
    // LOAD SCRAPERS ONLY WHEN NEEDED
    // ========================================

    const scrapePromises = sites.map(
      async (site) => {

        try {

          let jobs = [];


          switch (site) {

            // --------------------------------
            // LINKEDIN
            // --------------------------------

            case "linkedin": {

              const scrapeLinkedInJobs =
                require("../scrapper/linkedin");

              jobs =
                await scrapeLinkedInJobs(keyword);

              break;
            }


            // --------------------------------
            // NAUKRI
            // --------------------------------

            case "naukri": {

              const scrapeNaukriJobs =
                require("../scrapper/naukari");

              jobs =
                await scrapeNaukriJobs(keyword);

              break;
            }


            // --------------------------------
            // GLASSDOOR
            // --------------------------------

            case "glassdoor": {

              const scrapeGlassdoorJobs =
                require("../scrapper/glassdoor");

              jobs =
                await scrapeGlassdoorJobs(keyword);

              break;
            }


            // --------------------------------
            // UNKNOWN SITE
            // --------------------------------

            default:

              console.warn(
                `⚠️ Unsupported site: ${site}`
              );

              return [];

          }


          console.log(
            `✅ ${site}: ${jobs.length} jobs found`
          );


          return jobs;


        } catch (err) {

          console.error(
            `❌ Error scraping ${site}:`,
            err.message
          );


          return [];

        }

      }
    );


    // ========================================
    // WAIT FOR SCRAPERS
    // ========================================

    const results =
      await Promise.allSettled(
        scrapePromises
      );


    // ========================================
    // COMBINE RESULTS
    // ========================================

    const combined = results

      .filter(
        (result) =>
          result.status === "fulfilled"
      )

      .flatMap(
        (result) => result.value
      )

      .filter(
        (job) =>
          job &&
          job.title &&
          job.title !== "N/A" &&
          job.title !== "Untitled Job"
      )

      .map((job, index) => ({

        ...job,

        id:
          `${job.source || "unknown"}-${Date.now()}-${index}`,

        title:
          job.title || "Untitled Job",

        company:
          job.company || "Unknown",

        location:
          job.location || "N/A",

        link:
          job.link || "#",

        source:
          job.source || "unknown",

      }));


    console.log(
      `✅ Total valid jobs fetched: ${combined.length}`
    );


    // ========================================
    // RESPONSE
    // ========================================

    return res.status(200).json(combined);


  } catch (err) {

    console.error(
      "🔥 Fatal error in jobs route:",
      err
    );


    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });

  }

});


module.exports = router;