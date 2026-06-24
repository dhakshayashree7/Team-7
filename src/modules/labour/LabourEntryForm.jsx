import { useState } from "react";

export default function LabourEntryForm({ onSave, onCancel, editData = null }) {
  const orange = "#F97316";

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!form.workerName || !form.role || !form.dailyWage || !form.hoursWorked || !form.date) {
      alert("Please fill all fields.");
      return;
    }
    onSave({
      ...form,
      totalCost: parseFloat(totalCost),
      id: editData?.id || Date.now(),
    });
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "13px",
    color: "#111827",
    outline: "none",
    boxSizing: "border-box",
    backgroundColor: "#f8fafc",
  };

  const labelStyle = {
    display: "block",
    fontSize: "12px",
    fontWeight: 600,
    color: "#374151",
    marginBottom: "6px",
  };

  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ backgroundColor: "#fff", borderRadius: "16px", width: "100%", maxWidth: "520px", padding: "28px", boxShadow: "0 20px 60px rgba(0,0,0,0.15)", margin: "0 16px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#111827" }}>
              {editData ? "✏️ Edit Entry" : "➕ Add Labour Entry"}
            </h2>
            <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#94a3b8" }}>Fill in the worker details below</p>
          </div>
          <button onClick={onCancel} style={{ background: "#f1f5f9", border: "none", borderRadius: "8px", width: "34px", height: "34px", fontSize: "16px", cursor: "pointer", color: "#64748b" }}>✕</button>
        </div>

        {/* Form Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>

          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Worker Name</label>
            <input name="workerName" value={form.workerName} onChange={handleChange} placeholder="e.g. Ravi Kumar" style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Role</label>
            <select name="role" value={form.role} onChange={handleChange} style={inputStyle}>
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
            <input type="date" name="date" value={form.date} onChange={handleChange} style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Daily Wage (₹)</label>
            <input type="number" name="dailyWage" value={form.dailyWage} onChange={handleChange} placeholder="e.g. 800" style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Hours Worked</label>
            <input type="number" name="hoursWorked" value={form.hoursWorked} onChange={handleChange} placeholder="e.g. 8" style={inputStyle} />
          </div>

        </div>

        {/* Auto Total Cost */}
        <div style={{ marginTop: "20px", backgroundColor: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "10px", padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ margin: 0, fontSize: "12px", color: "#92400e", fontWeight: 600 }}>AUTO-CALCULATED TOTAL COST</p>
            <p style={{ margin: "2px 0 0", fontSize: "11px", color: "#b45309" }}>(Daily Wage ÷ 8) × Hours Worked</p>
          </div>
          <p style={{ margin: 0, fontSize: "26px", fontWeight: 800, color: orange }}>₹{totalCost}</p>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
          <button onClick={onCancel} style={{ flex: 1, padding: "11px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer", backgroundColor: "#fff", color: "#374151" }}>
            Cancel
          </button>
          <button onClick={handleSave} style={{ flex: 2, padding: "11px", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 700, cursor: "pointer", backgroundColor: orange, color: "#fff" }}>
            {editData ? "Update Entry" : "Save Entry"}
          </button>
        </div>

      </div>
    </div>
  );
}