export interface Site {
  id: string;
  name: string;
  location: string;
  totalBudget: number;
  spentAmount: number;
  status: 'Active' | 'Completed' | 'Paused';
  manager: string;
}

export interface Expense {
  id: string;
  siteId: string;
  siteName: string;
  category: string;
  amount: number;
  description: string;
  date: string;
}

export interface Laborer {
  id: string;
  name: string;
  role: string;
  wagePerDay: number;
  attendanceStatus: 'present' | 'absent' | 'unmarked';
  contact: string;
}

export interface User {
  email: string;
  role: 'admin' | 'client';
  name: string;
}
