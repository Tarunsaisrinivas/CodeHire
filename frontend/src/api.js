export async function fetchJobs(keyword, sites) {
  const resp = await fetch("http://localhost:1419/jobs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ keyword, sites }),
  });

  if (!resp.ok) throw new Error("Failed to fetch jobs");
  return resp.json();
}
