
import React, { useState, useEffect } from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import CustomersView from './views/CustomersView';
import BillingView from './views/BillingView';
import { MOCK_CUSTOMERS, MOCK_BILLING, MOCK_BUDGET, DASHBOARD_STATS } from './constants';
import { getDashboardInsights } from './services/geminiService';
import { ViewType } from './types';

const DashboardView: React.FC<{ loadingInsights: boolean, insights: string | null }> = ({ loadingInsights, insights }) => (
  <div className="animate-in fade-in duration-500">
    {/* Stats Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard 
        label="Total Customers" 
        value={DASHBOARD_STATS.totalCustomers.toLocaleString()} 
        trend="12%" 
        trendUp={true}
        icon="fa-users"
        iconBg="bg-blue-500"
      />
      <StatCard 
        label="Total Revenue" 
        value={`${DASHBOARD_STATS.totalRevenue.toLocaleString()} ETB`} 
        trend="8.5%" 
        trendUp={true}
        icon="fa-hand-holding-dollar"
        iconBg="bg-emerald-500"
      />
      <StatCard 
        label="Pending Bills" 
        value={`${DASHBOARD_STATS.pendingBilling.toLocaleString()} ETB`} 
        trend="2.4%" 
        trendUp={false}
        icon="fa-clock"
        iconBg="bg-amber-500"
      />
      <StatCard 
        label="Water Output" 
        value={DASHBOARD_STATS.waterOutput} 
        icon="fa-tint"
        iconBg="bg-cyan-500"
      />
    </div>

    {/* Charts Row */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* Customer Pie Chart */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Customer Distribution</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={MOCK_CUSTOMERS}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="count"
                nameKey="status"
              >
                {MOCK_CUSTOMERS.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Billing Bar Chart */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Billing Performance (Last 6 Months)</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOCK_BILLING}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `${val/1000}k`} />
              <Tooltip />
              <Legend />
              <Bar dataKey="generated" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Generated" />
              <Bar dataKey="sold" fill="#10B981" radius={[4, 4, 0, 0]} name="Sold" />
              <Bar dataKey="unsold" fill="#F43F5E" radius={[4, 4, 0, 0]} name="Unsold" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

    {/* Budget Section */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Budget Allocation & Usage</h3>
          <span className="text-xs text-blue-600 font-bold px-2 py-1 bg-blue-50 rounded">FISCAL YEAR 2024</span>
        </div>
        <div className="space-y-6">
          {MOCK_BUDGET.map((item, idx) => {
            const percent = Math.round((item.used / item.allocated) * 100);
            return (
              <div key={idx}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">{item.category}</span>
                  <span className="text-sm font-bold text-gray-900">{item.used.toLocaleString()} / {item.allocated.toLocaleString()} ETB</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-1000 ${percent > 90 ? 'bg-red-500' : percent > 70 ? 'bg-amber-500' : 'bg-blue-600'}`} 
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
                <div className="flex justify-end mt-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">{percent}% UTILIZED</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Insights Sidebar */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl text-white shadow-xl flex flex-col">
        <div className="flex items-center space-x-2 mb-4">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
            <i className="fas fa-brain"></i>
          </div>
          <h3 className="text-lg font-bold">AI Performance Insight</h3>
        </div>
        
        <div className="flex-1 overflow-y-auto max-h-[400px]">
          {loadingInsights ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4 py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <p className="text-sm text-blue-10 font-medium text-center">Analyzing enterprise data for insights...</p>
            </div>
          ) : (
            <div className="text-sm leading-relaxed space-y-4 text-blue-50">
               {insights ? (
                 <div dangerouslySetInnerHTML={{ __html: insights.replace(/\n/g, '<br/>') }} />
               ) : "No insights available."}
            </div>
          )}
        </div>

        <button className="mt-6 w-full py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors text-sm">
          <i className="fas fa-redo-alt mr-2"></i> Refresh Analysis
        </button>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [insights, setInsights] = useState<string | null>(null);
  const [loadingInsights, setLoadingInsights] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoadingInsights(true);
      const res = await getDashboardInsights({
        customers: MOCK_CUSTOMERS,
        billing: MOCK_BILLING,
        budget: MOCK_BUDGET
      });
      setInsights(res || "Failed to generate insights.");
      setLoadingInsights(false);
    };
    fetchInsights();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <main className="md:ml-64 p-4 md:p-8">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
          <div>
            <div className="flex items-center space-x-2 mb-1">
               <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">Enterprise ERP</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
               {activeView === 'dashboard' ? 'General Performance' : 
                activeView === 'customers' ? 'Customer Relations' : 
                activeView === 'billing' ? 'Financial Operations' : 'System Overview'}
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64 bg-white"
              />
              <i className="fas fa-search absolute left-3 top-2.5 text-gray-400"></i>
            </div>
            <button className="bg-white border border-gray-200 text-gray-600 w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
              <i className="fas fa-bell"></i>
            </button>
          </div>
        </header>

        {/* View Switcher Content */}
        {activeView === 'dashboard' ? (
          <DashboardView loadingInsights={loadingInsights} insights={insights} />
        ) : activeView === 'customers' ? (
          <CustomersView />
        ) : activeView === 'billing' ? (
          <BillingView />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
            <i className="fas fa-hammer text-4xl text-gray-300 mb-4"></i>
            <h2 className="text-xl font-bold text-gray-900">Module Under Construction</h2>
            <p className="text-gray-500">The {activeView} module is currently being optimized for better performance.</p>
            <button 
              onClick={() => setActiveView('dashboard')}
              className="mt-6 text-blue-600 font-bold hover:underline"
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
