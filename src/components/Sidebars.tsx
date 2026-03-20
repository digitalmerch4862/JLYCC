import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, Shield, User, LogOut } from 'lucide-react';

export const AdminSidebar = ({ logout }: { logout: () => void }) => (
  <nav className="flex-1 py-4">
    <ul className="space-y-1 px-3">
      <li><Link to="/dashboard" className="flex items-center px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface"><Home size={20} className="mr-3" />Dashboard</Link></li>
      <li><Link to="/crm" className="flex items-center px-3 py-2.5 rounded-lg text-accent font-medium bg-accent/20"><Users size={20} className="mr-3" />CRM (Admin)</Link></li>
      <li><Link to="/admin" className="flex items-center px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface"><Shield size={20} className="mr-3" />Admin Panel</Link></li>
    </ul>
    <button onClick={logout} className="flex items-center w-full px-6 py-4 text-sm text-red-500 hover:bg-red-900/20"><LogOut size={18} className="mr-3" />Sign Out</button>
  </nav>
);

export const InnerCoreSidebar = ({ logout }: { logout: () => void }) => (
  <nav className="flex-1 py-4">
    <ul className="space-y-1 px-3">
      <li><Link to="/dashboard" className="flex items-center px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface"><Home size={20} className="mr-3" />Dashboard</Link></li>
      <li><Link to="/crm" className="flex items-center px-3 py-2.5 rounded-lg text-accent font-medium bg-accent/20"><Users size={20} className="mr-3" />Inner Core CRM</Link></li>
    </ul>
    <button onClick={logout} className="flex items-center w-full px-6 py-4 text-sm text-red-500 hover:bg-red-900/20"><LogOut size={18} className="mr-3" />Sign Out</button>
  </nav>
);

export const JoshuaGenSidebar = ({ logout }: { logout: () => void }) => (
  <nav className="flex-1 py-4">
    <ul className="space-y-1 px-3">
      <li><Link to="/dashboard" className="flex items-center px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface"><Home size={20} className="mr-3" />Dashboard</Link></li>
      <li><Link to="/crm" className="flex items-center px-3 py-2.5 rounded-lg text-accent font-medium bg-accent/20"><Users size={20} className="mr-3" />Joshua Gen CRM</Link></li>
    </ul>
    <button onClick={logout} className="flex items-center w-full px-6 py-4 text-sm text-red-500 hover:bg-red-900/20"><LogOut size={18} className="mr-3" />Sign Out</button>
  </nav>
);

export const MemberSidebar = ({ logout }: { logout: () => void }) => (
  <nav className="flex-1 py-4">
    <ul className="space-y-1 px-3">
      <li><Link to="/dashboard" className="flex items-center px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface"><Home size={20} className="mr-3" />Dashboard</Link></li>
      <li><Link to="/crm" className="flex items-center px-3 py-2.5 rounded-lg text-accent font-medium bg-accent/20"><User size={20} className="mr-3" />My Profile</Link></li>
    </ul>
    <button onClick={logout} className="flex items-center w-full px-6 py-4 text-sm text-red-500 hover:bg-red-900/20"><LogOut size={18} className="mr-3" />Sign Out</button>
  </nav>
);
