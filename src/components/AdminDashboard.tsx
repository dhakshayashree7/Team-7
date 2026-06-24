import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building, DollarSign, Users, Activity, Plus, Search, Filter, 
  Trash2, SlidersHorizontal, ArrowUpRight, Check, X, HardHat, Calendar,
  Bell, LogOut, FileText, CheckCircle2, RefreshCw, ChevronRight, User
} from 'lucide-react';
import { Logo } from './Logo';
import { Site, Expense, Laborer } from '../types';
import { EXPENSE_CATEGORIES } from '../data';

interface AdminDashboardProps {
  initialSites: Site[];
  initialExpenses: Expense[];
  initialLaborers: Laborer[];
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  initialSites,
  initialExpenses,
  initialLaborers,
  onLogout
}) => {
  // Application State
  const [sites, setSites] = useState<Site[]>(initialSites);
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [laborers, setLaborers] = useState<Laborer[]>(initialLaborers);
  
  const [activeTab, setActiveTab] = useState<'overview' | 'sites' | 'labor' | 'transactions'>('overview');
  
  // Filtering & Search
  const [siteSearch, setSiteSearch] = useState('');
  const [siteFilter, setSiteFilter] = useState<'All' | 'Active' | 'Completed' | 'Paused'>('All');
  const [expenseSearch, setExpenseSearch] = useState('');
  const [expenseCategoryFilter, setExpenseCategoryFilter] = useState('All');
  
  // Modals & Forms
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    siteId: sites[0]?.id || '',
    category: EXPENSE_CATEGORIES[0],
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [notification, setNotification] = useState<string | null>(null);

  // Helper trigger notification
  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Add Expense Logic
  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpense.siteId || !newExpense.amount || !newExpense.description) {
      showNotification('Please fill in all fields');
      return;
    }

    const amountNum = parseFloat(newExpense.amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      showNotification('Please enter a valid amount');
      return;
    }

    const selectedSite = sites.find(s => s.id === newExpense.siteId);
    if (!selectedSite) return;

    // Create new expense
    const expenseRecord: Expense = {
      id: `e-${Date.now()}`,
      siteId: newExpense.siteId,
      siteName: selectedSite.name,
      category: newExpense.category,
      amount: amountNum,
      description: newExpense.description,
      date: newExpense.date
    };

    // Update States
    setExpenses([expenseRecord, ...expenses]);
    
    // Increment spent amount of the selected site
    setSites(sites.map(s => {
      if (s.id === newExpense.siteId) {
        return {
          ...s,
          spentAmount: s.spentAmount + amountNum
        };
      }
      return s;
    }));

    setIsAddExpenseOpen(false);
    setNewExpense({
      siteId: sites[0]?.id || '',
      category: EXPENSE_CATEGORIES[0],
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
    showNotification(`Successfully added expense for ${selectedSite.name}`);
  };

  // Delete Expense Logic
  const handleDeleteExpense = (id: string) => {
    const expenseToDelete = expenses.find(e => e.id === id);
    if (!expenseToDelete) return;

    // Deduct spent amount of the corresponding site
    setSites(sites.map(s => {
      if (s.id === expenseToDelete.siteId) {
        return {
          ...s,
          spentAmount: Math.max(0, s.spentAmount - expenseToDelete.amount)
        };
      }
      return s;
    }));

    setExpenses(expenses.filter(e => e.id !== id));
    showNotification('Expense record removed');
  };

  // Toggle Labor Attendance
  const handleToggleAttendance = (laborId: string, status: 'present' | 'absent' | 'unmarked') => {
    setLaborers(laborers.map(l => {
      if (l.id === laborId) {
        return { ...l, attendanceStatus: status };
      }
      return l;
    }));
  };

  // Calculate Aggregated Metrics
  const totalBudget = sites.reduce((sum, s) => sum + s.totalBudget, 0);
  const totalSpent = sites.reduce((sum, s) => sum + s.spentAmount, 0);
  const totalRemaining = totalBudget - totalSpent;
  const activeSitesCount = sites.filter(s => s.status === 'Active').length;
  
  // Labor Metrics
  const presentLaborCount = laborers.filter(l => l.attendanceStatus === 'present').length;
  const absentLaborCount = laborers.filter(l => l.attendanceStatus === 'absent').length;
  const unmarkedLaborCount = laborers.filter(l => l.attendanceStatus === 'unmarked').length;
  const estimatedDailyWageBill = laborers
    .filter(l => l.attendanceStatus === 'present')
    .reduce((sum, l) => sum + l.wagePerDay, 0);

  // Formatting helpers (Rupees Lakhs/Crores)
  const formatRupees = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} Lakh`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  // Site filtering logic
  const filteredSites = sites.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(siteSearch.toLowerCase()) || 
                          s.location.toLowerCase().includes(siteSearch.toLowerCase()) ||
                          s.manager.toLowerCase().includes(siteSearch.toLowerCase());
    const matchesFilter = siteFilter === 'All' || s.status === siteFilter;
    return matchesSearch && matchesFilter;
  });

  // Expense filtering logic
  const filteredExpenses = expenses.filter(e => {
    const matchesSearch = e.description.toLowerCase().includes(expenseSearch.toLowerCase()) ||
                          e.siteName.toLowerCase().includes(expenseSearch.toLowerCase());
    const matchesCategory = expenseCategoryFilter === 'All' || e.category === expenseCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-gray-900 selection:bg-orange-500 selection:text-white">
      {/* Top Admin Header */}
      <header className="sticky top-0 bg-white border-b border-gray-100 z-30 px-6 py-4 shadow-sm shadow-gray-100/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Logo variant="full" height={36} />
            <div className="h-6 w-[1px] bg-gray-200 hidden sm:block" />
            <span className="bg-orange-50 text-orange-700 font-semibold px-2.5 py-0.5 rounded-full text-xs tracking-wide uppercase border border-orange-100 flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              Enterprise Admin Console
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* User Profile Summary */}
            <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm border border-orange-200">
                A
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-semibold text-gray-800 leading-none">Amit Patel</span>
                <span className="text-[10px] text-gray-400 mt-0.5">Project Director</span>
              </div>
            </div>

            {/* Logout Button */}
            <button 
              onClick={onLogout}
              className="px-3.5 py-1.5 text-xs text-gray-600 hover:text-red-600 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-100 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-2">
          <div className="flex items-center gap-1.5 bg-gray-100/80 p-1 rounded-xl border border-gray-200/50">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-orange-500" />
              Overview Dashboard
            </button>
            <button
              onClick={() => setActiveTab('sites')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                activeTab === 'sites'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Building className="w-3.5 h-3.5 text-orange-500" />
              Active Sites Directory ({sites.length})
            </button>
            <button
              onClick={() => setActiveTab('labor')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                activeTab === 'labor'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <HardHat className="w-3.5 h-3.5 text-orange-500" />
              Daily Labour ({presentLaborCount}/{laborers.length})
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                activeTab === 'transactions'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-orange-500" />
              Ledger Transactions
            </button>
          </div>

          <button
            onClick={() => setIsAddExpenseOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-xl flex items-center gap-2 transition-all duration-200 shadow-md shadow-orange-500/10 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Record Site Expense
          </button>
        </div>

        {/* Global Notifications */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-emerald-50 border border-emerald-100 text-emerald-800 px-4 py-3 rounded-xl text-xs flex items-center gap-2.5 shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span className="font-medium">{notification}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TAB CONTENTS */}

        {/* Tab 1: Overview Dashboard */}
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-6">
            {/* Top Metrics Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Total Spent */}
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-400">Expenses Tracked</span>
                  <span className="text-xl font-bold text-gray-900 mt-1">{formatRupees(totalSpent)}</span>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold mt-1">
                    <span>{((totalSpent / totalBudget) * 100).toFixed(1)}% of total budget</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Total Budget */}
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
                  <Building className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-400">Total Approved Capital</span>
                  <span className="text-xl font-bold text-gray-900 mt-1">{formatRupees(totalBudget)}</span>
                  <span className="text-[10px] text-gray-400 mt-1">Across 18 regional sectors</span>
                </div>
              </div>

              {/* Card 3: Remaining Reserves */}
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-400">Remaining Reserves</span>
                  <span className="text-xl font-bold text-gray-900 mt-1">{formatRupees(totalRemaining)}</span>
                  <span className="text-[10px] text-emerald-600 font-semibold mt-1">Sufficient liquidity</span>
                </div>
              </div>

              {/* Card 4: Daily Labour Bill */}
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-500">
                  <Users className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-400">Daily Labour Bill</span>
                  <span className="text-xl font-bold text-gray-900 mt-1">₹{estimatedDailyWageBill.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-gray-400 mt-1">Based on {presentLaborCount} workers present</span>
                </div>
              </div>
            </div>

            {/* Custom SVG Dynamic Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Chart Card: Budget vs Spent (Active Projects) */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm lg:col-span-2 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h3 className="text-sm font-bold text-gray-800">Budget vs Spent (Top 5 Active Sites)</h3>
                    <p className="text-[10px] text-gray-400 mt-0.5">Real-time expenditure matching</p>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-semibold">
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <span className="w-2.5 h-2.5 bg-gray-200 rounded-sm" />
                      Budget
                    </div>
                    <div className="flex items-center gap-1.5 text-orange-500">
                      <span className="w-2.5 h-2.5 bg-orange-500 rounded-sm" />
                      Spent
                    </div>
                  </div>
                </div>

                {/* Styled High-Fidelity Custom SVG Chart */}
                <div className="relative w-full h-64 mt-2 flex items-end justify-between border-b border-l border-gray-100 pb-1 pl-1">
                  {/* Backdrop Grid Lines */}
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gray-50 border-dashed border-b border-gray-100" />
                  <div className="absolute inset-x-0 top-1/4 h-[1px] bg-gray-50 border-dashed border-b border-gray-100" />
                  <div className="absolute inset-x-0 top-2/4 h-[1px] bg-gray-50 border-dashed border-b border-gray-100" />
                  <div className="absolute inset-x-0 top-3/4 h-[1px] bg-gray-50 border-dashed border-b border-gray-100" />

                  {/* Five Chart Bars representing Top Sites */}
                  {sites.slice(0, 5).map((site, idx) => {
                    const maxVal = Math.max(...sites.slice(0, 5).map(s => s.totalBudget));
                    const budgetHeight = (site.totalBudget / maxVal) * 90; // max 90%
                    const spentHeight = (site.spentAmount / maxVal) * 90;
                    
                    return (
                      <div key={site.id} className="flex-1 flex flex-col items-center group relative z-10">
                        {/* Interactive values on hover */}
                        <div className="absolute -top-12 bg-gray-900 text-white rounded px-2 py-1 text-[9px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none flex flex-col items-center shadow-lg whitespace-nowrap z-30">
                          <span>Budget: {formatRupees(site.totalBudget)}</span>
                          <span className="text-orange-400 font-semibold">Spent: {formatRupees(site.spentAmount)}</span>
                          <span className="text-[8px] text-gray-400 mt-0.5">({((site.spentAmount / site.totalBudget) * 100).toFixed(0)}% used)</span>
                        </div>

                        {/* Bar visuals side-by-side */}
                        <div className="flex items-end gap-1 sm:gap-1.5 w-full justify-center h-48">
                          {/* Budget Bar */}
                          <div 
                            className="w-4 sm:w-6 bg-gray-100 group-hover:bg-gray-200/80 rounded-t-sm transition-all duration-300"
                            style={{ height: `${budgetHeight}%` }}
                          />
                          {/* Spent Bar */}
                          <div 
                            className="w-4 sm:w-6 bg-gradient-to-t from-orange-600 to-orange-400 rounded-t-sm shadow-md shadow-orange-500/10 transition-all duration-300"
                            style={{ height: `${spentHeight}%` }}
                          />
                        </div>

                        {/* Slanted or shortened text labels for site names */}
                        <span className="text-[9px] text-gray-500 font-medium mt-2 max-w-[80px] truncate text-center leading-tight">
                          {site.name.split(' ')[0]} {site.name.split(' ')[1] || ''}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Chart Card: Spend Breakdown by Categories */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
                <div>
                  <h3 className="text-sm font-bold text-gray-800">Operational Cost Breakdown</h3>
                  <p className="text-[10px] text-gray-400 mt-0.5">Cumulative materials vs labor</p>
                </div>

                {/* SVG Semi-donut/curved progress bar representation */}
                <div className="relative flex items-center justify-center py-4">
                  <svg className="w-40 h-40 transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="65"
                      stroke="#F1F5F9"
                      strokeWidth="12"
                      fill="transparent"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="65"
                      stroke="#F97316"
                      strokeWidth="12"
                      fill="transparent"
                      strokeDasharray={408.2}
                      strokeDashoffset={408.2 * (1 - totalSpent / totalBudget)}
                      strokeLinecap="round"
                    />
                  </svg>
                  {/* Inside metrics text */}
                  <div className="absolute flex flex-col items-center">
                    <span className="text-xl font-bold text-gray-900">{((totalSpent / totalBudget) * 100).toFixed(0)}%</span>
                    <span className="text-[9px] text-gray-400 font-semibold tracking-wider uppercase mt-0.5">Budget Utilized</span>
                  </div>
                </div>

                {/* Category Legends with local counts */}
                <div className="flex flex-col gap-2 mt-auto">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-orange-500 rounded-full" />
                      <span className="text-gray-500">Materials (Steel, Cement, Concrete)</span>
                    </div>
                    <span className="font-semibold text-gray-800">~62%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-orange-300 rounded-full" />
                      <span className="text-gray-500">Labour & Daily Wage Payroll</span>
                    </div>
                    <span className="font-semibold text-gray-800">~23%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-amber-400 rounded-full" />
                      <span className="text-gray-500">Logistics & Equipment Leasing</span>
                    </div>
                    <span className="font-semibold text-gray-800">~15%</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Row: Recent Active Transactions & Attendance Quick Check */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Transactions list - spans 2 cols */}
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm lg:col-span-2 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h3 className="text-sm font-bold text-gray-800">Recent Construction Ledger Entries</h3>
                    <p className="text-[10px] text-gray-400 mt-0.5">Latest physical expense submissions</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('transactions')}
                    className="text-orange-500 text-[11px] font-semibold hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    View All Entries <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 text-gray-400 font-medium">
                        <th className="py-3 px-2">Site / Location</th>
                        <th className="py-3 px-2">Expense Details</th>
                        <th className="py-3 px-2">Category</th>
                        <th className="py-3 px-2 text-right">Amount</th>
                        <th className="py-3 px-2 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {expenses.slice(0, 5).map((exp) => (
                        <tr key={exp.id} className="hover:bg-gray-50/50 transition-all duration-150 text-gray-700">
                          <td className="py-3.5 px-2 font-semibold text-gray-800">
                            {exp.siteName}
                          </td>
                          <td className="py-3.5 px-2">
                            <div className="flex flex-col">
                              <span>{exp.description}</span>
                              <span className="text-[10px] text-gray-400 mt-0.5">{exp.date}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-2">
                            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wide">
                              {exp.category.split(' - ')[1] || exp.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-2 text-right font-bold text-gray-900">
                            {formatRupees(exp.amount)}
                          </td>
                          <td className="py-3.5 px-2 text-center">
                            <button
                              onClick={() => handleDeleteExpense(exp.id)}
                              className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-all duration-150 cursor-pointer"
                              title="Delete entry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick Labour Check Card */}
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h3 className="text-sm font-bold text-gray-800">Daily Labour Roll</h3>
                    <p className="text-[10px] text-gray-400 mt-0.5">Quick roster attendance</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('labor')}
                    className="text-orange-500 text-[11px] font-semibold hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    Roster Details <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="flex flex-col gap-3 max-h-[260px] overflow-y-auto pr-1">
                  {laborers.slice(0, 5).map((labor) => (
                    <div 
                      key={labor.id} 
                      className="flex items-center justify-between bg-gray-50 p-2.5 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs">
                          {labor.name.split(' ')[0][0]}{labor.name.split(' ')[1]?.[0] || ''}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-gray-800 leading-none">{labor.name}</span>
                          <span className="text-[10px] text-gray-400 mt-1">{labor.role}</span>
                        </div>
                      </div>

                      {/* Presence toggle check badge */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleToggleAttendance(labor.id, 'present')}
                          className={`p-1 rounded-md transition-all ${
                            labor.attendanceStatus === 'present'
                              ? 'bg-emerald-500 text-white'
                              : 'bg-white text-gray-300 hover:bg-gray-100 border border-gray-200'
                          }`}
                          title="Mark Present"
                        >
                          <Check className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleToggleAttendance(labor.id, 'absent')}
                          className={`p-1 rounded-md transition-all ${
                            labor.attendanceStatus === 'absent'
                              ? 'bg-rose-500 text-white'
                              : 'bg-white text-gray-300 hover:bg-gray-100 border border-gray-200'
                          }`}
                          title="Mark Absent"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400 font-medium">
                  <span>Wage index: <b>₹450 - ₹900/day</b></span>
                  <span className="text-orange-500">10 core supervisors</span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Tab 2: Sites Directory */}
        {activeTab === 'sites' && (
          <div className="flex flex-col gap-6">
            {/* Search and Filters panel */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Search bar */}
              <div className="relative w-full md:max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search site name, location or manager..."
                  value={siteSearch}
                  onChange={(e) => setSiteSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs bg-[#F8FAFC] border border-gray-200 hover:border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none rounded-xl transition-all"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2 self-start md:self-auto">
                <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                  <Filter className="w-3 h-3" /> Status:
                </span>
                <div className="flex bg-gray-100 p-0.5 rounded-lg border border-gray-200 text-xs">
                  {(['All', 'Active', 'Completed', 'Paused'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => setSiteFilter(status)}
                      className={`px-3 py-1.5 font-semibold rounded-md transition-all cursor-pointer ${
                        siteFilter === status
                          ? 'bg-white text-gray-800 shadow-xs'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sites Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSites.map((site) => {
                const percentSpent = (site.spentAmount / site.totalBudget) * 100;
                const isOverBudget = site.spentAmount > site.totalBudget;
                
                return (
                  <div 
                    key={site.id} 
                    className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all duration-300 flex flex-col gap-4 relative overflow-hidden group"
                  >
                    {/* Status ribbon */}
                    <div className="absolute top-0 right-0 w-24 h-6 bg-emerald-50 text-emerald-700 text-[10px] font-bold flex items-center justify-center border-l border-b border-emerald-100 rounded-bl-xl">
                      {site.status}
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center">
                        <Building className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col pr-16">
                        <h4 className="text-sm font-bold text-gray-800 leading-snug group-hover:text-orange-500 transition-colors">
                          {site.name}
                        </h4>
                        <span className="text-[10px] text-gray-400 mt-1">{site.location}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Total Capital Budget</span>
                        <span className="font-bold text-gray-800">{formatRupees(site.totalBudget)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Funds Disbursed</span>
                        <span className={`font-bold ${isOverBudget ? 'text-red-500' : 'text-orange-500'}`}>
                          {formatRupees(site.spentAmount)}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex flex-col gap-1 mt-2">
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            isOverBudget ? 'bg-red-500' : 'bg-gradient-to-r from-orange-500 to-amber-500'
                          }`}
                          style={{ width: `${Math.min(100, percentSpent)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] font-semibold text-gray-400">
                        <span>{percentSpent.toFixed(0)}% utilized</span>
                        <span>{formatRupees(Math.max(0, site.totalBudget - site.spentAmount))} remaining</span>
                      </div>
                    </div>

                    <div className="mt-auto pt-3 border-t border-gray-50 flex justify-between items-center text-[11px] text-gray-400">
                      <span>Site Manager: <b>{site.manager}</b></span>
                      <span className="bg-gray-50 border border-gray-100 px-2 py-0.5 rounded text-gray-500 font-semibold text-[10px]">
                        ID: #{site.id}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Daily Labour Roll */}
        {activeTab === 'labor' && (
          <div className="flex flex-col gap-6">
            {/* Quick metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
                <span className="text-xs font-semibold text-gray-400">Active Present Roll</span>
                <span className="text-xl font-bold text-emerald-600">{presentLaborCount} Workers</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
                <span className="text-xs font-semibold text-gray-400">Excused/Absent</span>
                <span className="text-xl font-bold text-red-500">{absentLaborCount} Workers</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
                <span className="text-xs font-semibold text-gray-400">Unmarked Supervisors</span>
                <span className="text-xl font-bold text-amber-500">{unmarkedLaborCount} Workers</span>
              </div>
            </div>

            {/* Labour Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                <h4 className="text-sm font-bold text-gray-800">Master Roster Roll Call</h4>
                <span className="text-[10px] text-gray-400 font-semibold tracking-wide uppercase">Updated Real-time</span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-gray-50 bg-gray-50 text-gray-400 font-semibold">
                      <th className="py-3 px-6">Name</th>
                      <th className="py-3 px-6">Trade Specialization</th>
                      <th className="py-3 px-6">Wage Scale</th>
                      <th className="py-3 px-6">Contact Number</th>
                      <th className="py-3 px-6">Roster Attendance</th>
                      <th className="py-3 px-6 text-center">Roster Code</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-gray-700">
                    {laborers.map((labor) => (
                      <tr key={labor.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-6 font-semibold text-gray-800 flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs">
                            {labor.name[0]}
                          </div>
                          {labor.name}
                        </td>
                        <td className="py-4 px-6">
                          <span className="bg-orange-50 text-orange-700 border border-orange-100 px-2 py-0.5 rounded text-[10px] font-semibold">
                            {labor.role}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-bold text-gray-900">
                          ₹{labor.wagePerDay}/day
                        </td>
                        <td className="py-4 px-6 text-gray-500">
                          {labor.contact}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleToggleAttendance(labor.id, 'present')}
                              className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                                labor.attendanceStatus === 'present'
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                              }`}
                            >
                              Present
                            </button>
                            <button
                              onClick={() => handleToggleAttendance(labor.id, 'absent')}
                              className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                                labor.attendanceStatus === 'absent'
                                  ? 'bg-red-500 text-white'
                                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                              }`}
                            >
                              Absent
                            </button>
                            <button
                              onClick={() => handleToggleAttendance(labor.id, 'unmarked')}
                              className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                                labor.attendanceStatus === 'unmarked'
                                  ? 'bg-amber-400 text-white'
                                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                              }`}
                            >
                              Unmarked
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center text-gray-400 font-mono text-[10px]">
                          L-ID-{labor.id}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Ledger Transactions */}
        {activeTab === 'transactions' && (
          <div className="flex flex-col gap-6">
            {/* Filter panel */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Search input */}
              <div className="relative w-full md:max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search ledger details, site location, description..."
                  value={expenseSearch}
                  onChange={(e) => setExpenseSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs bg-[#F8FAFC] border border-gray-200 hover:border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none rounded-xl transition-all"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2 self-start md:self-auto">
                <span className="text-xs text-gray-400 font-medium">Category:</span>
                <select
                  value={expenseCategoryFilter}
                  onChange={(e) => setExpenseCategoryFilter(e.target.value)}
                  className="text-xs bg-white border border-gray-200 hover:border-gray-300 focus:border-orange-500 rounded-xl px-3 py-2 focus:outline-none transition-all"
                >
                  <option value="All">All Categories</option>
                  {EXPENSE_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Complete Ledger Roster */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-gray-800">Complete Expense Ledger Records</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">Permanent audited ledger trace log</p>
                </div>
                <span className="bg-orange-50 text-orange-700 px-2.5 py-0.5 rounded text-[10px] font-bold">
                  {filteredExpenses.length} Records Loaded
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-gray-50 bg-gray-50 text-gray-400 font-semibold">
                      <th className="py-3.5 px-6">Audited Site Location</th>
                      <th className="py-3.5 px-6">Ledger Details & Remarks</th>
                      <th className="py-3.5 px-6">Trade Category</th>
                      <th className="py-3.5 px-6">Posting Date</th>
                      <th className="py-3.5 px-6 text-right">Debit amount</th>
                      <th className="py-3.5 px-6 text-center">Ledger ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-gray-700">
                    {filteredExpenses.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-10 text-center text-gray-400 font-medium text-xs">
                          No matching financial records found.
                        </td>
                      </tr>
                    ) : (
                      filteredExpenses.map((exp) => (
                        <tr key={exp.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="py-4 px-6 font-bold text-gray-800">
                            {exp.siteName}
                          </td>
                          <td className="py-4 px-6 text-gray-600">
                            {exp.description}
                          </td>
                          <td className="py-4 px-6">
                            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wide">
                              {exp.category}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-gray-400 font-medium">
                            {exp.date}
                          </td>
                          <td className="py-4 px-6 text-right font-extrabold text-red-600 text-sm">
                            {formatRupees(exp.amount)}
                          </td>
                          <td className="py-4 px-6 text-center">
                            <button
                              onClick={() => handleDeleteExpense(exp.id)}
                              className="px-2 py-1 text-red-500 hover:bg-red-50 rounded border border-red-100/50 hover:border-red-100 cursor-pointer transition-all text-[10px] font-bold"
                            >
                              Void Entry
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* RECORD EXPENSE MODAL */}
      <AnimatePresence>
        {isAddExpenseOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white w-full max-w-lg rounded-2xl border border-gray-100 shadow-xl overflow-hidden flex flex-col"
            >
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-orange-500" /> Record New Construction Expense
                </h3>
                <button
                  onClick={() => setIsAddExpenseOpen(false)}
                  className="p-1 rounded bg-white border border-gray-200 text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddExpense} className="p-6 flex flex-col gap-4">
                {/* Site select */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-500 font-semibold">Select Site Location *</label>
                  <select
                    value={newExpense.siteId}
                    onChange={(e) => setNewExpense({ ...newExpense, siteId: e.target.value })}
                    className="text-xs bg-white border border-gray-200 hover:border-gray-300 focus:border-orange-500 rounded-xl px-3.5 py-2.5 focus:outline-none transition-all"
                  >
                    {sites.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.location})</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category select */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-gray-500 font-semibold">Expense Category *</label>
                    <select
                      value={newExpense.category}
                      onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                      className="text-xs bg-white border border-gray-200 hover:border-gray-300 focus:border-orange-500 rounded-xl px-3.5 py-2.5 focus:outline-none transition-all"
                    >
                      {EXPENSE_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Amount */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-gray-500 font-semibold">Amount (INR) *</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-semibold">₹</span>
                      <input
                        type="number"
                        placeholder="e.g. 250000"
                        value={newExpense.amount}
                        onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                        className="w-full pl-7 pr-4 py-2.5 text-xs bg-white border border-gray-200 hover:border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none rounded-xl transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Posting Date */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-500 font-semibold">Posting Date *</label>
                  <input
                    type="date"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                    className="text-xs bg-white border border-gray-200 hover:border-gray-300 focus:border-orange-500 rounded-xl px-3.5 py-2.5 focus:outline-none transition-all"
                    required
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-500 font-semibold">Log Description & Bill Remarks *</label>
                  <textarea
                    placeholder="Provide specific details about material delivery, labour hours or lease..."
                    rows={3}
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-200 hover:border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none rounded-xl transition-all"
                    required
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-3 border-t border-gray-100 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddExpenseOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-gray-500 hover:bg-gray-50 border border-gray-200 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-xl shadow-md shadow-orange-500/10 transition-colors cursor-pointer"
                  >
                    Submit Ledger Debit
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
