import { useState } from "react";
import { Search, Pencil, Trash2, Copy } from "lucide-react";

const PRIMARY = "#F97316";
const SECONDARY = "#1E293B";

const roleColors = {
  Mason: { bg: "#EFF6FF", color: "#1D4ED8" },
  Carpenter: { bg: "#FDF4FF", color: "#7C3AED" },
  Electrician: { bg: "#FFF7ED", color: "#C2410C" },
  Plumber: { bg: "#F0FDF4", color: "#15803D" },
  Painter: { bg: "#FEF9C3", color: "#854D0E" },
  Helper: { bg: "#F1F5F9", color: "#475569" },
  Supervisor: { bg: "#FFF1F2", color: "#BE123C" },
  Other: { bg: "#F8FAFC", color: "#374151" },
};

export default function LabourTable({ entries, onEdit, onDelete, onDuplicate }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const PER_PAGE = 10;

  const filtered = entries.filter((e) =>
    e.workerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const toggleSelect = (id) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  const toggleAll = () =>
    setSelectedIds(
      selectedIds.length === paginated.length ? [] : paginated.map((e) => e.id)
    );

  const handleBulkDelete = () => {
    if (window.confirm(`Delete ${selectedIds.length} selected entries?`)) {
      selectedIds.forEach((id) => onDelete(id));
      setSelectedIds([]);
    }
  };

  return (
    <div style={{
      background: "#fff",
      borderRadius: "14px",
      border: "1px solid #F1F5F9",
      boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}>

      {/* ── TOOLBAR ── */}
      <div style={{
        padding: "16px 24px",
        borderBottom: "1px solid #F1F5F9",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        flexWrap: "wrap",
        backgroundColor: "#FAFAFA",
        flexShrink: 0,
      }}>
        <div>
          <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "#111827" }}>
            Labour Entries
          </h3>
          <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#94A3B8" }}>
            {filtered.length} records found
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <div style={{ position: "relative" }}>
            <Search size={14} style={{
              position: "absolute", left: "10px", top: "50%",
              transform: "translateY(-50%)", color: "#94A3B8",
            }} />
            <input
              placeholder="Search worker..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              style={{
                padding: "8px 12px 8px 32px",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                fontSize: "13px",
                outline: "none",
                width: "200px",
                color: "#374151",
                backgroundColor: "#fff",
                fontFamily: "Inter, sans-serif",
              }}
              onFocus={e => e.target.style.borderColor = PRIMARY}
              onBlur={e => e.target.style.borderColor = "#E5E7EB"}
            />
          </div>

          {selectedIds.length > 0 && (
            <button
              onClick={handleBulkDelete}
              style={{
                padding: "8px 14px",
                backgroundColor: "#FFF1F2",
                color: "#BE123C",
                border: "1px solid #FECDD3",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <Trash2 size={13} /> Delete ({selectedIds.length})
            </button>
          )}
        </div>
      </div>

      {/* ── SCROLLABLE TABLE ── */}
      <div style={{
        height: "460px",
        overflowY: "auto",
        overflowX: "auto",
        position: "relative",
      }}>
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          minWidth: "750px",
        }}>

          {/* Sticky Header */}
          <thead>
            <tr>
              <th style={{
                padding: "12px 16px",
                textAlign: "center",
                width: "44px",
                backgroundColor: "#F8FAFC",
                position: "sticky",
                top: 0,
                zIndex: 10,
                borderBottom: "2px solid #E5E7EB",
              }}>
                <input
                  type="checkbox"
                  checked={selectedIds.length === paginated.length && paginated.length > 0}
                  onChange={toggleAll}
                  style={{ cursor: "pointer" }}
                />
              </th>
              {["#", "Worker", "Role", "Date", "Daily Wage", "Hours", "Total Cost", "Actions"].map((h) => (
                <th key={h} style={{
                  padding: "12px 16px",
                  textAlign: "left",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#64748B",
                  textTransform: "uppercase",
                  letterSpacing: "0.6px",
                  whiteSpace: "nowrap",
                  backgroundColor: "#F8FAFC",
                  position: "sticky",
                  top: 0,
                  zIndex: 10,
                  borderBottom: "2px solid #E5E7EB",
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan="9" style={{
                  padding: "48px",
                  textAlign: "center",
                  color: "#94A3B8",
                  fontSize: "14px",
                }}>
                  {searchTerm
                    ? `No workers found matching "${searchTerm}"`
                    : "No entries to display."}
                </td>
              </tr>
            ) : paginated.map((entry, index) => {
              const roleStyle = roleColors[entry.role] || roleColors["Other"];
              const isSelected = selectedIds.includes(entry.id);
              return (
                <tr
                  key={entry.id}
                  style={{
                    borderTop: "1px solid #F8FAFC",
                    backgroundColor: isSelected ? "#FFF7ED" : "transparent",
                    transition: "background-color 0.1s",
                  }}
                  onMouseEnter={e => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = "#FAFAFA";
                  }}
                  onMouseLeave={e => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <td style={{ padding: "13px 16px", textAlign: "center" }}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelect(entry.id)}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                  <td style={{ padding: "13px 16px", fontSize: "13px", color: "#94A3B8", fontWeight: 500 }}>
                    {(currentPage - 1) * PER_PAGE + index + 1}
                  </td>
                  <td style={{ padding: "13px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{
                        width: "34px", height: "34px", borderRadius: "50%",
                        backgroundColor: SECONDARY,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff", fontSize: "12px", fontWeight: 700, flexShrink: 0,
                      }}>
                        {entry.workerName.charAt(0).toUpperCase()}
                      </div>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "#111827", whiteSpace: "nowrap" }}>
                        {entry.workerName}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "13px 16px" }}>
                    <span style={{
                      backgroundColor: roleStyle.bg,
                      color: roleStyle.color,
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}>
                      {entry.role}
                    </span>
                  </td>
                  <td style={{ padding: "13px 16px", fontSize: "13px", color: "#374151", whiteSpace: "nowrap" }}>
                    {new Date(entry.date).toLocaleDateString("en-IN", {
                      day: "2-digit", month: "short", year: "numeric",
                    })}
                  </td>
                  <td style={{ padding: "13px 16px", fontSize: "13px", color: "#374151", fontVariantNumeric: "tabular-nums" }}>
                    ₹{Number(entry.dailyWage).toLocaleString("en-IN")}
                  </td>
                  <td style={{ padding: "13px 16px", fontSize: "13px", color: "#374151" }}>
                    {entry.hoursWorked}h
                  </td>
                  <td style={{ padding: "13px 16px" }}>
                    <span style={{
                      fontSize: "14px", fontWeight: 700,
                      color: PRIMARY, fontVariantNumeric: "tabular-nums",
                    }}>
                      ₹{Number(entry.totalCost).toLocaleString("en-IN")}
                    </span>
                  </td>
                  <td style={{ padding: "13px 16px" }}>
                    <div style={{ display: "flex", gap: "6px" }}>
                      {[
                        { icon: Pencil, bg: "#EFF6FF", hover: "#DBEAFE", color: "#1D4ED8", action: () => onEdit(entry), title: "Edit" },
                        { icon: Copy, bg: "#F0FDF4", hover: "#DCFCE7", color: "#15803D", action: () => onDuplicate(entry), title: "Duplicate" },
                        { icon: Trash2, bg: "#FFF1F2", hover: "#FFE4E6", color: "#BE123C", action: () => onDelete(entry.id), title: "Delete" },
                      ].map((btn) => {
                        const Icon = btn.icon;
                        return (
                          <button
                            key={btn.title}
                            onClick={btn.action}
                            title={btn.title}
                            style={{
                              width: "32px", height: "32px",
                              backgroundColor: btn.bg,
                              color: btn.color,
                              border: "none",
                              borderRadius: "8px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "background 0.15s",
                              flexShrink: 0,
                            }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = btn.hover}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = btn.bg}
                          >
                            <Icon size={13} />
                          </button>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── PAGINATION ── */}
      {totalPages > 1 && (
        <div style={{
          padding: "14px 24px",
          borderTop: "1px solid #F1F5F9",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#FAFAFA",
          flexShrink: 0,
        }}>
          <span style={{ fontSize: "12px", color: "#64748B" }}>
            Showing {(currentPage - 1) * PER_PAGE + 1}–{Math.min(currentPage * PER_PAGE, filtered.length)} of {filtered.length}
          </span>
          <div style={{ display: "flex", gap: "4px" }}>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{
                padding: "6px 12px", border: "1px solid #E5E7EB",
                borderRadius: "6px", fontSize: "12px",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                backgroundColor: "#fff",
                color: currentPage === 1 ? "#CBD5E1" : "#374151",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  padding: "6px 12px",
                  border: "1px solid",
                  borderColor: currentPage === page ? PRIMARY : "#E5E7EB",
                  borderRadius: "6px", fontSize: "12px", cursor: "pointer",
                  backgroundColor: currentPage === page ? PRIMARY : "#fff",
                  color: currentPage === page ? "#fff" : "#374151",
                  fontWeight: currentPage === page ? 700 : 400,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              style={{
                padding: "6px 12px", border: "1px solid #E5E7EB",
                borderRadius: "6px", fontSize: "12px",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                backgroundColor: "#fff",
                color: currentPage === totalPages ? "#CBD5E1" : "#374151",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}