import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { 
  Home, User, QrCode, Map, Users, Heart, BookOpen, 
  CalendarCheck, Shield, LogOut, Menu, X, Calendar 
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const MainLayout = () => {
  const { currentUser, logout } = useAppContext();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home, roles: ['All'] },
    { name: 'News and Events', path: '/events', icon: Calendar, roles: ['All'] },
    { name: 'My Profile', path: '/profile', icon: User, roles: ['All'] },
    { name: 'Check-In', path: '/qr', icon: QrCode, roles: ['All'] },
    { name: 'My Journey', path: '/journey', icon: Map, roles: ['All'] },
    { name: 'Ministries', path: '/ministries', icon: Users, roles: ['All'] },
    { name: 'HeartLink', path: '/heartlink', icon: Heart, roles: ['All'] },
    { name: 'ISU', path: '/isu', icon: BookOpen, roles: ['All'] },
    { name: 'My Analytics', path: '/attendance', icon: CalendarCheck, roles: ['All'] },
    { name: 'Admin Panel', path: '/admin', icon: Shield, roles: ['Admin', 'Pastor', 'Inner Core'] },
  ];

  const filteredNav = navItems.filter(item => 
    item.roles.includes('All') || (currentUser && item.roles.includes(currentUser.role))
  );

  return (
    <div className="flex h-screen bg-bg text-text-primary font-sans">
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50 flex items-center gap-2">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-surface rounded-md shadow-md"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="md:hidden fixed top-4 right-4 z-50">
        <div className="bg-surface rounded-md shadow-md">
          <ThemeToggle />
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-64 bg-surface shadow-lg transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-surface flex justify-between items-center gap-2">
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-accent tracking-tight truncate">HI, {currentUser?.email.split('@')[0]}</h1>
              <p className="text-xs text-text-secondary mt-1 truncate">Jesus Loves You Celebration Church</p>
            </div>
            <div className="hidden md:block shrink-0">
              <ThemeToggle />
            </div>
          </div>
          
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {filteredNav.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center px-3 py-2.5 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-accent/20 text-accent font-medium' 
                          : 'text-text-secondary hover:bg-surface'
                      }`}
                    >
                      <Icon size={20} className="mr-3" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-4 border-t border-surface">
            <div className="flex items-center mb-4 px-2">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold mr-3">
                {currentUser?.email.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium truncate">{currentUser?.email}</p>
                <p className="text-xs text-text-secondary truncate">{currentUser?.role}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center w-full px-3 py-2 text-sm text-red-500 hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <LogOut size={18} className="mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-bg p-4 md:p-8 pt-16 md:pt-8">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
