import { useState } from "react";
import { CheckCircle, XCircle, Clock, Calendar } from "lucide-react";

const PRIMARY = "#F97316";
const SECONDARY = "#1E293B";

export default function AttendanceTracker({ entries }) {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [attendance, setAttendance] = useState({});

  const workers = [...new Map(entries.map((e) => [e.workerName, e])).values()];
  const getKey = (name, date) => `${name}_${date}`;

  const markAttendance = (workerName, dailyWage, status) => {
    const key = getKey(workerName, selectedDate);
    let cost = 0;
    if (status === "Present") cost = parseFloat(dailyWage);
    if (status === "Half Day") cost = parseFloat(dailyWage) / 2;
    setAttendance((prev) => ({
      ...prev,
      [key]: { status, cost, workerName, date: selectedDate, dailyWage },
    }));
  };

  const getStatus = (workerName) =>
    attendance[getKey(workerName, selectedDate)]?.status || null;

  const todayRecords = Object.values(attendance).filter((a) => a.date === selectedDate);
  const presentCount = todayRecords.filter((a) => a.status === "Present").length;
  const absentCount = todayRecords.filter((a) => a.status === "Absent").length;
  const halfCount = todayRecords.filter((a) => a.status === "Half Day").length;
  const totalAttCost = todayRecords.reduce((s, a) => s + (a.cost || 0), 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

      {/* ── HEADER CARD ── */}
      <div style={{
        background: "#fff",
        border: "1px solid #F1F5F9",
        borderRadius: "14px",
        padding: "22px 24px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}>
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap", gap: "16px",
        }}>
          <div>
            <h3 style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: 700, color: "#111827" }}>
              Attendance Register
            </h3>
            <p style={{ margin: 0, fontSize: "13px", color: "#94A3B8" }}>
              Mark attendance for workers on selected date
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Calendar size={15} color="#64748B" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{
                padding: "9px 14px",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                fontSize: "13px",
                color: "#374151",
                outline: "none",
                fontFamily: "Inter, sans-serif",
              }}
              onFocus={e => e.target.style.borderColor = PRIMARY}
              onBlur={e => e.target.style.borderColor = "#E5E7EB"}
            />
          </div>
        </div>

        {/* Summary Pills */}
        <div style={{ display: "flex", gap: "12px", marginTop: "18px", flexWrap: "wrap" }}>
          {[
            { label: "Present", count: presentCount, color: "#15803D", bg: "#F0FDF4", border: "#86EFAC", icon: CheckCircle },
            { label: "Absent", count: absentCount, color: "#BE123C", bg: "#FFF1F2", border: "#FECDD3", icon: XCircle },
            { label: "Half Day", count: halfCount, color: "#C2410C", bg: "#FFF7ED", border: "#FED7AA", icon: Clock },
            { label: "Total Cost", count: `₹${totalAttCost.toLocaleString("en-IN")}`, color: PRIMARY, bg: "#FFF7ED", border: "#FED7AA", icon: null },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} style={{
                backgroundColor: item.bg,
                border: `1px solid ${item.border}`,
                borderRadius: "10px",
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}>
                {Icon && <Icon size={15} color={item.color} />}
                <span style={{ fontSize: "13px", color: "#64748B", fontWeight: 500 }}>{item.label}:</span>
                <span style={{ fontSize: "14px", fontWeight: 700, color: item.color }}>{item.count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── WORKERS TABLE ── */}
      {workers.length === 0 ? (
        <div style={{
          background: "#fff",
          border: "1px solid #F1F5F9",
          borderRadius: "14px",
          padding: "64px",
          textAlign: "center",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}>
          <CheckCircle size={48} color="#CBD5E1" style={{ marginBottom: "16px" }} />
          <h3 style={{ margin: "0 0 8px", fontSize: "16px", fontWeight: 700, color: "#111827" }}>
            No Workers Found
          </h3>
          <p style={{ margin: 0, fontSize: "13px", color: "#94A3B8" }}>
            Add labour entries first to mark attendance.
          </p>
        </div>
      ) : (
        <div style={{
          background: "#fff",
          border: "1px solid #F1F5F9",
          borderRadius: "14px",
          overflow: "hidden",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          display: "flex",
          flexDirection: "column",
        }}>

          {/* Table label */}
          <div style={{
            padding: "14px 24px",
            borderBottom: "1px solid #F1F5F9",
            backgroundColor: "#FAFAFA",
            flexShrink: 0,
          }}>
            <h3 style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "#111827" }}>
              Workers — {new Date(selectedDate).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}
            </h3>
            <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#94A3B8" }}>
              {workers.length} workers available
            </p>
          </div>

          {/* Scrollable Table */}
          <div style={{
            maxHeight: "460px",
            overflowY: "auto",
            overflowX: "auto",
            position: "relative",
          }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "620px" }}>
              <thead>
                <tr>
                  {["#", "Worker", "Role", "Daily Wage", "Mark Attendance", "Cost for Day"].map((h) => (
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
              <tbody>
                {workers.map((worker, i) => {
                  const status = getStatus(worker.workerName);
                  const cost = attendance[getKey(worker.workerName, selectedDate)]?.cost || 0;
                  return (
                    <tr
                      key={worker.workerName}
                      style={{ borderTop: "1px solid #F8FAFC", transition: "background 0.1s" }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = "#FAFAFA"}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                    >
                      <td style={{ padding: "13px 16px", fontSize: "13px", color: "#94A3B8" }}>
                        {i + 1}
                      </td>
                      <td style={{ padding: "13px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{
                            width: "34px", height: "34px", borderRadius: "50%",
                            backgroundColor: SECONDARY,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#fff", fontSize: "12px", fontWeight: 700, flexShrink: 0,
                          }}>
                            {worker.workerName.charAt(0).toUpperCase()}
                          </div>
                          <span style={{ fontSize: "13px", fontWeight: 600, color: "#111827", whiteSpace: "nowrap" }}>
                            {worker.workerName}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: "13px 16px", fontSize: "13px", color: "#374151" }}>
                        {worker.role}
                      </td>
                      <td style={{ padding: "13px 16px", fontSize: "13px", color: "#374151", fontVariantNumeric: "tabular-nums" }}>
                        ₹{Number(worker.dailyWage).toLocaleString("en-IN")}
                      </td>
                      <td style={{ padding: "13px 16px" }}>
                        <div style={{ display: "flex", gap: "6px" }}>
                          {[
                            { label: "Present", activeColor: "#15803D", activeBg: "#F0FDF4", activeBorder: "#86EFAC" },
                            { label: "Half Day", activeColor: "#C2410C", activeBg: "#FFF7ED", activeBorder: "#FED7AA" },
                            { label: "Absent", activeColor: "#BE123C", activeBg: "#FFF1F2", activeBorder: "#FECDD3" },
                          ].map((s) => {
                            const isActive = status === s.label;
                            return (
                              <button
                                key={s.label}
                                onClick={() => markAttendance(worker.workerName, worker.dailyWage, s.label)}
                                style={{
                                  padding: "6px 12px",
                                  borderRadius: "6px",
                                  fontSize: "12px",
                                  fontWeight: 600,
                                  cursor: "pointer",
                                  border: `1px solid ${isActive ? s.activeBorder : "#E5E7EB"}`,
                                  backgroundColor: isActive ? s.activeBg : "#F8FAFC",
                                  color: isActive ? s.activeColor : "#94A3B8",
                                  transition: "all 0.1s",
                                  fontFamily: "Inter, sans-serif",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {s.label}
                              </button>
                            );
                          })}
                        </div>
                      </td>
                      <td style={{ padding: "13px 16px" }}>
                        <span style={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: status ? PRIMARY : "#CBD5E1",
                          fontVariantNumeric: "tabular-nums",
                        }}>
                          {status ? `₹${cost.toLocaleString("en-IN")}` : "—"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}