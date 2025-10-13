export async function fetchJobs(keyword, selectedSites) {
  try {
    const res = await fetch("http://localhost:1419/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword, sites: selectedSites }),
    });

    if (!res.ok) throw new Error("Failed to fetch jobs");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("❌ Error fetching jobs:", err);
    return [];
  }
}
