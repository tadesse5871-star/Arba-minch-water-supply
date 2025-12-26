
import React, { useState, useMemo } from 'react';
import { MOCK_DETAILED_BILLS, FISCAL_YEARS, MONTHS } from '../constants';

const BillingView: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [selectedMonth, setSelectedMonth] = useState<string>('January');

  const filteredBills = useMemo(() => {
    return MOCK_DETAILED_BILLS.filter(
      bill => bill.year === selectedYear && bill.month === selectedMonth
    );
  }, [selectedYear, selectedMonth]);

  const totalGenerated = useMemo(() => {
    return filteredBills.reduce((acc, curr) => acc + curr.amount, 0);
  }, [filteredBills]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing Records</h1>
          <p className="text-gray-500 text-sm">Review and manage generated bills for each fiscal period.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1">Fiscal Year</label>
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[120px]"
            >
              {FISCAL_YEARS.map(year => (
                <option key={year} value={year}>{year} E.C.</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1">Month</label>
            <select 
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[150px]"
            >
              {MONTHS.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col self-end">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 shadow-sm transition-all h-[38px]">
              <i className="fas fa-print mr-2"></i> Bulk Print
            </button>
          </div>
        </div>
      </header>

      {/* Summary Cards for Selected Month */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Total Generated (Period)</p>
          <h3 className="text-2xl font-bold text-gray-900">{totalGenerated.toLocaleString()} <span className="text-xs font-normal text-gray-400">ETB</span></h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Total Consumers Billed</p>
          <h3 className="text-2xl font-bold text-gray-900">{filteredBills.length} <span className="text-xs font-normal text-gray-400">Records</span></h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Collection Progress</p>
          <div className="flex items-center space-x-3 mt-1">
             <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full w-[65%]"></div>
             </div>
             <span className="text-sm font-bold text-gray-700">65%</span>
          </div>
        </div>
      </div>

      {/* Billing Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Detailed Billing List: {selectedMonth} {selectedYear}</h3>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">{filteredBills.length} Results Found</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          {filteredBills.length > 0 ? (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Customer Info</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Kebele</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Readings (Prev/Curr)</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Consumption</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total (ETB)</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredBills.map((bill) => (
                  <tr key={bill.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-bold text-gray-900">{bill.customerName}</p>
                        <p className="text-[10px] text-gray-500">{bill.accountId}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-gray-700">{bill.kebele}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs text-gray-600">
                        <span className="text-gray-400">{bill.prevReading}</span>
                        <i className="fas fa-long-arrow-alt-right mx-2 text-gray-300"></i>
                        <span className="font-bold">{bill.currReading}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-blue-600">{bill.totalConsumption} m³</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-black text-gray-900">{bill.amount.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${
                        bill.status === 'Paid' ? 'bg-green-100 text-green-700' : 
                        bill.status === 'Overdue' ? 'bg-red-100 text-red-700' : 
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {bill.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3 text-gray-400">
                        <button className="hover:text-blue-600 transition-colors" title="View Receipt">
                          <i className="fas fa-file-alt"></i>
                        </button>
                        <button className="hover:text-amber-600 transition-colors" title="Edit Record">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="hover:text-gray-600 transition-colors">
                          <i className="fas fa-ellipsis-v"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-20 flex flex-col items-center justify-center">
               <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-folder-open text-gray-200 text-2xl"></i>
               </div>
               <p className="text-gray-500 font-medium">No billing records found for this period.</p>
               <p className="text-xs text-gray-400">Please select a different year or month.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillingView;
