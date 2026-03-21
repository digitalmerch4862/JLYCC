import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { AdminSidebar, InnerCoreSidebar, JoshuaGenSidebar, MemberSidebar } from '../components/Sidebars';
import ThemeToggle from '../components/ThemeToggle';
import { Menu, X } from 'lucide-react';

const MainLayout = () => {
  const { currentUser, logout } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderSidebar = () => {
    const onClose = () => setIsMobileMenuOpen(false);
    switch (currentUser?.role) {
      case 'Admin': return <AdminSidebar logout={logout} onClose={onClose} />;
      case 'Inner Core': return <InnerCoreSidebar logout={logout} onClose={onClose} />;
      case 'Joshua Gen': return <JoshuaGenSidebar logout={logout} onClose={onClose} />;
      default: return <MemberSidebar logout={logout} onClose={onClose} />;
    }
  };

  return (
    <div className="flex h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)] font-sans">
      {/* Mobile Menu Button - Floating */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="p-3 bg-[var(--color-surface)] text-[var(--color-text-primary)] rounded-full shadow-lg border border-[var(--color-surface)]"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-[var(--color-surface)] shadow-lg transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-[var(--color-surface)]">
            <h1 className="text-xl font-bold text-[var(--color-accent)] truncate">HI, {currentUser?.email.split('@')[0]}</h1>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">{currentUser?.role}</p>
          </div>
          {renderSidebar()}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[var(--color-bg)] p-4 md:p-8 pt-16 md:pt-8">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
