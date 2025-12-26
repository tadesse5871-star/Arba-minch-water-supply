
import React from 'react';
import { ViewType } from '../types';

interface SidebarItemProps {
  icon: string;
  label: string;
  active: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${active ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-blue-50 text-gray-600'}`}
  >
    <i className={`fas ${icon} w-5`}></i>
    <span className="font-medium text-sm">{label}</span>
  </div>
);

interface SidebarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col p-4 fixed left-0 top-0 hidden md:flex z-50">
      <div className="flex items-center space-x-3 mb-10 px-2 cursor-pointer" onClick={() => onViewChange('dashboard')}>
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
          <i className="fas fa-faucet text-white text-xl"></i>
        </div>
        <div>
          <h1 className="text-sm font-bold text-gray-900 leading-tight">Arba Minch Water</h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Service Enterprise</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        <SidebarItem 
          icon="fa-th-large" 
          label="Dashboard" 
          active={activeView === 'dashboard'} 
          onClick={() => onViewChange('dashboard')} 
        />
        <SidebarItem 
          icon="fa-users" 
          label="Customers & Kebeles" 
          active={activeView === 'customers'} 
          onClick={() => onViewChange('customers')} 
        />
        <SidebarItem 
          icon="fa-file-invoice-dollar" 
          label="Billing Records" 
          active={activeView === 'billing'} 
          onClick={() => onViewChange('billing')} 
        />
        <SidebarItem 
          icon="fa-wallet" 
          label="Budget & Finance" 
          active={activeView === 'budget'} 
          onClick={() => onViewChange('budget')} 
        />
        <SidebarItem icon="fa-chart-line" label="Analytical Reports" active={false} onClick={() => {}} />
        <SidebarItem icon="fa-cog" label="System Settings" active={false} onClick={() => {}} />
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-100">
        <div className="p-4 bg-blue-50 rounded-xl">
          <p className="text-xs font-semibold text-blue-800 mb-1">Need help?</p>
          <p className="text-[10px] text-blue-600 mb-3">Contact Enterprise IT Support for assistance.</p>
          <button className="w-full py-2 bg-blue-600 text-white text-[10px] font-bold rounded-lg hover:bg-blue-700">
            GET SUPPORT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
