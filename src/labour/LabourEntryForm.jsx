import { useState } from "react";
import { X } from "lucide-react";

const PRIMARY = "#F97316";
const SECONDARY = "#1E293B";

export default function LabourEntryForm({ onSave, onCancel, editData = null }) {
  const emptyForm = {
    workerName: "",
    role: "",
    dailyWage: "",
    hoursWorked: "",
    date: new Date().toISOString().split("T")[0],
  };

  const [form, setForm] = useState(editData || emptyForm);

  const totalCost = (() => {
    const wage = parseFloat(form.dailyWage) || 0;
    const hours = parseFloat(form.hoursWorked) || 0;
    return ((wage / 8) * hours).toFixed(2);
  })();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    if (!form.workerName || !form.role || !form.dailyWage || !form.hoursWorked || !form.date) {
      alert("Please fill all fields.");
      return;
    }
    onSave({ ...form, totalCost: parseFloat(totalCost), id: editData?.id || Date.now() });
  };

  const inputStyle = {
    width: "100%",
    padding: "11px 14px",
    border: "1px solid #E5E7EB",
    borderRadius: "10px",
    fontSize: "13px",
    color: "#111827",
    outline: "none",
    boxSizing: "border-box",
    backgroundColor: "#F8FAFC",
    fontFamily: "Inter, sans-serif",
    transition: "border-color 0.15s",
  };

  const labelStyle = {
    display: "block",
    fontSize: "12px",
    fontWeight: 600,
    color: "#374151",
    marginBottom: "6px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  };

  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15,23,42,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(4px)" }}>
      <div style={{ backgroundColor: "#fff", borderRadius: "16px", width: "100%", maxWidth: "540px", boxShadow: "0 24px 64px rgba(0,0,0,0.2)", margin: "0 16px", overflow: "hidden" }}>

        {/* Header */}
        <div style={{ padding: "24px 28px", borderBottom: "1px solid #F1F5F9", display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#FAFAFA" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "17px", fontWeight: 700, color: "#111827" }}>
              {editData ? "Edit Labour Entry" : "Add Labour Entry"}
            </h2>
            <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#94A3B8" }}>Fill in the worker details below</p>
          </div>
          <button
            onClick={onCancel}
            style={{ background: "#F1F5F9", border: "none", borderRadius: "8px", width: "34px", height: "34px", cursor: "pointer", color: "#64748B", display: "flex", alignItems: "center", justifyContent: "center" }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#E2E8F0"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "#F1F5F9"}
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Worker Name</label>
              <input name="workerName" value={form.workerName} onChange={handleChange} placeholder="e.g. Ravi Kumar" style={inputStyle}
                onFocus={e => e.target.style.borderColor = PRIMARY}
                onBlur={e => e.target.style.borderColor = "#E5E7EB"}
              />
            </div>

            <div>
              <label style={labelStyle}>Role</label>
              <select name="role" value={form.role} onChange={handleChange} style={inputStyle}
                onFocus={e => e.target.style.borderColor = PRIMARY}
                onBlur={e => e.target.style.borderColor = "#E5E7EB"}
              >
                <option value="">Select role</option>
                <option>Mason</option>
                <option>Carpenter</option>
                <option>Electrician</option>
                <option>Plumber</option>
                <option>Painter</option>
                <option>Helper</option>
                <option>Supervisor</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Date</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} style={inputStyle}
                onFocus={e => e.target.style.borderColor = PRIMARY}
                onBlur={e => e.target.style.borderColor = "#E5E7EB"}
              />
            </div>

            <div>
              <label style={labelStyle}>Daily Wage (₹)</label>
              <input type="number" name="dailyWage" value={form.dailyWage} onChange={handleChange} placeholder="e.g. 800" style={inputStyle}
                onFocus={e => e.target.style.borderColor = PRIMARY}
                onBlur={e => e.target.style.borderColor = "#E5E7EB"}
              />
            </div>

            <div>
              <label style={labelStyle}>Hours Worked</label>
              <input type="number" name="hoursWorked" value={form.hoursWorked} onChange={handleChange} placeholder="e.g. 8" style={inputStyle}
                onFocus={e => e.target.style.borderColor = PRIMARY}
                onBlur={e => e.target.style.borderColor = "#E5E7EB"}
              />
            </div>

          </div>

          {/* Total Cost */}
          <div style={{ backgroundColor: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: "12px", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p style={{ margin: 0, fontSize: "11px", color: "#92400E", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>Auto-Calculated Total Cost</p>
              <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#B45309" }}>Formula: (Daily Wage ÷ 8) × Hours Worked</p>
            </div>
            <p style={{ margin: 0, fontSize: "28px", fontWeight: 800, color: PRIMARY, fontVariantNumeric: "tabular-nums" }}>₹{totalCost}</p>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "12px", paddingTop: "4px" }}>
            <button
              onClick={onCancel}
              style={{ flex: 1, padding: "12px", border: "1px solid #E5E7EB", borderRadius: "10px", fontSize: "13px", fontWeight: 600, cursor: "pointer", backgroundColor: "#fff", color: "#374151", fontFamily: "Inter, sans-serif" }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#F8FAFC"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "#fff"}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              style={{ flex: 2, padding: "12px", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: 700, cursor: "pointer", backgroundColor: PRIMARY, color: "#fff", fontFamily: "Inter, sans-serif", boxShadow: "0 4px 14px rgba(249,115,22,0.35)" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              {editData ? "Update Entry" : "Save Entry"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}