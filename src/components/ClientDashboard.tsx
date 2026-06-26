import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building, DollarSign, FileText, CheckCircle2, ChevronRight, LogOut, 
  Send, User, Calendar, ShieldCheck, ArrowDownToLine, Clock, MessageSquare 
} from 'lucide-react';
import { Logo } from './Logo';

interface ClientDashboardProps {
  onLogout: () => void;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({ onLogout }) => {
  // Client messages simulator
  const [messages, setMessages] = useState([
    { sender: 'director', text: 'Welcome to your private portal. All test results for the cement poured on Block A slab have been validated to M40 specification. Let me know if you have any questions.', time: '09:30 AM' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Send message simulation logic
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = { sender: 'client', text: inputText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate response
    setTimeout(() => {
      let responseText = "Thank you for the query. I am currently on the Block B inspection, but our foreman has confirmed that we are on schedule to complete the current column pouring by this Friday.";
      
      const queryLower = userMsg.text.toLowerCase();
      if (queryLower.includes('budget') || queryLower.includes('money') || queryLower.includes('cost')) {
        responseText = "Regarding finances: We are currently standing at 84% capital utilization (₹4.20 Cr spent out of ₹5.00 Cr budget). The remaining ₹80 Lakh is fully secured to cover the upcoming plastering milestones.";
      } else if (queryLower.includes('delay') || queryLower.includes('schedule') || queryLower.includes('date') || queryLower.includes('when')) {
        responseText = "Our current schedule shows we are running exactly 4 days ahead of our original baseline. Facade finishing remains planned for early November.";
      } else if (queryLower.includes('quality') || queryLower.includes('test') || queryLower.includes('cement')) {
        responseText = "All concrete mix cube test reports are documented in the private drive. The 28-day compressive strength exceeded 42.5 MPa, which exceeds the regulatory safety threshold.";
      }

      setMessages(prev => [...prev, {
        sender: 'director',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-gray-900 selection:bg-orange-500 selection:text-white">
      {/* Top Client Header */}
      <header className="sticky top-0 bg-white border-b border-gray-100 z-30 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Logo variant="full" height={36} />
            <div className="h-6 w-[1px] bg-gray-200 hidden sm:block" />
            <span className="bg-blue-50 text-blue-700 font-semibold px-2.5 py-0.5 rounded-full text-xs tracking-wide uppercase border border-blue-100 flex items-center gap-1.5 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              Private Client Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm border border-blue-200">
                C
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-semibold text-gray-800 leading-none">Global Builders Corp</span>
                <span className="text-[10px] text-gray-400 mt-0.5">Project Sponsor</span>
              </div>
            </div>

            <button 
              onClick={onLogout}
              className="px-3.5 py-1.5 text-xs text-gray-600 hover:text-red-600 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-100 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Report Dashboard */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-8">
        
        {/* Project Welcome Header */}
        <div className="bg-gradient-to-r from-gray-900 to-slate-800 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-md">
          {/* Subtle design accents */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial-gradient from-orange-500/10 to-transparent pointer-events-none" />
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl" />

          <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-col">
              <span className="text-orange-400 font-bold text-xs uppercase tracking-wider">Currently Monitoring</span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight mt-1.5">Skyline Heights Phase 1</h2>
              <p className="text-xs text-gray-400 mt-1">Superstructural premium residential tower | Plot 45B, Mumbai Sector 5</p>
            </div>
            
            <button className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white border border-white/10 rounded-xl text-xs font-bold flex items-center gap-2 transition-all duration-150 shadow-sm cursor-pointer">
              <ArrowDownToLine className="w-4 h-4" /> Export Financial Statement
            </button>
          </div>
        </div>

        {/* Financial Progress Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Metric 1: Budget Overview */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-bold tracking-wider uppercase">Capital Allotment</span>
              <DollarSign className="w-4 h-4 text-orange-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-gray-900">₹5.00 Crores</span>
              <span className="text-[10px] text-gray-400 font-medium mt-1">Guaranteed Fixed Contract cap</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-orange-500 rounded-full" style={{ width: '100%' }} />
            </div>
          </div>

          {/* Metric 2: Funds Disbursed */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-bold tracking-wider uppercase">Disbursed Funds</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-emerald-600">₹4.20 Crores</span>
              <span className="text-[10px] text-emerald-600 font-bold mt-1">84% capital utilized exactly</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '84%' }} />
            </div>
          </div>

          {/* Metric 3: Remaining Reserves */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-bold tracking-wider uppercase">Remaining reserves</span>
              <Clock className="w-4 h-4 text-blue-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-blue-600">₹80.00 Lakhs</span>
              <span className="text-[10px] text-gray-400 font-medium mt-1">Available for remaining plastering</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '16%' }} />
            </div>
          </div>

        </div>

        {/* Split Screen: Milestone Audit vs. Private Message Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Left Block: Milestone log (3 cols) */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm lg:col-span-3 flex flex-col gap-6">
            <div>
              <h3 className="text-sm font-bold text-gray-800">Audited Milestone Progress Breakdown</h3>
              <p className="text-[11px] text-gray-400 mt-1">Status of individual construction phases and disbursements</p>
            </div>

            {/* Milestones timeline */}
            <div className="flex flex-col gap-6 relative before:absolute before:left-3.5 before:top-4 before:bottom-4 before:w-[2px] before:bg-gray-100 pl-1">
              
              {/* MS 1 */}
              <div className="flex gap-4 relative">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs flex-shrink-0 z-10 border border-white">
                  ✓
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-xs font-bold text-gray-800">Milestone 1: Site Clearing & Excavation</span>
                    <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[9px] font-bold">100% DISBURSED</span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">Site leveled, foundations dug to 6.5 meters depth, rock clearing completed.</p>
                  <span className="text-[10px] font-bold text-gray-700 mt-1">Payout: ₹85.00 Lakhs</span>
                </div>
              </div>

              {/* MS 2 */}
              <div className="flex gap-4 relative">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs flex-shrink-0 z-10 border border-white">
                  ✓
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-xs font-bold text-gray-800">Milestone 2: Concrete Foundation Casting</span>
                    <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[9px] font-bold">100% DISBURSED</span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">Footings casted, primary steel grid reinforcements tied and inspected.</p>
                  <span className="text-[10px] font-bold text-gray-700 mt-1">Payout: ₹1.45 Crores</span>
                </div>
              </div>

              {/* MS 3 */}
              <div className="flex gap-4 relative">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs flex-shrink-0 z-10 border border-white">
                  ✓
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-xs font-bold text-gray-800">Milestone 3: Plinth Pillars & Ground Columns</span>
                    <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[9px] font-bold">100% DISBURSED</span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">32 structural plinth columns casted with premium Portland concrete.</p>
                  <span className="text-[10px] font-bold text-gray-700 mt-1">Payout: ₹1.10 Crores</span>
                </div>
              </div>

              {/* MS 4 */}
              <div className="flex gap-4 relative">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs flex-shrink-0 z-10 border border-white">
                  ✓
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-xs font-bold text-gray-800">Milestone 4: Block A 1st Floor Slab</span>
                    <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[9px] font-bold">100% DISBURSED</span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">De-shuttering finished. Compressive cement strength reports successfully verified.</p>
                  <span className="text-[10px] font-bold text-gray-700 mt-1">Payout: ₹80.00 Lakhs</span>
                </div>
              </div>

              {/* MS 5 */}
              <div className="flex gap-4 relative">
                <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs flex-shrink-0 z-10 border border-white">
                  ⚡
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-xs font-bold text-gray-800">Milestone 5: Masonry & Internal Piping</span>
                    <span className="bg-orange-50 text-orange-700 px-2 py-0.5 rounded text-[9px] font-bold">IN PROGRESS</span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">Brickwork laid up to 70% volume. Electrical piping and water feeds insertion currently active.</p>
                  <div className="flex items-center gap-3 mt-1 text-[10px]">
                    <span className="text-gray-700 font-bold">Disbursed: ₹35.00 Lakhs</span>
                    <span className="text-gray-400">|</span>
                    <span className="text-orange-500 font-bold">Retained: ₹15.00 Lakhs</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Block: Instant Message Panel (2 cols) */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm lg:col-span-2 flex flex-col gap-4 h-[500px]">
            <div className="flex items-center gap-3 border-b border-gray-50 pb-3">
              <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold border border-orange-200">
                AP
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-800">Amit Patel</span>
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Project Director (Online)
                </span>
              </div>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3.5 text-xs">
              {messages.map((m, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col max-w-[85%] ${
                    m.sender === 'client' ? 'self-end items-end' : 'self-start items-start'
                  }`}
                >
                  <div className={`p-3 rounded-2xl leading-relaxed shadow-xs ${
                    m.sender === 'client' 
                      ? 'bg-orange-500 text-white rounded-tr-none' 
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>
                  <span className="text-[9px] text-gray-400 mt-1 font-medium">{m.time}</span>
                </div>
              ))}

              {isTyping && (
                <div className="bg-gray-100 text-gray-400 px-3 py-2.5 rounded-2xl rounded-tl-none self-start flex items-center gap-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
            </div>

            {/* Direct message prompt suggestions */}
            <div className="flex flex-wrap gap-1 border-t border-gray-50 pt-2.5">
              <button 
                onClick={() => setInputText("Is the project budget on track?")}
                className="px-2 py-1 bg-gray-50 hover:bg-gray-100 text-[10px] text-gray-500 rounded-lg cursor-pointer transition-colors border border-gray-100"
              >
                Budget status?
              </button>
              <button 
                onClick={() => setInputText("What is the concrete quality status?")}
                className="px-2 py-1 bg-gray-50 hover:bg-gray-100 text-[10px] text-gray-500 rounded-lg cursor-pointer transition-colors border border-gray-100"
              >
                Quality tests?
              </button>
              <button 
                onClick={() => setInputText("Will we face any delays?")}
                className="px-2 py-1 bg-gray-50 hover:bg-gray-100 text-[10px] text-gray-500 rounded-lg cursor-pointer transition-colors border border-gray-100"
              >
                Delays/timeline?
              </button>
            </div>

            {/* Input form */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                placeholder="Ask Amit Patel a project query..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-gray-50 border border-gray-200 hover:border-gray-300 focus:border-orange-500 focus:outline-none rounded-xl px-3.5 py-2.5 text-xs transition-all"
              />
              <button
                type="submit"
                className="p-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-all shadow-md shadow-orange-500/10 flex items-center justify-center cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

      </main>
    </div>
  );
};
