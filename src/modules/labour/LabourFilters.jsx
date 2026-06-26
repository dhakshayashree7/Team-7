import { Filter, X } from "lucide-react";

const PRIMARY = "#F97316";

export default function LabourFilters({ filterDate, setFilterDate, filterRole, setFilterRole, onClear }) {
  const inputStyle = {
    padding: "9px 14px",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    fontSize: "13px",
    color: "#374151",
    outline: "none",
    backgroundColor: "#fff",
    cursor: "pointer",
    fontFamily: "Inter, sans-serif",
  };

  return (
    <div style={{ background: "#fff", border: "1px solid #F1F5F9", borderRadius: "12px", padding: "14px 20px", display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#64748B", fontSize: "13px", fontWeight: 600 }}>
        <Filter size={14} />
        Filter by:
      </div>

      <input
        type="date"
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
        style={inputStyle}
        onFocus={e => e.target.style.borderColor = PRIMARY}
        onBlur={e => e.target.style.borderColor = "#E5E7EB"}
      />

      <select
        value={filterRole}
        onChange={(e) => setFilterRole(e.target.value)}
        style={inputStyle}
        onFocus={e => e.target.style.borderColor = PRIMARY}
        onBlur={e => e.target.style.borderColor = "#E5E7EB"}
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
          style={{ padding: "8px 14px", backgroundColor: "#FFF1F2", color: "#BE123C", border: "1px solid #FECDD3", borderRadius: "8px", fontSize: "12px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
        >
          <X size={13} /> Clear Filters
        </button>
      )}
    </div>
  );
}