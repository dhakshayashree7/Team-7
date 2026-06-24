import { useState } from "react";

export default function LabourDashboard({ siteId = "SITE-001", siteName = "Site Alpha" }) {
  const [entries] = useState([]);
  const [activeNav, setActiveNav] = useState("labour");

  const totalCost = entries.reduce((sum, e) => sum + (e.totalCost || 0), 0);
  const totalHours = entries.reduce((sum, e) => sum + (Number(e.hoursWorked) || 0), 0);

  const orange = "#F97316";
  const black = "#1a1a1a";

  const navItems = [
    { icon: "🏠", label: "Dashboard", key: "dashboard" },
    { icon: "👷", label: "Labour Cost Tracking", key: "labour" },
    { icon: "🧾", label: "Expense Entry", key: "expense" },
    { icon: "📊", label: "Budget vs Actual", key: "report" },
    { icon: "📅", label: "Scheduling", key: "scheduling" },
    { icon: "🔔", label: "Notifications", key: "notifications" },
    { icon: "⚙️", label: "Settings", key: "settings" },
    { icon: "📋", label: "Activity Logs", key: "logs" },
    { icon: "❓", label: "Help & Support", key: "help" },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Inter', sans-serif", backgroundColor: "#f8fafc" }}>

      {/* ── SIDEBAR ── */}
      <div style={{ width: "235px", backgroundColor: black, display: "flex", flexDirection: "column", flexShrink: 0 }}>

        {/* Logo + App Name */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src="/logo.jpeg"
            alt="BuildTrack"
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #F97316",
              flexShrink: 0,
            }}
          />
          <div>
            <div style={{ fontSize: "16px", fontWeight: 800, lineHeight: 1.2 }}>
              <span style={{ color: "#fff" }}>Build</span>
              <span style={{ color: "#F97316" }}>Track</span>
            </div>
            <div style={{ fontSize: "10px", color: "#6b7280", letterSpacing: "1px", textTransform: "uppercase", marginTop: "2px" }}>
              Expense Tracker
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <div style={{ flex: 1, padding: "12px 10px", display: "flex", flexDirection: "column", gap: "2px" }}>
          {navItems.map((item) => {
            const active = activeNav === item.key;
            return (
              <div
                key={item.key}
                onClick={() => setActiveNav(item.key)}
                style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "11px 14px", borderRadius: "8px",
                  backgroundColor: active ? orange : "transparent",
                  color: active ? "#fff" : "#9ca3af",
                  fontSize: "13px", fontWeight: active ? 600 : 400,
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: "15px" }}>{item.icon}</span>
                {item.label}
              </div>
            );
          })}
        </div>

        {/* Logout */}
        <div style={{ padding: "10px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "11px 14px", borderRadius: "8px", color: "#ef4444", fontSize: "13px", cursor: "pointer" }}>
            <span>🚪</span> Logout
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Top Bar */}
        <div style={{ backgroundColor: "#fff", borderBottom: "1px solid #e2e8f0", height: "62px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", flexShrink: 0 }}>
          <span style={{ fontSize: "20px", color: "#64748b", cursor: "pointer" }}>☰</span>

          {/* Search */}
          <div style={{ flex: 1, maxWidth: "380px", margin: "0 24px", position: "relative" }}>
            <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}>🔍</span>
            <input
              placeholder="Search anything..."
              style={{ width: "100%", padding: "9px 12px 9px 36px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", color: "#374151", outline: "none", backgroundColor: "#f8fafc", boxSizing: "border-box" }}
            />
          </div>

          {/* Right */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ position: "relative", cursor: "pointer" }}>
              <span style={{ fontSize: "22px" }}>🔔</span>
              <span style={{ position: "absolute", top: "-5px", right: "-7px", background: orange, color: "#fff", borderRadius: "50%", fontSize: "9px", width: "17px", height: "17px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>5</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", borderLeft: "1px solid #e2e8f0", paddingLeft: "20px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#f1f5f9", border: "2px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>👤</div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>Site Engineer</div>
                <div style={{ fontSize: "11px", color: "#94a3b8" }}>Super Admin</div>
              </div>
              <span style={{ color: "#94a3b8", fontSize: "11px" }}>▾</span>
            </div>
          </div>
        </div>

        {/* Page Body */}
        <div style={{ flex: 1, padding: "28px 32px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* Page Header */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <h1 style={{ margin: 0, fontSize: "22px", fontWeight: 700, color: "#111827" }}>Labour Cost Tracking 👷</h1>
              <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#64748b" }}>Manage workers, attendance and labour costs · {siteName}</p>
            </div>
            <button style={{ backgroundColor: orange, color: "#fff", border: "none", padding: "11px 22px", borderRadius: "8px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
              + Add Entry
            </button>
          </div>

          {/* Summary Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {[
              { label: "Total Labour Cost", value: `₹${totalCost.toLocaleString("en-IN")}`, sub: "This site", icon: "💰", bg: "#fff7ed", accent: true },
              { label: "Workers Logged", value: entries.length, sub: "Total entries", icon: "👷", bg: "#f0fdf4", accent: false },
              { label: "Total Hours Worked", value: `${totalHours}h`, sub: "All entries", icon: "⏱️", bg: "#eff6ff", accent: false },
            ].map((card) => (
              <div key={card.label} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px 24px", display: "flex", alignItems: "center", gap: "18px" }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "12px", backgroundColor: card.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", flexShrink: 0 }}>
                  {card.icon}
                </div>
                <div>
                  <p style={{ margin: "0 0 2px", fontSize: "13px", color: "#64748b" }}>{card.label}</p>
                  <p style={{ margin: "0 0 4px", fontSize: "24px", fontWeight: 700, color: card.accent ? orange : "#111827" }}>{card.value}</p>
                  <p style={{ margin: 0, fontSize: "11px", color: "#94a3b8" }}>{card.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "320px" }}>
            <div style={{ fontSize: "52px", marginBottom: "16px" }}>👷</div>
            <p style={{ margin: "0 0 6px", fontSize: "16px", fontWeight: 700, color: "#111827" }}>No labour entries yet</p>
            <p style={{ margin: "0 0 24px", fontSize: "13px", color: "#94a3b8" }}>Add your first entry to start tracking costs for this site.</p>
            <button style={{ backgroundColor: orange, color: "#fff", border: "none", padding: "11px 24px", borderRadius: "8px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
              + Add First Entry
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}