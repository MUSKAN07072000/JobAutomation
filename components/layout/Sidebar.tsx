
import React from 'react';
import { View } from '../../types';
import { DashboardIcon, BriefcaseIcon, ListIcon, SettingsIcon, BotIcon } from '../icons/Icons';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: View;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-150 ${
      isActive
        ? 'text-white bg-blue-600'
        : 'text-gray-400 hover:text-white hover:bg-gray-700'
    }`}
  >
    {icon}
    <span className="ml-4">{label}</span>
  </button>
);

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const navItems = [
    { view: View.Dashboard, icon: <DashboardIcon />, label: 'Dashboard' },
    { view: View.Jobs, icon: <BriefcaseIcon />, label: 'Jobs' },
    { view: View.Tracker, icon: <ListIcon />, label: 'Tracker' },
    { view: View.Settings, icon: <SettingsIcon />, label: 'Settings' },
  ];

  return (
    <div className="flex flex-col w-64 bg-gray-800 text-white">
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-700">
        <BotIcon className="w-8 h-8 text-blue-400" />
        <span className="ml-2 text-lg font-bold">Job Agent</span>
      </div>
      <nav className="flex-1 py-4">
        {navItems.map(item => (
          <NavItem
            key={item.view}
            icon={item.icon}
            label={item.view}
            isActive={activeView === item.view}
            onClick={() => setActiveView(item.view)}
          />
        ))}
      </nav>
    </div>
  );
};
