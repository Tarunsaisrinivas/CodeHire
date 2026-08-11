export async function fetchJobs(keyword, selectedSites) {

  if (
    !keyword ||
    !selectedSites ||
    selectedSites.length === 0
  ) {
    console.error("❌ Missing keyword or sites");
    return [];
  }

  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 45000);


  try {

    const response = await fetch(
      "http://localhost:5000/jobs",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },

        body: JSON.stringify({
          keyword: keyword.trim(),
          sites: selectedSites,
        }),

        signal: controller.signal,
      }
    );


    if (!response.ok) {

      const errorData =
        await response
          .json()
          .catch(() => ({}));

      throw new Error(
        errorData.message ||
        `HTTP error: ${response.status}`
      );
    }


    const data = await response.json();

    return Array.isArray(data)
      ? data
      : [];


  } catch (error) {

    console.error(
      "❌ Error fetching jobs:",
      error.message
    );


    if (error.name === "AbortError") {

      console.error(
        "⏰ Job request timed out"
      );

    }


    return [];


  } finally {

    clearTimeout(timeoutId);

  }
}