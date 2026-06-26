import { Download, Printer } from "lucide-react";

const PRIMARY = "#F97316";

export default function ExportTools({ entries }) {

  const handlePrint = () => {
    const printContent = `
      <html>
      <head>
        <title>Labour Cost Report — BuildTrack</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: Inter, sans-serif; padding: 40px; color: #111827; background: #fff; }
          .header { margin-bottom: 32px; padding-bottom: 20px; border-bottom: 2px solid #F97316; }
          .header h1 { font-size: 24px; font-weight: 800; color: #1E293B; }
          .header h1 span { color: #F97316; }
          .header p { font-size: 13px; color: #64748B; margin-top: 4px; }
          .summary { display: flex; gap: 20px; margin-bottom: 28px; }
          .stat { background: #F8FAFC; border-radius: 8px; padding: 14px 20px; flex: 1; }
          .stat-label { font-size: 11px; color: #64748B; text-transform: uppercase; letter-spacing: 0.5px; }
          .stat-val { font-size: 20px; font-weight: 700; color: #111827; margin-top: 4px; }
          .stat-val.orange { color: #F97316; }
          table { width: 100%; border-collapse: collapse; font-size: 13px; }
          th { background: #1E293B; color: #fff; padding: 11px 14px; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
          td { padding: 11px 14px; border-bottom: 1px solid #F1F5F9; }
          tr:nth-child(even) td { background: #F8FAFC; }
          .total-row td { font-weight: 700; background: #FFF7ED; color: #111827; }
          .orange { color: #F97316; font-weight: 700; }
          .footer { margin-top: 32px; font-size: 11px; color: #94A3B8; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Build<span>Track</span> — Labour Cost Report</h1>
          <p>Generated on ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })} &nbsp;|&nbsp; Total Records: ${entries.length}</p>
        </div>
        <div class="summary">
          <div class="stat"><div class="stat-label">Total Labour Cost</div><div class="stat-val orange">₹${entries.reduce((s, e) => s + e.totalCost, 0).toLocaleString("en-IN")}</div></div>
          <div class="stat"><div class="stat-label">Workers Logged</div><div class="stat-val">${entries.length}</div></div>
          <div class="stat"><div class="stat-label">Total Hours</div><div class="stat-val">${entries.reduce((s, e) => s + Number(e.hoursWorked), 0)}h</div></div>
        </div>
        <table>
          <thead>
            <tr><th>#</th><th>Worker Name</th><th>Role</th><th>Date</th><th>Daily Wage</th><th>Hours</th><th>Total Cost</th></tr>
          </thead>
          <tbody>
            ${entries.map((e, i) => `
              <tr>
                <td>${i + 1}</td>
                <td>${e.workerName}</td>
                <td>${e.role}</td>
                <td>${new Date(e.date).toLocaleDateString("en-IN")}</td>
                <td>₹${Number(e.dailyWage).toLocaleString("en-IN")}</td>
                <td>${e.hoursWorked}h</td>
                <td class="orange">₹${Number(e.totalCost).toLocaleString("en-IN")}</td>
              </tr>
            `).join("")}
            <tr class="total-row">
              <td colspan="6" style="text-align:right;">Grand Total</td>
              <td class="orange">₹${entries.reduce((s, e) => s + e.totalCost, 0).toLocaleString("en-IN")}</td>
            </tr>
          </tbody>
        </table>
        <div class="footer">BuildTrack — Construction Expense Tracker &nbsp;|&nbsp; Confidential</div>
      </body>
      </html>
    `;
    const win = window.open("", "_blank");
    win.document.write(printContent);
    win.document.close();
    win.print();
  };

  const handleExportCSV = () => {
    const headers = ["#", "Worker Name", "Role", "Date", "Daily Wage", "Hours Worked", "Total Cost"];
    const rows = entries.map((e, i) => [i + 1, e.workerName, e.role, e.date, e.dailyWage, e.hoursWorked, e.totalCost]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `labour-report-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const btnBase = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "10px 16px",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    border: "1px solid",
    fontFamily: "Inter, sans-serif",
    transition: "all 0.15s",
  };

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <button
        onClick={handleExportCSV}
        disabled={entries.length === 0}
        style={{ ...btnBase, backgroundColor: entries.length === 0 ? "#F8FAFC" : "#F0FDF4", color: entries.length === 0 ? "#CBD5E1" : "#15803D", borderColor: entries.length === 0 ? "#E5E7EB" : "#86EFAC", cursor: entries.length === 0 ? "not-allowed" : "pointer" }}
      >
        <Download size={14} /> Export CSV
      </button>
      <button
        onClick={handlePrint}
        disabled={entries.length === 0}
        style={{ ...btnBase, backgroundColor: entries.length === 0 ? "#F8FAFC" : "#EFF6FF", color: entries.length === 0 ? "#CBD5E1" : "#1D4ED8", borderColor: entries.length === 0 ? "#E5E7EB" : "#93C5FD", cursor: entries.length === 0 ? "not-allowed" : "pointer" }}
      >
        <Printer size={14} /> Print Report
      </button>
    </div>
  );
}