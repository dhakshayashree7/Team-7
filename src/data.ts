import { Site, Expense, Laborer } from './types';

export const INITIAL_SITES: Site[] = [
  { id: '1', name: 'Skyline Heights Phase 1', location: 'Mumbai Sector 5', totalBudget: 50000000, spentAmount: 42000000, status: 'Active', manager: 'Ramesh Sharma' },
  { id: '2', name: 'Metro Plaza Mall', location: 'Delhi NCR', totalBudget: 35000000, spentAmount: 28500000, status: 'Active', manager: 'Vikram Singh' },
  { id: '3', name: 'Ganga Meadows Apartments', location: 'Noida Extension', totalBudget: 15000000, spentAmount: 14200000, status: 'Active', manager: 'Amit Patel' },
  { id: '4', name: 'Narmada Overpass', location: 'Gujarat Highway', totalBudget: 25000000, spentAmount: 18000000, status: 'Active', manager: 'Ketan Vyas' },
  { id: '5', name: 'Western Express Flyover', location: 'Mumbai West', totalBudget: 40000000, spentAmount: 11200000, status: 'Active', manager: 'Ramesh Sharma' },
  { id: '6', name: 'Oceanic Breeze Villas', location: 'Goa Coast', totalBudget: 18000000, spentAmount: 10400000, status: 'Active', manager: 'Carlos D’Souza' },
  { id: '7', name: 'Tech Park Tower C', location: 'Bangalore Electronic City', totalBudget: 60000000, spentAmount: 51200000, status: 'Active', manager: 'Nitin Kumar' },
  { id: '8', name: 'Valley View Township', location: 'Pune Hills', totalBudget: 22000000, spentAmount: 19500000, status: 'Active', manager: 'Sanjay Joshi' },
  { id: '9', name: 'Greenwood Smart School', location: 'Hyderabad Gachibowli', totalBudget: 12000000, spentAmount: 9800000, status: 'Active', manager: 'M. S. Prasad' },
  { id: '10', name: 'Royal Palace Convention', location: 'Jaipur Road', totalBudget: 20000000, spentAmount: 16500000, status: 'Active', manager: 'Rajesh Gehlot' },
  { id: '11', name: 'Riverfront Walkway', location: 'Ahmedabad Sabarmati', totalBudget: 10000000, spentAmount: 8900000, status: 'Active', manager: 'Ketan Vyas' },
  { id: '12', name: 'Apollo Hospital Wing B', location: 'Chennai OMR', totalBudget: 45000000, spentAmount: 38000000, status: 'Active', manager: 'S. Ramakrishnan' },
  { id: '13', name: 'Golden Tulip Residency', location: 'Amritsar bypass', totalBudget: 14000000, spentAmount: 11000000, status: 'Active', manager: 'Gurpreet Singh' },
  { id: '14', name: 'Orchid Business Hub', location: 'Kolkata Salt Lake', totalBudget: 28000000, spentAmount: 22500000, status: 'Active', manager: 'Aritra Sen' },
  { id: '15', name: 'Metro Line 3 Station B', location: 'Mumbai Metro Corp', totalBudget: 55000000, spentAmount: 49000000, status: 'Active', manager: 'Rahul Verma' },
  { id: '16', name: 'Alpine View Resort', location: 'Manali Heights', totalBudget: 16000000, spentAmount: 13800000, status: 'Active', manager: 'Devendra Negi' },
  { id: '17', name: 'Smart City Water Plant', location: 'Indore Bypass', totalBudget: 24000000, spentAmount: 19200000, status: 'Active', manager: 'Anil Chouhan' },
  { id: '18', name: 'Silver Oak IT Enclave', location: 'Chandigarh IT Park', totalBudget: 32000000, spentAmount: 27800000, status: 'Active', manager: 'Manpreet Singh' }
];

export const INITIAL_EXPENSES: Expense[] = [
  { id: 'e1', siteId: '1', siteName: 'Skyline Heights Phase 1', category: 'Materials - Cement', amount: 450000, description: '500 Bags of OPC Grade Cement delivery', date: '2026-06-20' },
  { id: 'e2', siteId: '1', siteName: 'Skyline Heights Phase 1', category: 'Labour Wages', amount: 180000, description: 'Weekly wages for skilled masons', date: '2026-06-22' },
  { id: 'e3', siteId: '2', siteName: 'Metro Plaza Mall', category: 'Materials - Steel', amount: 1200000, description: '15 Tons structural steel reinforcement bars', date: '2026-06-18' },
  { id: 'e4', siteId: '3', siteName: 'Ganga Meadows Apartments', category: 'Equipment Rental', amount: 350000, description: 'Monthly lease for Tower Crane 2', date: '2026-06-15' },
  { id: 'e5', siteId: '5', siteName: 'Western Express Flyover', category: 'Permits & Approvals', amount: 150000, description: 'Local municipal environmental clearance fee', date: '2026-06-23' },
  { id: 'e6', siteId: '7', siteName: 'Tech Park Tower C', category: 'Materials - Ready Mix', amount: 850000, description: 'Concrete transit mixers pour for 4th floor slab', date: '2026-06-21' },
  { id: 'e7', siteId: '2', siteName: 'Metro Plaza Mall', category: 'Labour Wages', amount: 240000, description: 'Daily worker wages and safety equipment incentives', date: '2026-06-23' },
  { id: 'e8', siteId: '12', siteName: 'Apollo Hospital Wing B', category: 'Utility & Electrical', amount: 550000, description: 'Heavy duty sub-station wiring & high tension cables', date: '2026-06-19' },
  { id: 'e9', siteId: '15', siteName: 'Metro Line 3 Station B', category: 'Safety & Excavation', amount: 620000, description: 'Trench shoring and safety barricading structures', date: '2026-06-22' }
];

export const INITIAL_LABORERS: Laborer[] = [
  { id: 'l1', name: 'Rajesh K. Yadav', role: 'Head Mason', wagePerDay: 850, attendanceStatus: 'present', contact: '+91 98765 43210' },
  { id: 'l2', name: 'Manpreet Singh', role: 'Steel Fabricator', wagePerDay: 800, attendanceStatus: 'present', contact: '+91 91234 56789' },
  { id: 'l3', name: 'Dilip Kumar Shaw', role: 'Concrete Mixer Operator', wagePerDay: 750, attendanceStatus: 'present', contact: '+91 93456 78901' },
  { id: 'l4', name: 'Sohan Murmu', role: 'Helper Carpenter', wagePerDay: 500, attendanceStatus: 'present', contact: '+91 90123 45678' },
  { id: 'l5', name: 'Babulal Marandi', role: 'Excavator Operator', wagePerDay: 900, attendanceStatus: 'present', contact: '+91 92345 67890' },
  { id: 'l6', name: 'Anwar Qureshi', role: 'Welder (Grade A)', wagePerDay: 850, attendanceStatus: 'absent', contact: '+91 94567 89012' },
  { id: 'l7', name: 'Vikram Oraon', role: 'Scaffolding Specialist', wagePerDay: 650, attendanceStatus: 'present', contact: '+91 95678 90123' },
  { id: 'l8', name: 'Raju Paswan', role: 'General Helper', wagePerDay: 450, attendanceStatus: 'present', contact: '+91 96789 01234' },
  { id: 'l9', name: 'Subodh Mahato', role: 'Electrician Assistant', wagePerDay: 600, attendanceStatus: 'unmarked', contact: '+91 97890 12345' },
  { id: 'l10', name: 'Gopal Sahu', role: 'Plumber', wagePerDay: 700, attendanceStatus: 'present', contact: '+91 98901 23456' }
];

export const EXPENSE_CATEGORIES = [
  'Materials - Cement',
  'Materials - Steel',
  'Materials - Ready Mix',
  'Labour Wages',
  'Equipment Rental',
  'Permits & Approvals',
  'Utility & Electrical',
  'Safety & Excavation',
  'Other Site Expenses'
];
