"use client";
import { useState } from "react";

export default function NewsCard({ article, onToggleSave, isSaved }) {
  const [hovered, setHovered] = useState(false);

  const cardStyle = {
    background: hovered ? "rgba(168,85,247,0.08)" : "rgba(255,255,255,0.03)",
    border: hovered ? "1px solid rgba(168,85,247,0.3)" : "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px",
    overflow: "hidden",
    transition: "all 0.3s ease",
    transform: hovered ? "translateY(-4px)" : "translateY(0)",
    display: "flex",
    flexDirection: "column",
  };

  const readMoreStyle = {
    flex: 1,
    padding: "10px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #a855f7, #06b6d4)",
    color: "white",
    textDecoration: "none",
    fontSize: "12px",
    fontWeight: "600",
    textAlign: "center",
    display: "block",
  };

  const saveStyle = {
    padding: "10px 14px",
    borderRadius: "10px",
    background: isSaved ? "rgba(168,85,247,0.2)" : "rgba(255,255,255,0.05)",
    border: isSaved ? "1px solid rgba(168,85,247,0.4)" : "1px solid rgba(255,255,255,0.1)",
    color: isSaved ? "#a855f7" : "rgba(255,255,255,0.4)",
    cursor: "pointer",
    fontSize: "16px",
  };

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={cardStyle}>

      {article.urlToImage && (
        <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
          <img
            src={article.urlToImage}
            alt={article.title}
            onError={(e) => e.target.style.display = "none"}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s ease", transform: hovered ? "scale(1.05)" : "scale(1)" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(3,7,18,0.8), transparent)" }}></div>
        </div>
      )}

      <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <span style={{ padding: "4px 10px", borderRadius: "999px", fontSize: "11px", background: "rgba(168,85,247,0.15)", color: "#a855f7", fontWeight: "600" }}>
            {article.source?.name || "Unknown"}
          </span>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px" }}>
            {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : ""}
          </span>
        </div>

        <h3 style={{ color: "white", fontWeight: "700", fontSize: "15px", lineHeight: "1.5", marginBottom: "10px", flex: 1 }}>
          {article.title?.slice(0, 80)}{article.title?.length > 80 ? "..." : ""}
        </h3>

        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", lineHeight: "1.6", marginBottom: "16px" }}>
          {article.description?.slice(0, 100)}{article.description?.length > 100 ? "..." : ""}
        </p>

        <div style={{ display: "flex", gap: "8px" }}>
          <a href={article.url} target="_blank" rel="noopener noreferrer" style={readMoreStyle}>Read More</a>
          <button onClick={() => onToggleSave(article)} style={saveStyle}>
            {isSaved ? "🔖" : "🏷️"}
          </button>
        </div>
      </div>
    </div>
  );
}