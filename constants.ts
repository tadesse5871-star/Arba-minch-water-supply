
import { CustomerData, BillingData, BudgetData, KebeleData, CustomerComment, DetailedBill } from './types';

export const MOCK_CUSTOMERS: CustomerData[] = [
  { status: 'Active', count: 12500, color: '#3B82F6' },
  { status: 'Disconnected', count: 1200, color: '#F59E0B' },
  { status: 'Terminated', count: 450, color: '#EF4444' },
];

export const MOCK_BILLING: BillingData[] = [
  { month: 'Jan', generated: 450000, sold: 410000, unsold: 40000 },
  { month: 'Feb', generated: 480000, sold: 420000, unsold: 60000 },
  { month: 'Mar', generated: 510000, sold: 485000, unsold: 25000 },
  { month: 'Apr', generated: 490000, sold: 460000, unsold: 30000 },
  { month: 'May', generated: 530000, sold: 500000, unsold: 30000 },
  { month: 'Jun', generated: 550000, sold: 510000, unsold: 40000 },
];

export const MOCK_BUDGET: BudgetData[] = [
  { category: 'Infrastructure Development', allocated: 5000000, used: 3250000 },
  { category: 'Maintenance & Repairs', allocated: 2000000, used: 1100000 },
  { category: 'Salaries & Admin', allocated: 3500000, used: 2800000 },
  { category: 'Water Treatment Chemicals', allocated: 1500000, used: 1200000 },
];

export const MOCK_KEBELES: KebeleData[] = [
  { name: 'Sikela', customers: 4200, consumption: 15600 },
  { name: 'Secha', customers: 3800, consumption: 14200 },
  { name: 'Kebele 01', customers: 2100, consumption: 8900 },
  { name: 'Kebele 02', customers: 2500, consumption: 9500 },
  { name: 'Bere', customers: 1550, consumption: 4300 },
];

export const MOCK_COMMENTS: CustomerComment[] = [
  { id: '1', customerName: 'Zeleke Ayalew', kebele: 'Sikela', comment: 'Low water pressure during morning hours.', date: 'Oct 25, 2023', priority: 'medium' },
  { id: '2', customerName: 'Sara Mohammed', kebele: 'Secha', comment: 'Pipe leakage reported near block 12.', date: 'Oct 24, 2023', priority: 'high' },
  { id: '3', customerName: 'Tewodros Kassahun', kebele: 'Kebele 01', comment: 'Billing statement not received this month.', date: 'Oct 23, 2023', priority: 'low' },
  { id: '4', customerName: 'Hiwot Tadesse', kebele: 'Kebele 02', comment: 'The new digital payment system is very efficient. Thank you!', date: 'Oct 22, 2023', priority: 'low' },
];

export const MOCK_DETAILED_BILLS: DetailedBill[] = [
  { id: 'B1', customerName: 'Kassa Tekle', accountId: 'AM-4421', kebele: 'Sikela', year: 2024, month: 'January', prevReading: 1250, currReading: 1285, totalConsumption: 35, amount: 450, status: 'Paid' },
  { id: 'B2', customerName: 'Abebe Bikila', accountId: 'AM-8812', kebele: 'Secha', year: 2024, month: 'January', prevReading: 980, currReading: 1040, totalConsumption: 60, amount: 1200, status: 'Unpaid' },
  { id: 'B3', customerName: 'Tadesse Mesfin', accountId: 'AM-3109', kebele: 'Kebele 01', year: 2024, month: 'January', prevReading: 2100, currReading: 2145, totalConsumption: 45, amount: 890, status: 'Overdue' },
  { id: 'B4', customerName: 'Martha Hailu', accountId: 'AM-5567', kebele: 'Kebele 02', year: 2024, month: 'January', prevReading: 540, currReading: 562, totalConsumption: 22, amount: 320, status: 'Paid' },
  { id: 'B5', customerName: 'Zewdu Kebede', accountId: 'AM-1290', kebele: 'Bere', year: 2024, month: 'January', prevReading: 890, currReading: 925, totalConsumption: 35, amount: 650, status: 'Paid' },
  { id: 'B6', customerName: 'Solomon Desta', accountId: 'AM-2231', kebele: 'Sikela', year: 2024, month: 'February', prevReading: 1285, currReading: 1320, totalConsumption: 35, amount: 450, status: 'Paid' },
  { id: 'B7', customerName: 'Etenesh Walelign', accountId: 'AM-7741', kebele: 'Secha', year: 2024, month: 'February', prevReading: 1040, currReading: 1110, totalConsumption: 70, amount: 1450, status: 'Unpaid' },
  { id: 'B8', customerName: 'Kebede Mamo', accountId: 'AM-9901', kebele: 'Kebele 01', year: 2023, month: 'December', prevReading: 1950, currReading: 2000, totalConsumption: 50, amount: 950, status: 'Paid' },
];

export const FISCAL_YEARS = [2024, 2023, 2022];
export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const DASHBOARD_STATS = {
  totalCustomers: 14150,
  activePercentage: 88,
  totalRevenue: 2825000, // In ETB (Birr)
  pendingBilling: 225000,
  waterOutput: '1.2M Liters/Day'
};
