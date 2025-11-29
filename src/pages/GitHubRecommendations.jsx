import React, { useState } from "react";
import "./GitHubRecommendations.css";

function GitHubRecommendations() {
  const [query, setQuery] = useState("");      
  const [results, setResults] = useState([]);  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc`
      );

      const data = await response.json();

      setResults(data.items || []);
    } catch (err) {
      setError("Error fetching data");
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="github-page">

      <h1 className="title">GitHub Project Recommendations</h1>

      {/* Search Box */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter project field (e.g., AI, Web, IoT...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Result Area */}
      <div className="results-area">
        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}

        <div className="cards-grid">
          {results.map((repo) => (
            <div key={repo.id} className="repo-card">
              
              <h3>{repo.name}</h3>

              <p>
                {repo.description
                  ? repo.description.length > 120
                    ? repo.description.substring(0, 120) + "...etc"
                    : repo.description
                  : "No description available"}
              </p>

              <span className="stars">⭐ {repo.stargazers_count}</span>

              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="view-btn"
              >
                View on GitHub
              </a>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GitHubRecommendations;
