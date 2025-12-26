
import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  icon: string;
  iconBg: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, trend, trendUp, icon, iconBg }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        {trend && (
          <div className="flex items-center mt-2">
            <span className={`text-xs font-semibold ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
              <i className={`fas ${trendUp ? 'fa-arrow-up' : 'fa-arrow-down'} mr-1`}></i>
              {trend}
            </span>
            <span className="text-xs text-gray-400 ml-1">since last month</span>
          </div>
        )}
      </div>
      <div className={`${iconBg} w-12 h-12 rounded-xl flex items-center justify-center text-white`}>
        <i className={`fas ${icon} text-lg`}></i>
      </div>
    </div>
  );
};

export default StatCard;
