import { useState } from "react";
import { fetchJobs } from "../api";
import JobList from "./JobList";

function JobSearch() {
    const [keyword, setKeyword] = useState("");
    const [selectedSites, setSelectedSites] = useState(["linkedin"]);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    const toggleSite = (site) => {
        setSelectedSites((prev) =>
            prev.includes(site)
                ? prev.filter((s) => s !== site)
                : [...prev, site]
        );
    };

    const handleSearch = async () => {
        if (!keyword.trim() || selectedSites.length === 0) return;

        setLoading(true);
        setJobs([]);

        try {
            const data = await fetchJobs(keyword, selectedSites);
            setJobs(data);
        } catch (err) {
            console.error(err);
            alert("Failed to fetch jobs");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Trigger search on Enter key
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const platforms = [
        {
            name: "linkedin",
            logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
        },
        {
            name: "naukri",
            logo: "https://play-lh.googleusercontent.com/76gEFhQto5xMHr2Qf8nWLvm1s0O60clhkwHvxQDSeI3hthf7Zs05JJQeyg5H347DGQ",
        },
        {
            name: "glassdoor",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Glassdoor_logo.svg/1280px-Glassdoor_logo.svg.png",
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* 🌟 Hero Section */}
            <div className="bg-indigo-500 text-white py-16 md:py-20 px-4 md:px-6 flex flex-col items-center text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-snug">
                    Discover Your Dream <br className="hidden sm:block" /> Developer Job
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-10 max-w-2xl">
                    Explore thousands of opportunities from top <br className="hidden sm:block" /> companies worldwide
                </p>

                {/* 🔍 Search Bar */}
                <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-lg flex flex-col sm:flex-row items-center gap-3 p-3 sm:p-4 w-full max-w-2xl">
                    <input
                        type="text"
                        placeholder="Enter job title (e.g. React Developer)"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={handleKeyDown} // ✅ triggers on Enter
                        className="flex-1 w-full border focus:bg-white focus:text-black text-white border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <button
                        onClick={handleSearch}
                        disabled={loading}
                        className="w-full sm:w-auto bg-black hover:bg-gray-800 cursor-pointer text-white font-semibold px-6 py-3 rounded-lg transition"
                    >
                        {loading ? "Searching..." : "Search"}
                    </button>
                </div>

                {/* 🧩 Platform Logos */}
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-8 sm:mt-10">
                    {platforms.map((site) => {
                        const isSelected = selectedSites.includes(site.name);
                        return (
                            <div
                                key={site.name}
                                onClick={() => toggleSite(site.name)}
                                className={`cursor-pointer flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-3 rounded-xl border transition-all duration-200
                  ${isSelected
                                        ? "bg-white border-blue-600 shadow-md scale-105"
                                        : "bg-white/70 border-transparent hover:scale-105"
                                    }`}
                            >
                                <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                                    <img
                                        src={site.logo}
                                        alt={site.name}
                                        className="w-7 h-7 sm:w-8 sm:h-8 object-contain rounded-md"
                                    />
                                    {isSelected && (
                                        <div className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center">
                                            ✓
                                        </div>
                                    )}
                                </div>
                                <span
                                    className={`text-sm sm:text-base capitalize font-medium ${isSelected ? "text-blue-700" : "text-gray-800"
                                        }`}
                                >
                                    {site.name}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 📋 Job List Section */}
            <div className="flex-grow max-w-6xl mx-auto p-4 sm:p-6 w-full">
                <JobList jobs={jobs} loading={loading} />
            </div>
        </div>
    );
}

export default JobSearch;
