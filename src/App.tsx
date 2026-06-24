import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, Users, Eye, EyeOff, LogIn, ArrowRight, HelpCircle, 
  X, CheckCircle, AlertCircle, HardHat, Info
} from 'lucide-react';
import { Splash } from './components/Splash';
import { AdminDashboard } from './components/AdminDashboard';
import { ClientDashboard } from './components/ClientDashboard';
import { Logo } from './components/Logo';
import { User } from './types';
import { INITIAL_SITES, INITIAL_EXPENSES, INITIAL_LABORERS } from './data';

export default function App() {
  const [isSplash, setIsSplash] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  
  // Login Form States
  const [selectedRole, setSelectedRole] = useState<'admin' | 'client'>('admin');
  const [email, setEmail] = useState('admin@buildtrack.com');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  
  // UI interaction states
  const [isLoading, setIsLoading] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Synchronize credentials when role is selected
  const handleRoleSelect = (role: 'admin' | 'client') => {
    setSelectedRole(role);
    if (role === 'admin') {
      setEmail('admin@buildtrack.com');
      setPassword('••••••••');
    } else {
      setEmail('client@buildtrack.com');
      setPassword('••••••••');
    }
    setError(null);
  };

  // Sign-in execution
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all security fields.');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Simulate authenticating server handshake
    setTimeout(() => {
      setIsLoading(false);
      if (selectedRole === 'admin') {
        setUser({
          email: 'admin@buildtrack.com',
          role: 'admin',
          name: 'Amit Patel'
        });
      } else {
        setUser({
          email: 'client@buildtrack.com',
          role: 'client',
          name: 'Global Builders Sponsor'
        });
      }
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-gray-900 overflow-x-hidden select-none">
      <AnimatePresence mode="wait">
        {/* State 1: Splash Screen */}
        {isSplash && (
          <Splash key="splash" onComplete={() => setIsSplash(false)} />
        )}

        {/* State 2: Active User Session */}
        {!isSplash && user && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {user.role === 'admin' ? (
              <AdminDashboard 
                initialSites={INITIAL_SITES}
                initialExpenses={INITIAL_EXPENSES}
                initialLaborers={INITIAL_LABORERS}
                onLogout={() => setUser(null)}
              />
            ) : (
              <ClientDashboard 
                onLogout={() => setUser(null)}
              />
            )}
          </motion.div>
        )}

        {/* State 3: Figma-Perfect Split Screen Landing Page */}
        {!isSplash && !user && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col md:flex-row"
          >
            {/* LEFT SIDE PANEL - Construction site immersive banner */}
            <div className="relative w-full md:w-[55%] lg:w-[60%] min-h-[360px] md:min-h-screen bg-slate-900 flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden">
              
              {/* Construction site background photo with dark overlay */}
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1200&q=80"
                  alt="BuildTrack active site reinforcement"
                  className="w-full h-full object-cover opacity-35"
                  referrerPolicy="no-referrer"
                />
                {/* Perfect vignette and contrast gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950/60" />
              </div>

              {/* Elements container: Relative for z-indexing */}
              <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                
                {/* 1. Header Area with white/orange Logo */}
                <div className="flex items-center justify-between">
                  <Logo variant="light" height={44} />
                </div>

                {/* 2. Headline & Badge area */}
                <div className="flex flex-col items-start gap-5 max-w-xl my-auto">
                  {/* Pill Badge */}
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full text-xs font-semibold text-orange-400 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                    Construction Finance Intelligence
                  </div>

                  {/* High Impact Headline */}
                  <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-none">
                    Every rupee tracked.<br />
                    Every site <span className="text-orange-400">under control.</span>
                  </h1>

                  {/* Paragraph description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mt-1 font-medium">
                    Manage budgets, track daily labour attendance, and monitor real-time spending across all your construction projects — from one unified platform.
                  </p>
                </div>

                {/* 3. Bottom Stats Metrics Panel */}
                <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-white/10 max-w-lg">
                  {/* Stat 1 */}
                  <div className="flex flex-col">
                    <span className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-orange-400">
                      ₹12Cr+
                    </span>
                    <span className="text-[10px] sm:text-xs text-slate-400 font-semibold mt-1.5 leading-tight">
                      Expenses tracked
                    </span>
                  </div>

                  {/* Stat 2 */}
                  <div className="flex flex-col">
                    <span className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-orange-400">
                      340+
                    </span>
                    <span className="text-[10px] sm:text-xs text-slate-400 font-semibold mt-1.5 leading-tight">
                      Workers managed
                    </span>
                  </div>

                  {/* Stat 3 */}
                  <div className="flex flex-col">
                    <span className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-orange-400">
                      18
                    </span>
                    <span className="text-[10px] sm:text-xs text-slate-400 font-semibold mt-1.5 leading-tight">
                      Active sites
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT SIDE PANEL - The clean elegant sign-in workspace */}
            <div className="w-full md:w-[45%] lg:w-[40%] bg-white flex flex-col justify-between p-6 sm:p-10 lg:p-14 relative">
              
              {/* Outer boundary padding */}
              <div className="my-auto max-w-sm w-full mx-auto flex flex-col gap-8">
                
                {/* Title & Introduction heading */}
                <div className="flex flex-col gap-1.5">
                  <h2 className="font-display text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-none">
                    Welcome back
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-400 font-medium leading-none">
                    Sign in to access your construction dashboard
                  </p>
                </div>

                {/* Role Switch Selection Quick tabs (Figma specific model) */}
                <div className="grid grid-cols-2 gap-3 bg-gray-50 border border-gray-100 p-1.5 rounded-2xl">
                  {/* Tab 1: Admin Demo */}
                  <button
                    type="button"
                    onClick={() => handleRoleSelect('admin')}
                    className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                      selectedRole === 'admin'
                        ? 'bg-white text-gray-900 shadow-sm border border-gray-100'
                        : 'text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    <ShieldAlert className={`w-4 h-4 ${selectedRole === 'admin' ? 'text-orange-500' : ''}`} />
                    Admin Demo
                  </button>

                  {/* Tab 2: Client Demo */}
                  <button
                    type="button"
                    onClick={() => handleRoleSelect('client')}
                    className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                      selectedRole === 'client'
                        ? 'bg-white text-gray-900 shadow-sm border border-gray-100'
                        : 'text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    <Users className={`w-4 h-4 ${selectedRole === 'client' ? 'text-orange-500' : ''}`} />
                    Client Demo
                  </button>
                </div>

                {/* Horizontal Divider */}
                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-gray-100"></div>
                  <span className="flex-shrink mx-4 text-[9px] font-bold text-gray-400 tracking-widest uppercase">
                    or sign in manually
                  </span>
                  <div className="flex-grow border-t border-gray-100"></div>
                </div>

                {/* Form Elements */}
                <form onSubmit={handleSignIn} className="flex flex-col gap-4">
                  
                  {/* Email block */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-gray-500 font-bold tracking-tight">
                      Email address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your registered email"
                      className="w-full px-4 py-3 text-xs bg-white border border-gray-200 hover:border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none rounded-xl transition-all font-medium"
                      required
                    />
                  </div>

                  {/* Password block */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-gray-500 font-bold tracking-tight">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-4 pr-11 py-3 text-xs bg-white border border-gray-200 hover:border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none rounded-xl transition-all font-medium"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Error messaging */}
                  {error && (
                    <div className="bg-red-50 text-red-700 border border-red-100 rounded-xl p-3 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <span className="font-semibold">{error}</span>
                    </div>
                  )}

                  {/* Primary CTA Sign-In button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white py-3.5 px-4 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-orange-500/15 hover:shadow-orange-500/25 cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <ArrowRight className="w-4 h-4" />
                        Sign In
                      </>
                    )}
                  </button>

                </form>

                {/* Under-caption detail helper */}
                <div className="text-center">
                  <span className="text-[11px] text-gray-400 font-medium">
                    Admin access - Full dashboard | Client access - Budget report only
                  </span>
                </div>

              </div>

              {/* Floating Help query trigger (Bottom Right corner) */}
              <div className="absolute bottom-6 right-6 z-20">
                <button
                  onClick={() => setIsHelpOpen(true)}
                  className="w-10 h-10 bg-white border border-gray-200 text-gray-500 hover:text-orange-500 hover:border-orange-200 rounded-full flex items-center justify-center shadow-md transition-all duration-250 cursor-pointer"
                  title="Figma specifications"
                >
                  <HelpCircle className="w-5 h-5" />
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DETAILED SPECS HELP DIALOG */}
      <AnimatePresence>
        {isHelpOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white max-w-md w-full rounded-2xl border border-gray-100 shadow-xl overflow-hidden flex flex-col"
            >
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-orange-500" /> Figma & Build Specifications
                </h3>
                <button
                  onClick={() => setIsHelpOpen(false)}
                  className="p-1 rounded bg-white border border-gray-200 text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 flex flex-col gap-4 text-xs text-gray-600 leading-relaxed">
                <p>
                  This application has been meticulously converted from your Figma specifications into clean, semantic React, styled with Tailwind CSS and animated using motion framework:
                </p>
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-start gap-2.5 bg-orange-50/50 p-2.5 rounded-xl border border-orange-100/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                    <span><b>Logo Intro Splash</b>: Displayed as an elegant centered vector-accurate branding mark for the first 2.5 seconds.</span>
                  </div>
                  <div className="flex items-start gap-2.5 bg-orange-50/50 p-2.5 rounded-xl border border-orange-100/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                    <span><b>Two Demo Modes</b>: Easy-access buttons to log directly into the <b>Administrator's Ledger</b> or the <b>Client's read-only Budget Report</b>.</span>
                  </div>
                  <div className="flex items-start gap-2.5 bg-orange-50/50 p-2.5 rounded-xl border border-orange-100/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                    <span><b>Interactive Features</b>: Real-time ledger entries, live roster marking, and an interactive query assistant for clients.</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsHelpOpen(false)}
                  className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-xl transition-colors cursor-pointer shadow-sm"
                >
                  Close & Explore
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
