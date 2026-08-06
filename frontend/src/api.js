export async function fetchJobs(keyword, selectedSites) {
  // Validate inputs
  if (!keyword || !selectedSites || selectedSites.length === 0) {
    console.error("❌ Missing keyword or sites");
    return [];
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000); // 45 second timeout

    const res = await fetch("http://localhost:5000/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        keyword: keyword.trim(),
        sites: selectedSites,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("❌ Error fetching jobs:", err.message);

    if (err.name === "AbortError") {
      console.error("⏰ Request timeout");
      return [];
    }

    return [];
  }
}
