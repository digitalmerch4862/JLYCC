import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, Shield, User, LogOut, Calendar, BookOpen, Heart, GraduationCap, CheckSquare } from 'lucide-react';

export const AdminSidebar = ({ logout, onClose }: { logout: () => void, onClose: () => void }) => (
  <nav className="flex-1 py-4">
    <ul className="space-y-1 px-3">
      <li><Link to="/dashboard" onClick={onClose} className="flex items-center px-3 py-2.5 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]"><Home size={20} className="mr-3" />Dashboard</Link></li>
      <li><Link to="/crm" onClick={onClose} className="flex items-center px-3 py-2.5 rounded-lg text-[var(--color-accent)] font-medium bg-[var(--color-accent)]/20"><Users size={20} className="mr-3" />CRM (Admin)</Link></li>
      <li><Link to="/admin" onClick={onClose} className="flex items-center px-3 py-2.5 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]"><Shield size={20} className="mr-3" />Admin Panel</Link></li>
    </ul>
    <button onClick={() => { logout(); onClose(); }} className="flex items-center w-full px-6 py-4 text-sm text-red-500 hover:bg-red-900/20"><LogOut size={18} className="mr-3" />Sign Out</button>
  </nav>
);

export const InnerCoreSidebar = ({ logout, onClose }: { logout: () => void, onClose: () => void }) => (
  <nav className="flex-1 py-4">
    <ul className="space-y-1 px-3">
      <li><Link to="/dashboard" onClick={onClose} className="flex items-center px-3 py-2.5 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]"><Home size={20} className="mr-3" />Dashboard</Link></li>
      <li><Link to="/crm" onClick={onClose} className="flex items-center px-3 py-2.5 rounded-lg text-[var(--color-accent)] font-medium bg-[var(--color-accent)]/20"><Users size={20} className="mr-3" />Inner Core CRM</Link></li>
    </ul>
    <button onClick={() => { logout(); onClose(); }} className="flex items-center w-full px-6 py-4 text-sm text-red-500 hover:bg-red-900/20"><LogOut size={18} className="mr-3" />Sign Out</button>
  </nav>
);

export const JoshuaGenSidebar = ({ logout, onClose }: { logout: () => void, onClose: () => void }) => (
  <nav className="flex-1 py-4">
    <ul className="space-y-1 px-3">
      <li><Link to="/dashboard" onClick={onClose} className="flex items-center px-3 py-2.5 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]"><Home size={20} className="mr-3" />Dashboard</Link></li>
      <li><Link to="/crm" onClick={onClose} className="flex items-center px-3 py-2.5 rounded-lg text-[var(--color-accent)] font-medium bg-[var(--color-accent)]/20"><Users size={20} className="mr-3" />Joshua Gen CRM</Link></li>
    </ul>
    <button onClick={() => { logout(); onClose(); }} className="flex items-center w-full px-6 py-4 text-sm text-red-500 hover:bg-red-900/20"><LogOut size={18} className="mr-3" />Sign Out</button>
  </nav>
);

export const MemberSidebar = ({ logout, onClose }: { logout: () => void, onClose: () => void }) => (
  <nav className="flex-1 py-4">
    <ul className="space-y-1 px-3">
      <li><Link to="/dashboard" onClick={onClose} className="flex items-center px-3 py-2.5 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]"><Home size={20} className="mr-3" />Dashboard</Link></li>
      <li><Link to="/profile" onClick={onClose} className="flex items-center px-3 py-2.5 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]"><User size={20} className="mr-3" />Profile</Link></li>
      <li><Link to="/qr" onClick={onClose} className="flex items-center px-3 py-2.5 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]"><User size={20} className="mr-3" />QR ID</Link></li>
      <li><Link to="/journey" onClick={onClose} className="flex items-center px-3 py-2.5 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]"><BookOpen size={20} className="mr-3" />Journey</Link></li>
      <li><Link to="/ministries" onClick={onClose} className="flex items-center px-3 py-2.5 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]"><Users size={20} className="mr-3" />Ministries</Link></li>
      <li><Link to="/heartlink" onClick={onClose} className="flex items-center px-3 py-2.5 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]"><Heart size={20} className="mr-3" />HeartLink</Link></li>
      <li><Link to="/isu" onClick={onClose} className="flex items-center px-3 py-2.5 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]"><GraduationCap size={20} className="mr-3" />ISU</Link></li>
      <li><Link to="/attendance" onClick={onClose} className="flex items-center px-3 py-2.5 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]"><CheckSquare size={20} className="mr-3" />Attendance</Link></li>
      <li><Link to="/events" onClick={onClose} className="flex items-center px-3 py-2.5 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]"><Calendar size={20} className="mr-3" />Events</Link></li>
      <li><Link to="/crm" onClick={onClose} className="flex items-center px-3 py-2.5 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]"><Users size={20} className="mr-3" />CRM</Link></li>
    </ul>
    <button onClick={() => { logout(); onClose(); }} className="flex items-center w-full px-6 py-4 text-sm text-red-500 hover:bg-red-900/20"><LogOut size={18} className="mr-3" />Sign Out</button>
  </nav>
);
