import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  LogOut, 
  ChevronRight, 
  ShieldCheck,
  Globe,
  Calendar,
  Image as ImageIcon,
  MessageSquare
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        // Check if user is in 'admins' collection or is the super admin
        const adminDoc = await getDoc(doc(db, 'admins', user.uid));
        if (adminDoc.exists() || user.email === 'digitalmerch4862@gmail.com') {
          setIsAdmin(true);
        } else {
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-jly-blue flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-jly-red border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!isAdmin) return null;

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Hero Section', icon: Globe, path: '/admin/hero' },
    { name: 'Vision & Mission', icon: ShieldCheck, path: '/admin/vision' },
    { name: 'Events', icon: Calendar, path: '/admin/events' },
    { name: 'Leadership', icon: Users, path: '/admin/leadership' },
    { name: 'Gallery', icon: ImageIcon, path: '/admin/gallery' },
    { name: 'Admins', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-jly-blue text-white flex flex-col shadow-2xl z-20">
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-jly-red rounded-lg flex items-center justify-center">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <div>
              <h1 className="font-black text-xl tracking-tighter">JLYCC</h1>
              <p className="text-[10px] font-bold text-jly-red uppercase tracking-widest">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.name}
                to={item.path}
                className={`flex items-center justify-between p-4 rounded-xl transition-all group ${
                  isActive 
                    ? 'bg-jly-red text-white shadow-lg shadow-jly-red/20' 
                    : 'hover:bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-4">
                  <item.icon size={20} />
                  <span className="font-bold text-sm tracking-wide uppercase">{item.name}</span>
                </div>
                {isActive && <ChevronRight size={16} />}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <img 
              src={user?.photoURL || 'https://ui-avatars.com/api/?name=Admin'} 
              alt="Profile" 
              className="w-10 h-10 rounded-full border-2 border-jly-red"
            />
            <div className="overflow-hidden">
              <p className="font-bold text-sm truncate">{user?.displayName || 'Admin'}</p>
              <p className="text-[10px] text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-jly-red/20 hover:text-jly-red text-gray-400 py-3 rounded-lg font-bold text-xs uppercase tracking-widest transition-all"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
