
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart, Line
} from 'recharts';
import { MOCK_KEBELES, MOCK_COMMENTS } from '../constants';

const CustomersView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Customers & Kebele Analytics</h1>
        <p className="text-gray-500 text-sm">Detailed breakdown of water distribution and service feedback across Arba Minch.</p>
      </header>

      {/* Kebele Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Kebele-wise Distribution & Consumption</h3>
            <div className="flex space-x-2">
               <span className="flex items-center text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                 <div className="w-2 h-2 bg-blue-600 rounded-full mr-1"></div> CUSTOMERS
               </span>
               <span className="flex items-center text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded">
                 <div className="w-2 h-2 bg-amber-600 rounded-full mr-1"></div> CONSUMPTION (m³)
               </span>
            </div>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={MOCK_KEBELES}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} orientation="left" stroke="#3B82F6" />
                <YAxis yAxisId="right" axisLine={false} tickLine={false} orientation="right" stroke="#F59E0B" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="customers" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Total Customers" />
                <Line yAxisId="right" type="monotone" dataKey="consumption" stroke="#F59E0B" strokeWidth={3} name="Total Consumption (m³)" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
           <h3 className="text-lg font-bold text-gray-900 mb-6">Kebele Rankings</h3>
           <div className="space-y-4">
             {[...MOCK_KEBELES].sort((a, b) => b.customers - a.customers).map((kebele, idx) => (
               <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                 <div className="flex items-center space-x-3">
                   <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                     {idx + 1}
                   </div>
                   <div>
                     <p className="text-sm font-bold text-gray-900">{kebele.name}</p>
                     <p className="text-[10px] text-gray-500 uppercase">{kebele.consumption.toLocaleString()} m³ Consumed</p>
                   </div>
                 </div>
                 <div className="text-right">
                   <p className="text-sm font-bold text-blue-600">{kebele.customers.toLocaleString()}</p>
                   <p className="text-[10px] text-gray-400">CUSTOMERS</p>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>

      {/* Customer Comments Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Service Feedback & Comments</h3>
            <p className="text-xs text-gray-500">Recent submissions from the customer portal</p>
          </div>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-200">
            EXPORT FEEDBACK
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_COMMENTS.map((comment) => (
              <div key={comment.id} className="p-4 border border-gray-100 rounded-2xl hover:border-blue-200 transition-colors bg-white shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                      {comment.customerName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{comment.customerName}</h4>
                      <p className="text-[10px] text-blue-600 font-semibold">{comment.kebele}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${
                    comment.priority === 'high' ? 'bg-red-100 text-red-600' : 
                    comment.priority === 'medium' ? 'bg-amber-100 text-amber-600' : 
                    'bg-green-100 text-green-600'
                  }`}>
                    {comment.priority} priority
                  </span>
                </div>
                <p className="text-sm text-gray-600 italic mb-3">"{comment.comment}"</p>
                <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                  <span className="text-[10px] text-gray-400 font-medium">{comment.date}</span>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 text-xs font-bold hover:underline">Reply</button>
                    <button className="text-gray-400 text-xs font-bold hover:text-gray-600">Archive</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersView;
