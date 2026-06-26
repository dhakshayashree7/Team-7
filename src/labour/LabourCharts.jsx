import { useState } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, Area, AreaChart
} from "recharts";
import { TrendingUp, PieChart as PieIcon, BarChart3, Users, Wallet, Clock3, CalendarDays } from "lucide-react";

const PRIMARY = "#F97316";
const SECONDARY = "#1E293B";
const PIE_COLORS = ["#F97316", "#1D4ED8", "#15803D", "#7C3AED", "#BE123C", "#0891B2", "#854D0E", "#374151"];

const CustomTooltip = ({ active, payload, label, prefix = "₹" }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: "#fff", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "12px 16px", boxShadow: "0 4px 16px rgba(0,0,0,0.1)", fontFamily: "Inter, sans-serif" }}>
        <p style={{ margin: "0 0 6px", fontSize: "12px", color: "#64748B", fontWeight: 500 }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: p.color }}>
            {prefix}{typeof p.value === "number" ? p.value.toLocaleString("en-IN") : p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const EmptyChart = () => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "200px", color: "#94A3B8" }}>
    <BarChart3 size={40} color="#CBD5E1" style={{ marginBottom: "12px" }} />
    <p style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: 600, color: "#374151" }}>No Analytics Available Yet</p>
    <p style={{ margin: 0, fontSize: "13px", color: "#94A3B8" }}>Add labour entries to generate insights and reports.</p>
  </div>
);

export default function LabourCharts({ entries }) {
  const [activeChart, setActiveChart] = useState("trend");

  // Daily cost data
  const dailyMap = {};
  entries.forEach((e) => {
    const date = new Date(e.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
    dailyMap[date] = (dailyMap[date] || 0) + e.totalCost;
  });
  const dailyData = Object.entries(dailyMap)
    .slice(-14)
    .map(([date, cost]) => ({ date, cost: Math.round(cost) }));

  // Role distribution
  const roleMap = {};
  entries.forEach((e) => { roleMap[e.role] = (roleMap[e.role] || 0) + e.totalCost; });
  const roleData = Object.entries(roleMap).map(([name, value]) => ({ name, value: Math.round(value) }));
  const totalRoleCost = roleData.reduce((s, d) => s + d.value, 0);

  // Productivity data (workers + hours per day)
  const productivityMap = {};
  entries.forEach((e) => {
    const date = new Date(e.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
    if (!productivityMap[date]) productivityMap[date] = { date, workers: 0, hours: 0, cost: 0 };
    productivityMap[date].workers += 1;
    productivityMap[date].hours += Number(e.hoursWorked);
    productivityMap[date].cost += e.totalCost;
  });
  const productivityData = Object.values(productivityMap).slice(-7);

  const totalCost = entries.reduce((s, e) => s + e.totalCost, 0);
  const avgDailyCost = dailyData.length > 0 ? totalCost / dailyData.length : 0;
  const uniqueWorkers = [...new Set(entries.map(e => e.workerName))].length;
  const totalHours = entries.reduce((s, e) => s + Number(e.hoursWorked), 0);

  const charts = [
    { key: "trend", label: "Cost Trend", icon: TrendingUp },
    { key: "donut", label: "Distribution", icon: PieIcon },
    { key: "productivity", label: "Productivity", icon: BarChart3 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "14px" }}>
        {[
          { label: "Total Labour Cost", value: `₹${Math.round(totalCost).toLocaleString("en-IN")}`, icon: Wallet, bg: "#FFF7ED", color: PRIMARY },
          { label: "Avg Daily Cost", value: `₹${Math.round(avgDailyCost).toLocaleString("en-IN")}`, icon: CalendarDays, bg: "#EFF6FF", color: "#1D4ED8" },
          { label: "Total Workers", value: uniqueWorkers, icon: Users, bg: "#F0FDF4", color: "#15803D" },
          { label: "Total Hours", value: `${totalHours}h`, icon: Clock3, bg: "#FDF4FF", color: "#7C3AED" },
        ].map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} style={{ background: "#fff", borderRadius: "12px", padding: "16px 18px", border: "1px solid #F1F5F9", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: kpi.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={18} color={kpi.color} />
              </div>
              <div>
                <p style={{ margin: "0 0 2px", fontSize: "11px", color: "#64748B", fontWeight: 500 }}>{kpi.label}</p>
                <p style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#111827", fontVariantNumeric: "tabular-nums" }}>{kpi.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart Card */}
      <div style={{ background: "#fff", borderRadius: "14px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)", border: "1px solid #F1F5F9" }}>

        {/* Chart Header */}
        <div style={{ padding: "18px 24px", borderBottom: "1px solid #F1F5F9", display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#FAFAFA", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "#111827" }}>Labour Analytics</h3>
            <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#94A3B8" }}>Visual breakdown of labour costs and productivity</p>
          </div>
          <div style={{ display: "flex", gap: "6px", backgroundColor: "#F1F5F9", padding: "4px", borderRadius: "8px" }}>
            {charts.map((btn) => {
              const Icon = btn.icon;
              const active = activeChart === btn.key;
              return (
                <button key={btn.key} onClick={() => setActiveChart(btn.key)}
                  style={{ padding: "7px 14px", borderRadius: "6px", border: "none", fontSize: "12px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", backgroundColor: active ? "#fff" : "transparent", color: active ? PRIMARY : "#64748B", boxShadow: active ? "0 1px 3px rgba(0,0,0,0.08)" : "none", transition: "all 0.15s", fontFamily: "Inter, sans-serif" }}>
                  <Icon size={13} /> {btn.label}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ padding: "24px" }}>
          {entries.length === 0 ? <EmptyChart /> : (
            <>
              {/* Cost Trend — Area + Line Chart */}
              {activeChart === "trend" && (
                <div>
                  <p style={{ margin: "0 0 20px", fontSize: "13px", color: "#64748B", fontWeight: 500 }}>Daily labour cost trend — last 14 days</p>
                  <ResponsiveContainer width="100%" height={260}>
                    <AreaChart data={dailyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={PRIMARY} stopOpacity={0.15} />
                          <stop offset="95%" stopColor={PRIMARY} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="cost" stroke={PRIMARY} strokeWidth={2.5} fill="url(#costGradient)" dot={{ fill: PRIMARY, strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: PRIMARY }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Distribution — Donut Chart */}
              {activeChart === "donut" && (
                <div>
                  <p style={{ margin: "0 0 20px", fontSize: "13px", color: "#64748B", fontWeight: 500 }}>Labour cost distribution by role</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "32px", flexWrap: "wrap" }}>
                    <ResponsiveContainer width={220} height={220}>
                      <PieChart>
                        <Pie data={roleData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                          {roleData.map((_, i) => (
                            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(v) => [`₹${v.toLocaleString("en-IN")}`, "Cost"]} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div style={{ flex: 1, minWidth: "160px", display: "flex", flexDirection: "column", gap: "10px" }}>
                      {roleData.map((item, i) => {
                        const pct = Math.round((item.value / totalRoleCost) * 100);
                        return (
                          <div key={item.name}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <div style={{ width: "10px", height: "10px", borderRadius: "3px", backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                                <span style={{ fontSize: "13px", color: "#374151", fontWeight: 500 }}>{item.name}</span>
                              </div>
                              <div style={{ display: "flex", gap: "8px" }}>
                                <span style={{ fontSize: "12px", color: "#94A3B8" }}>{pct}%</span>
                                <span style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>₹{item.value.toLocaleString("en-IN")}</span>
                              </div>
                            </div>
                            <div style={{ height: "5px", backgroundColor: "#F1F5F9", borderRadius: "999px" }}>
                              <div style={{ height: "100%", width: `${pct}%`, backgroundColor: PIE_COLORS[i % PIE_COLORS.length], borderRadius: "999px", transition: "width 0.4s ease" }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Productivity — Bar Chart */}
              {activeChart === "productivity" && (
                <div>
                  <p style={{ margin: "0 0 20px", fontSize: "13px", color: "#64748B", fontWeight: 500 }}>Worker count and hours worked per day — last 7 days</p>
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={productivityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} barGap={4}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip prefix="" />} />
                      <Legend wrapperStyle={{ fontSize: "12px", color: "#64748B" }} />
                      <Bar dataKey="workers" name="Workers" fill={SECONDARY} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="hours" name="Hours" fill={PRIMARY} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}