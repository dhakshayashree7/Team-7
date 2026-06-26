import { useState } from "react";
import {
  LayoutDashboard, Users, Receipt, BarChart3, Calendar,
  ChevronRight, LogOut, Wallet, Clock3, FileText, Menu, Building2
} from "lucide-react";
import LabourEntryForm from "./LabourEntryForm";
import LabourTable from "./LabourTable";
import LabourFilters from "./LabourFilters";
import LabourCharts from "./LabourCharts";
import AttendanceTracker from "./AttendanceTracker";
import ExportTools from "./ExportTools";

const PRIMARY = "#F97316";
const SECONDARY = "#1E293B";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", key: "dashboard" },
  { icon: Users, label: "Labour Cost Tracking", key: "labour" },
  { icon: Receipt, label: "Expense Entry", key: "expense" },
  { icon: BarChart3, label: "Budget vs Actual", key: "report" },
];

export default function LabourDashboard({ siteId = "SITE-001", siteName = "Site Alpha" }) {
  const [entries, setEntries] = useState([]);
  const [activeNav, setActiveNav] = useState("labour");
  const [activeTab, setActiveTab] = useState("entries");
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [filterDate, setFilterDate] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSave = (entry) => {
    if (editData) {
      setEntries(entries.map((e) => e.id === entry.id ? entry : e));
    } else {
      setEntries([...entries, entry]);
    }
    setShowForm(false);
    setEditData(null);
  };

  const handleEdit = (entry) => { setEditData(entry); setShowForm(true); };
  const handleDelete = (id) => {
    if (window.confirm("Delete this entry?"))
      setEntries(entries.filter((e) => e.id !== id));
  };
  const handleDuplicate = (entry) => {
    setEntries([...entries, {
      ...entry,
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
    }]);
  };
  const openAdd = () => { setEditData(null); setShowForm(true); };

  const filteredEntries = entries.filter((e) => {
    const matchDate = filterDate ? e.date === filterDate : true;
    const matchRole = filterRole ? e.role === filterRole : true;
    return matchDate && matchRole;
  });

  const totalCost = entries.reduce((sum, e) => sum + (e.totalCost || 0), 0);
  const totalHours = entries.reduce((sum, e) => sum + (Number(e.hoursWorked) || 0), 0);
  const uniqueDays = [...new Set(entries.map(e => e.date))].length;
  const avgDailyCost = uniqueDays > 0 ? totalCost / uniqueDays : 0;

  const tabs = [
    { key: "entries", label: "Labour Entries", icon: FileText },
    { key: "attendance", label: "Attendance", icon: Calendar },
    { key: "charts", label: "Analytics", icon: BarChart3 },
  ];

  const sidebarWidth = sidebarCollapsed ? "72px" : "260px";

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      fontFamily: "'Inter', sans-serif",
      backgroundColor: "#F8FAFC",
      overflow: "hidden",
    }}>

      {/* ── SIDEBAR ── */}
      <div style={{
        width: sidebarWidth,
        backgroundColor: SECONDARY,
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        transition: "width 0.3s ease",
        overflow: "hidden",
        boxShadow: "4px 0 24px rgba(0,0,0,0.12)",
        zIndex: 100,
      }}>

        {/* Logo */}
        <div style={{
          height: "72px",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          gap: "12px",
          justifyContent: sidebarCollapsed ? "center" : "flex-start",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <img
            src="/logo.jpeg"
            alt="BuildTrack"
            style={{
              width: sidebarCollapsed ? "36px" : "44px",
              height: sidebarCollapsed ? "36px" : "44px",
              borderRadius: "10px",
              objectFit: "contain",
              flexShrink: 0,
              transition: "all 0.3s ease",
              backgroundColor: "#fff",
              padding: "2px",
            }}
          />
          {!sidebarCollapsed && (
            <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
              <div style={{ fontSize: "15px", fontWeight: 800 }}>
                <span style={{ color: "#fff" }}>Build</span>
                <span style={{ color: PRIMARY }}>Track</span>
              </div>
              <div style={{
                fontSize: "10px",
                color: "#64748B",
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginTop: "1px",
              }}>
                Expense Tracker
              </div>
            </div>
          )}
        </div>

        {/* Nav Items */}
        <div style={{
          flex: 1,
          padding: "12px 8px",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          overflowY: "auto",
        }}>
          {navItems.map((item) => {
            const active = activeNav === item.key;
            const Icon = item.icon;
            return (
              <div
                key={item.key}
                onClick={() => setActiveNav(item.key)}
                title={sidebarCollapsed ? item.label : ""}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "11px 14px",
                  justifyContent: sidebarCollapsed ? "center" : "flex-start",
                  borderRadius: "8px",
                  backgroundColor: active ? PRIMARY : "transparent",
                  color: active ? "#fff" : "#CBD5E1",
                  fontSize: "13px",
                  fontWeight: active ? 600 : 400,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
                onMouseEnter={e => {
                  if (!active) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
                }}
                onMouseLeave={e => {
                  if (!active) e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <Icon size={18} style={{ flexShrink: 0 }} />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </div>
            );
          })}
        </div>

        {/* Logout */}
        <div style={{
          padding: "8px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          flexShrink: 0,
        }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "11px 14px",
              justifyContent: sidebarCollapsed ? "center" : "flex-start",
              borderRadius: "8px",
              color: "#EF4444",
              fontSize: "13px",
              cursor: "pointer",
              whiteSpace: "nowrap",
              overflow: "hidden",
              transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.08)"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
          >
            <LogOut size={18} style={{ flexShrink: 0 }} />
            {!sidebarCollapsed && <span>Logout</span>}
          </div>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        minWidth: 0,
      }}>

        {/* ── TOPBAR ── */}
        <div style={{
          backgroundColor: "#fff",
          borderBottom: "1px solid #E5E7EB",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 28px",
          flexShrink: 0,
          gap: "16px",
          zIndex: 50,
        }}>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              borderRadius: "8px",
              color: "#374151",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#F1F5F9"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
          >
            <Menu size={20} />
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginLeft: "auto" }}>
            <div style={{ width: "1px", height: "32px", backgroundColor: "#E5E7EB" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
              <div style={{
                width: "38px", height: "38px", borderRadius: "50%",
                backgroundColor: SECONDARY,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: "13px", fontWeight: 700, flexShrink: 0,
              }}>
                SE
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#111827", lineHeight: 1.3 }}>
                  Site Engineer
                </div>
                <div style={{ fontSize: "11px", color: "#94A3B8" }}>Super Admin</div>
              </div>
              <ChevronRight size={14} color="#94A3B8" />
            </div>
          </div>
        </div>

        {/* ── PAGE BODY ── */}
        <div style={{
          flex: 1,
          padding: "28px 32px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          minHeight: 0,
        }}>

          {/* Page Header */}
          <div style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}>
            <div>
              <h1 style={{
                margin: 0, fontSize: "28px", fontWeight: 700,
                color: "#111827", letterSpacing: "-0.5px",
              }}>
                Labour Cost Tracking
              </h1>
              <p style={{ margin: "6px 0 0", fontSize: "14px", color: "#64748B" }}>
                Manage workers, attendance and labour costs &nbsp;·&nbsp;
                <span style={{ color: PRIMARY, fontWeight: 500 }}>{siteName}</span>
              </p>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
              <ExportTools entries={entries} />
              <button
                onClick={openAdd}
                style={{
                  backgroundColor: PRIMARY, color: "#fff", border: "none",
                  padding: "11px 22px", borderRadius: "10px", fontSize: "13px",
                  fontWeight: 700, cursor: "pointer", display: "flex",
                  alignItems: "center", gap: "8px",
                  boxShadow: "0 4px 14px rgba(249,115,22,0.35)",
                  transition: "all 0.15s ease", fontFamily: "Inter, sans-serif",
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                + Add Entry
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
          }}>
            {[
              { label: "Total Labour Cost", value: `₹${totalCost.toLocaleString("en-IN")}`, sub: "Across all entries", icon: Wallet, iconBg: "#FFF7ED", iconColor: PRIMARY },
              { label: "Workers Logged", value: entries.length, sub: "Total records", icon: Users, iconBg: "#EFF6FF", iconColor: "#1D4ED8" },
              { label: "Total Hours Worked", value: `${totalHours}h`, sub: "All entries combined", icon: Clock3, iconBg: "#F0FDF4", iconColor: "#15803D" },
              { label: "Avg Daily Cost", value: `₹${Math.round(avgDailyCost).toLocaleString("en-IN")}`, sub: "Per working day", icon: BarChart3, iconBg: "#FDF4FF", iconColor: "#7C3AED" },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  style={{
                    background: "#fff", borderRadius: "14px", padding: "20px 22px",
                    display: "flex", alignItems: "center", gap: "16px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
                    border: "1px solid #F1F5F9", transition: "box-shadow 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.08)"}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)"}
                >
                  <div style={{
                    width: "48px", height: "48px", borderRadius: "12px",
                    backgroundColor: card.iconBg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <Icon size={20} color={card.iconColor} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ margin: "0 0 2px", fontSize: "12px", color: "#64748B", fontWeight: 500 }}>
                      {card.label}
                    </p>
                    <p style={{
                      margin: "0 0 2px", fontSize: "24px", fontWeight: 700,
                      color: "#111827", lineHeight: 1.1, fontVariantNumeric: "tabular-nums",
                    }}>
                      {card.value}
                    </p>
                    <p style={{ margin: 0, fontSize: "11px", color: "#94A3B8" }}>{card.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tabs */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            borderBottom: "2px solid #F1F5F9",
            flexShrink: 0,
          }}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    padding: "12px 20px", border: "none",
                    borderBottom: active ? `2px solid ${PRIMARY}` : "2px solid transparent",
                    marginBottom: "-2px", fontSize: "13px",
                    fontWeight: active ? 700 : 500, cursor: "pointer",
                    backgroundColor: "transparent",
                    color: active ? PRIMARY : "#64748B",
                    transition: "all 0.15s ease", fontFamily: "Inter, sans-serif",
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = "#374151"; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = "#64748B"; }}
                >
                  <Icon size={15} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          {activeTab === "entries" && (
            <>
              {entries.length > 0 && (
                <LabourFilters
                  filterDate={filterDate} setFilterDate={setFilterDate}
                  filterRole={filterRole} setFilterRole={setFilterRole}
                  onClear={() => { setFilterDate(""); setFilterRole(""); }}
                />
              )}
              {entries.length === 0 ? (
                <div style={{
                  background: "#fff", border: "1px solid #F1F5F9",
                  borderRadius: "14px", display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", minHeight: "360px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}>
                  <div style={{
                    width: "80px", height: "80px", borderRadius: "20px",
                    backgroundColor: "#FFF7ED",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: "20px",
                  }}>
                    <FileText size={36} color={PRIMARY} />
                  </div>
                  <h3 style={{ margin: "0 0 8px", fontSize: "18px", fontWeight: 700, color: "#111827" }}>
                    No Labour Records Found
                  </h3>
                  <p style={{ margin: "0 0 28px", fontSize: "14px", color: "#94A3B8" }}>
                    Start by adding your first labour entry.
                  </p>
                  <button
                    onClick={openAdd}
                    style={{
                      backgroundColor: PRIMARY, color: "#fff", border: "none",
                      padding: "12px 28px", borderRadius: "10px", fontSize: "14px",
                      fontWeight: 700, cursor: "pointer",
                      boxShadow: "0 4px 14px rgba(249,115,22,0.35)",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    + Add Labour Entry
                  </button>
                </div>
              ) : filteredEntries.length === 0 ? (
                <div style={{
                  background: "#fff", border: "1px solid #F1F5F9",
                  borderRadius: "14px", padding: "64px",
                  display: "flex", flexDirection: "column", alignItems: "center",
                }}>
                  <FileText size={40} color="#CBD5E1" style={{ marginBottom: "16px" }} />
                  <h3 style={{ margin: "0 0 8px", fontSize: "16px", fontWeight: 700, color: "#111827" }}>
                    No Results Found
                  </h3>
                  <p style={{ margin: 0, fontSize: "13px", color: "#94A3B8" }}>
                    Try clearing the filters.
                  </p>
                </div>
              ) : (
                <LabourTable
                  entries={filteredEntries}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onDuplicate={handleDuplicate}
                />
              )}
            </>
          )}

          {activeTab === "attendance" && <AttendanceTracker entries={entries} />}
          {activeTab === "charts" && <LabourCharts entries={entries} />}

        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <LabourEntryForm
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditData(null); }}
          editData={editData}
        />
      )}
    </div>
  );
}