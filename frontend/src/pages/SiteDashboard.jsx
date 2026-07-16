import React, { useState } from 'react';
import { Routes, Route, NavLink, useParams, useNavigate, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  HardHat, LayoutDashboard, DollarSign, Users, BarChart2,
  ChevronLeft, LogOut, Menu, X, MapPin
} from 'lucide-react';
import OverviewModule from '../modules/overview/OverviewModule';
import ExpensesModule from '../modules/expenses/ExpensesModule';
import LaborModule from '../modules/labor/LaborModule';
import BudgetReportModule from '../modules/budget/BudgetReportModule';
import logo from '../assets/logo-on-navy.png';

const NAV_ITEMS = [
  { to: 'overview', label: 'Overview', icon: LayoutDashboard },
  { to: 'expenses', label: 'Expenses', icon: DollarSign },
  { to: 'labor', label: 'Labor', icon: Users },
  { to: 'budget', label: 'Budget Report', icon: BarChart2 },
];

export default function SiteDashboard() {
  const { siteId } = useParams();
  const { getSite, logout } = useApp();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const site = getSite(siteId);

  if (!site) return <Navigate to="/" replace />;

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`blueprint-grid dashboard-sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
        {/* Logo */}
        <div style={{
          padding: '0 20px',
          height: 'var(--header-height)',
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          <img
            src={logo}
            alt="BuildTrack"
            style={{ height: 30, width: 'auto', display: 'block', objectFit: 'contain' }}
          />
        </div>

        {/* Site info */}
        <div style={{
          margin: '12px 12px 4px',
          padding: '12px',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 10,
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Active Site</div>
          <div style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{site.name}</div>
          {site.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'rgba(255,255,255,0.4)', fontSize: 11, marginTop: 3 }}>
              <MapPin size={10} /> {site.location}
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '8px 12px', overflowY: 'auto' }}>
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={`/site/${siteId}/${item.to}`}
              onClick={() => setMobileOpen(false)}
              className="sidebar-nav-link"
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 12px',
                borderRadius: 8,
                marginBottom: 2,
                fontSize: 14,
                fontWeight: 500,
                transition: 'all 0.15s',
                textDecoration: 'none',
                color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                background: isActive ? 'var(--orange)' : 'transparent',
                borderLeft: isActive ? '3px solid #fff' : '3px solid transparent',
                boxShadow: isActive ? '0 2px 8px rgba(255,140,0,0.3)' : 'none',
              })}
            >
              {({ isActive }) => (
                <>
                  <item.icon size={17} color={isActive ? '#fff' : 'rgba(255,255,255,0.4)'} />
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer actions */}
        <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <button
            className="btn"
            onClick={() => navigate('/')}
            style={{
              width: '100%', justifyContent: 'center', gap: 8,
              background: 'rgba(255,255,255,0.06)',
              color: 'rgba(255,255,255,0.6)',
              marginBottom: 8, fontSize: 13,
            }}
          >
            <ChevronLeft size={15} /> All Sites
          </button>
          <button
            className="btn"
            onClick={logout}
            style={{
              width: '100%', justifyContent: 'center', gap: 8,
              background: 'rgba(220,38,38,0.1)',
              color: 'rgba(255,100,100,0.8)',
              fontSize: 13,
            }}
          >
            <LogOut size={15} /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 99 }}
        />
      )}

      {/* Main content */}
      <div className="dashboard-content">
        {/* Top bar */}
        <header className="dashboard-header">
          <button className="btn btn-ghost btn-icon menu-toggle-btn" onClick={() => setMobileOpen(true)}>
            <Menu size={20} />
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{site.name} Dashboard</h2>
            <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              Budget: <strong style={{ color: 'var(--text-primary)' }}>₹{site.budget.toLocaleString('en-IN')}</strong>
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'var(--gradient-navy)',
              border: '2px solid var(--orange)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700, color: '#fff',
            }}>
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="dashboard-main">
          <Routes>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<OverviewModule siteId={siteId} site={site} />} />
            <Route path="expenses" element={<ExpensesModule siteId={siteId} site={site} />} />
            <Route path="labor" element={<LaborModule siteId={siteId} site={site} />} />
            <Route path="budget" element={<BudgetReportModule siteId={siteId} site={site} />} />
          </Routes>
        </main>
      </div>

      <style>{`
        .dashboard-container {
          display: flex;
          min-height: 100vh;
          background: var(--surface);
        }
        .dashboard-sidebar {
          width: var(--sidebar-width);
          background: var(--gradient-navy);
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0; left: 0; bottom: 0;
          z-index: 100;
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 4px 0 24px rgba(0,0,0,0.15);
          transform: translateX(0);
        }
        .dashboard-content {
          flex: 1;
          margin-left: var(--sidebar-width);
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .dashboard-header {
          height: var(--header-height);
          background: var(--white);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 28px;
          position: sticky;
          top: 0;
          z-index: 50;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
        }
        .menu-toggle-btn {
          display: none;
        }
        .dashboard-main {
          flex: 1;
          padding: 28px;
          overflow-y: auto;
        }

        @media (max-width: 768px) {
          .dashboard-sidebar {
            transform: translateX(-100%);
          }
          .dashboard-sidebar.sidebar-open {
            transform: translateX(0);
          }
          .dashboard-content {
            margin-left: 0;
          }
          .dashboard-header {
            padding: 0 16px;
          }
          .menu-toggle-btn {
            display: flex !important;
            margin-right: 12px;
            padding: 8px;
          }
          .dashboard-main {
            padding: 16px;
          }
        }
        @media (max-width: 480px) {
          .dashboard-header h2 {
            font-size: 14px !important;
          }
          .dashboard-header p {
            font-size: 11px !important;
          }
        }
      `}</style>
    </div>
  );
}
