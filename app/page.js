"use client";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import NewsCard from "./components/NewsCard";
import SavedArticles from "./components/SavedArticles";

const categories = ["General", "Technology", "Business", "Sports", "Entertainment", "Health", "Science"];

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("General");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("savedArticles") || "[]");
    }
    return [];
  });
  const [showSaved, setShowSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNews();
  }, [category]);

  useEffect(() => {
    localStorage.setItem("savedArticles", JSON.stringify(saved));
  }, [saved]);

  async function fetchNews(searchQuery) {
    setLoading(true);
    setError("");
    try {
      const q = searchQuery || category;
      const res = await fetch(`/api/news?q=${q}`);
      const data = await res.json();
      if (data.status === "error") throw new Error(data.message);
      setArticles(data.articles.filter((a) => a.urlToImage));
    } catch (err) {
      setError("Failed to fetch news. Please try again!");
    }
    setLoading(false);
  }

  function handleSearch(q) {
    setQuery(q);
    fetchNews(q);
  }

  function toggleSave(article) {
    setSaved((prev) => {
      const exists = prev.find((a) => a.url === article.url);
      if (exists) return prev.filter((a) => a.url !== article.url);
      return [article, ...prev];
    });
  }

  function isSaved(article) {
    return saved.some((a) => a.url === article.url);
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#030712", color: "white" }}>
      <Navbar showSaved={showSaved} setShowSaved={setShowSaved} savedCount={saved.length} />

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "100px 24px 48px" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{ color: "#a855f7", letterSpacing: "3px", fontSize: "12px", textTransform: "uppercase", marginBottom: "8px" }}>
            STAY INFORMED
          </p>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: "800", marginBottom: "16px" }}>
            News{" "}
            <span style={{ background: "linear-gradient(135deg, #a855f7, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Aggregator
            </span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "16px" }}>
            Search and read latest news from around the world
          </p>
        </div>

        <SearchBar onSearch={handleSearch} />

        {/* Category filters */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center", marginBottom: "40px" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setQuery(""); }}
              style={{
                padding: "8px 20px",
                borderRadius: "999px",
                border: category === cat ? "1px solid #a855f7" : "1px solid rgba(255,255,255,0.1)",
                background: category === cat ? "rgba(168,85,247,0.2)" : "rgba(255,255,255,0.03)",
                color: category === cat ? "#a855f7" : "rgba(255,255,255,0.5)",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "500",
                transition: "all 0.2s ease",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {showSaved ? (
          <SavedArticles saved={saved} onToggleSave={toggleSave} />
        ) : (
          <>
            {error && (
              <div style={{ textAlign: "center", padding: "40px", color: "#f43f5e" }}>
                <p style={{ fontSize: "40px", marginBottom: "12px" }}>⚠️</p>
                <p>{error}</p>
              </div>
            )}

            {loading ? (
              <div style={{ textAlign: "center", padding: "80px" }}>
                <div style={{ width: "48px", height: "48px", border: "3px solid rgba(168,85,247,0.3)", borderTop: "3px solid #a855f7", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }}></div>
                <p style={{ color: "rgba(255,255,255,0.4)" }}>Fetching latest news...</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
                {articles.map((article, i) => (
                  <NewsCard key={i} article={article} onToggleSave={toggleSave} isSaved={isSaved(article)} />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}