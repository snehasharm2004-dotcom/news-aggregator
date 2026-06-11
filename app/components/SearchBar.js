"use client";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", gap: "12px", marginBottom: "32px", maxWidth: "600px", margin: "0 auto 32px" }}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search news... e.g. AI, Cricket, India"
        style={{
          flex: 1,
          padding: "14px 20px",
          borderRadius: "999px",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "white",
          fontSize: "14px",
          outline: "none",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "14px 28px",
          borderRadius: "999px",
          background: "linear-gradient(135deg, #a855f7, #06b6d4)",
          border: "none",
          color: "white",
          fontSize: "14px",
          fontWeight: "700",
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        Search
      </button>
    </form>
  );
}