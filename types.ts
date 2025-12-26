
export interface CustomerData {
  status: string;
  count: number;
  color: string;
}

export interface BillingData {
  month: string;
  generated: number;
  sold: number;
  unsold: number;
}

export interface BudgetData {
  category: string;
  allocated: number;
  used: number;
}

export interface KebeleData {
  name: string;
  customers: number;
  consumption: number; // in Cubic Meters
}

export interface CustomerComment {
  id: string;
  customerName: string;
  kebele: string;
  comment: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
}

export interface DetailedBill {
  id: string;
  customerName: string;
  accountId: string;
  kebele: string;
  year: number;
  month: string;
  prevReading: number;
  currReading: number;
  totalConsumption: number;
  amount: number;
  status: 'Paid' | 'Unpaid' | 'Overdue';
}

export type ViewType = 'dashboard' | 'customers' | 'billing' | 'budget';
