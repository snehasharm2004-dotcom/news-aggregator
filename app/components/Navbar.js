export default function Navbar({ showSaved, setShowSaved, savedCount }) {
  return (
    <nav style={{
      position: "fixed",
      top: 0,
      width: "100%",
      zIndex: 50,
      backdropFilter: "blur(20px)",
      background: "rgba(3,7,18,0.8)",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>

        <div style={{ fontSize: "20px", fontWeight: "800", background: "linear-gradient(135deg, #a855f7, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          📰 NewsFlow
        </div>

        <button
          onClick={() => setShowSaved(!showSaved)}
          style={{
            padding: "8px 20px",
            borderRadius: "999px",
            border: showSaved ? "1px solid #a855f7" : "1px solid rgba(255,255,255,0.1)",
            background: showSaved ? "rgba(168,85,247,0.2)" : "rgba(255,255,255,0.05)",
            color: showSaved ? "#a855f7" : "white",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          🔖 Saved
          {savedCount > 0 && (
            <span style={{ background: "#a855f7", color: "white", borderRadius: "999px", padding: "2px 8px", fontSize: "11px" }}>
              {savedCount}
            </span>
          )}
        </button>

      </div>
    </nav>
  );
}
