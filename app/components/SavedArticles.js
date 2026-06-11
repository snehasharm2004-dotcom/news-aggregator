import NewsCard from "./NewsCard";

export default function SavedArticles({ saved, onToggleSave }) {
  if (saved.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "80px 24px" }}>
        <p style={{ fontSize: "48px", marginBottom: "16px" }}>🔖</p>
        <h3 style={{ color: "white", fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>No saved articles</h3>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>Click the bookmark icon on any article to save it!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ color: "white", fontSize: "24px", fontWeight: "800", marginBottom: "24px" }}>
        🔖 Saved Articles
        <span style={{ marginLeft: "12px", padding: "4px 12px", borderRadius: "999px", fontSize: "14px", background: "rgba(168,85,247,0.2)", color: "#a855f7" }}>
          {saved.length}
        </span>
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
        {saved.map((article, i) => (
          <NewsCard key={i} article={article} onToggleSave={onToggleSave} isSaved={true} />
        ))}
      </div>
    </div>
  );
}