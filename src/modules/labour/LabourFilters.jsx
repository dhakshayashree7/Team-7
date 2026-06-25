export default function LabourFilters({ filterDate, setFilterDate, filterRole, setFilterRole, onClear }) {
  const inputStyle = {
    padding: "8px 14px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "13px",
    color: "#374151",
    outline: "none",
    backgroundColor: "#fff",
    cursor: "pointer",
  };

  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "16px 20px", display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
      <span style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>🔽 Filter by:</span>

      <input
        type="date"
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
        style={inputStyle}
      />

      <select
        value={filterRole}
        onChange={(e) => setFilterRole(e.target.value)}
        style={inputStyle}
      >
        <option value="">All Roles</option>
        <option>Mason</option>
        <option>Carpenter</option>
        <option>Electrician</option>
        <option>Plumber</option>
        <option>Painter</option>
        <option>Helper</option>
        <option>Supervisor</option>
        <option>Other</option>
      </select>

      {(filterDate || filterRole) && (
        <button
          onClick={onClear}
          style={{ padding: "8px 16px", backgroundColor: "#fff1f2", color: "#be123c", border: "none", borderRadius: "8px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}
        >
          ✕ Clear Filters
        </button>
      )}
    </div>
  );
}