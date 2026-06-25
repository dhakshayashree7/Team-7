export default function LabourTable({ entries, onEdit, onDelete }) {
  const orange = "#F97316";

  const roleColors = {
    Mason: { bg: "#eff6ff", color: "#1d4ed8" },
    Carpenter: { bg: "#fdf4ff", color: "#7c3aed" },
    Electrician: { bg: "#fff7ed", color: "#c2410c" },
    Plumber: { bg: "#f0fdf4", color: "#15803d" },
    Painter: { bg: "#fef9c3", color: "#854d0e" },
    Helper: { bg: "#f1f5f9", color: "#475569" },
    Supervisor: { bg: "#fff1f2", color: "#be123c" },
    Other: { bg: "#f8fafc", color: "#374151" },
  };

  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>

      {/* Table Header */}
      <div style={{ padding: "16px 24px", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "#111827" }}>Labour Entries</h3>
        <span style={{ fontSize: "12px", color: "#94a3b8" }}>{entries.length} records</span>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f8fafc" }}>
              {["#", "Worker Name", "Role", "Date", "Daily Wage", "Hours", "Total Cost", "Actions"].map((h) => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => {
              const roleStyle = roleColors[entry.role] || roleColors["Other"];
              return (
                <tr key={entry.id} style={{ borderTop: "1px solid #f1f5f9" }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = "#fafafa"}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  <td style={{ padding: "14px 16px", fontSize: "13px", color: "#94a3b8" }}>{index + 1}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#fff7ed", border: "1px solid #fed7aa", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0 }}>
                        👷
                      </div>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>{entry.workerName}</span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ backgroundColor: roleStyle.bg, color: roleStyle.color, padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: 600 }}>
                      {entry.role}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: "13px", color: "#374151" }}>
                    {new Date(entry.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: "13px", color: "#374151" }}>
                    ₹{Number(entry.dailyWage).toLocaleString("en-IN")}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: "13px", color: "#374151" }}>
                    {entry.hoursWorked}h
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ fontSize: "14px", fontWeight: 700, color: orange }}>
                      ₹{Number(entry.totalCost).toLocaleString("en-IN")}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => onEdit(entry)}
                        style={{ padding: "6px 14px", backgroundColor: "#eff6ff", color: "#1d4ed8", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => onDelete(entry.id)}
                        style={{ padding: "6px 14px", backgroundColor: "#fff1f2", color: "#be123c", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}