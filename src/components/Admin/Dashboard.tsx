import { motion } from 'motion/react';
import { Globe, ShieldCheck, Calendar, Users, Image as ImageIcon, LayoutDashboard, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const stats = [
    { name: 'Header', icon: Globe, path: '/admin/header', color: 'bg-indigo-500' },
    { name: 'Hero Section', icon: Globe, path: '/admin/hero', color: 'bg-blue-500' },
    { name: 'About Section', icon: ShieldCheck, path: '/admin/about', color: 'bg-cyan-500' },
    { name: 'Vision & Mission', icon: ShieldCheck, path: '/admin/vision', color: 'bg-purple-500' },
    { name: 'Why Us', icon: ShieldCheck, path: '/admin/why-us', color: 'bg-emerald-500' },
    { name: 'Events', icon: Calendar, path: '/admin/events', color: 'bg-orange-500' },
    { name: 'Leadership', icon: Users, path: '/admin/leadership', color: 'bg-green-500' },
    { name: 'Gallery', icon: ImageIcon, path: '/admin/gallery', color: 'bg-pink-500' },
    { name: 'Testimonials', icon: Users, path: '/admin/testimonials', color: 'bg-yellow-500' },
    { name: 'Support', icon: ShieldCheck, path: '/admin/support', color: 'bg-teal-500' },
    { name: 'Contact', icon: Globe, path: '/admin/contact', color: 'bg-slate-500' },
    { name: 'CTA Section', icon: Globe, path: '/admin/cta', color: 'bg-rose-500' },
    { name: 'Footer', icon: Globe, path: '/admin/footer', color: 'bg-gray-500' },
    { name: 'Admins', icon: LayoutDashboard, path: '/admin/settings', color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-jly-blue tracking-tighter">DASHBOARD</h1>
          <p className="text-gray-500 mt-2 font-medium">Welcome back, Admin. Manage your website content here.</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">System Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-bold text-jly-blue">Operational</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 group relative overflow-hidden"
          >
            <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-${stat.color.split('-')[1]}-500/20`}>
              <stat.icon className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-black text-jly-blue mb-2 tracking-tight">{stat.name}</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">Update and manage the {stat.name.toLowerCase()} content in real-time.</p>
            <Link 
              to={stat.path}
              className="flex items-center gap-2 text-sm font-bold text-jly-red uppercase tracking-widest group-hover:gap-4 transition-all"
            >
              Manage Section
              <ArrowUpRight size={16} />
            </Link>
            
            {/* Decorative background icon */}
            <stat.icon className="absolute -bottom-6 -right-6 text-gray-50 opacity-[0.03] group-hover:opacity-[0.05] transition-all" size={160} />
          </motion.div>
        ))}
      </div>

      <div className="bg-jly-blue rounded-3xl p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-black mb-4 tracking-tight leading-tight">REAL-TIME CONTENT MANAGEMENT</h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            All changes made in this dashboard are instantly reflected on the live website. 
            No deployment needed. Use the forms to update text, images, and links.
          </p>
          <div className="flex gap-4">
            <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10">
              <p className="text-[10px] font-bold text-jly-red uppercase tracking-widest mb-1">Last Update</p>
              <p className="text-sm font-bold">Just now</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10">
              <p className="text-[10px] font-bold text-jly-red uppercase tracking-widest mb-1">Active Admins</p>
              <p className="text-sm font-bold">1 Online</p>
            </div>
          </div>
        </div>
        
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-jly-red/20 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-jly-red rounded-full blur-[120px] opacity-20 pointer-events-none" />
      </div>
    </div>
  );
}
