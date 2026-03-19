import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Shield, Users, Map, Heart, BookOpen, CalendarCheck, Activity, UserPlus, QrCode, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const { users, profiles, ministries, heartLinks, events, attendance } = useAppContext();
  const navigate = useNavigate();

  const totalMembers = profiles.length;
  const newMembers = profiles.filter(p => p.currentChurchStatus === 'Visitor' || p.currentChurchStatus === 'New Member').length;
  const activeMinistries = ministries.filter(m => m.active).length;
  const activeHeartLinks = heartLinks.filter(h => h.active).length;

  const data = [
    { name: 'Week 1', attendance: 400 },
    { name: 'Week 2', attendance: 300 },
    { name: 'Week 3', attendance: 500 },
    { name: 'Week 4', attendance: 450 },
  ];

  return (
    <div className="max-w-7xl mx-auto font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900 dark:text-white tracking-tight flex items-center">
          <Shield className="mr-3 text-pink-600 dark:text-pink-400" size={32} />
          Admin Dashboard
        </h1>
        <p className="mt-2 text-stone-500 dark:text-stone-400">
          Overview of church health, attendance, and member journey.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-stone-800 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-700 flex items-center">
          <div className="p-3 rounded-xl bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 mr-4">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-stone-500 dark:text-stone-400">Total Profiles</p>
            <p className="text-2xl font-bold text-stone-900 dark:text-white tracking-tight">{totalMembers}</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-stone-800 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-700 flex items-center">
          <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 mr-4">
            <UserPlus size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-stone-500 dark:text-stone-400">Newcomers</p>
            <p className="text-2xl font-bold text-stone-900 dark:text-white tracking-tight">{newMembers}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-stone-800 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-700 flex items-center">
          <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-4">
            <Map size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-stone-500 dark:text-stone-400">Ministries</p>
            <p className="text-2xl font-bold text-stone-900 dark:text-white tracking-tight">{activeMinistries}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-stone-800 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-700 flex items-center">
          <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 mr-4">
            <Heart size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-stone-500 dark:text-stone-400">HeartLink Groups</p>
            <p className="text-2xl font-bold text-stone-900 dark:text-white tracking-tight">{activeHeartLinks}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="bg-white dark:bg-stone-800 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-700 lg:col-span-2">
          <h3 className="text-lg font-semibold text-stone-900 dark:text-white mb-6 flex items-center">
            <Activity className="mr-2 text-pink-500" size={20} />
            Sunday Attendance Trend
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e4" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#78716c' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#78716c' }} />
                <Tooltip 
                  cursor={{ fill: '#f5f5f4' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Bar dataKey="attendance" fill="#db2777" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Items */}
        <div className="bg-white dark:bg-stone-800 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-700">
          <h3 className="text-lg font-semibold text-stone-900 dark:text-white mb-6 flex items-center">
            <CalendarCheck className="mr-2 text-pink-500" size={20} />
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-700/50 border border-stone-100 dark:border-stone-600 hover:border-pink-300 dark:hover:border-pink-700 transition-colors flex items-center justify-between group">
              <span className="text-sm font-medium text-stone-900 dark:text-white">Scan QR for Attendance</span>
              <QrCode className="h-5 w-5 text-stone-400 group-hover:text-pink-500 transition-colors" />
            </button>
            <button 
              onClick={() => navigate('/admin/attendance')}
              className="w-full text-left px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-700/50 border border-stone-100 dark:border-stone-600 hover:border-pink-300 dark:hover:border-pink-700 transition-colors flex items-center justify-between group"
            >
              <span className="text-sm font-medium text-stone-900 dark:text-white">Facial Attendance Scanner</span>
              <Camera className="h-5 w-5 text-stone-400 group-hover:text-pink-500 transition-colors" />
            </button>
            <button 
              onClick={() => navigate('/admin/crm')}
              className="w-full text-left px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-700/50 border border-stone-100 dark:border-stone-600 hover:border-pink-300 dark:hover:border-pink-700 transition-colors flex items-center justify-between group"
            >
              <span className="text-sm font-medium text-stone-900 dark:text-white">Manage Members (CRM)</span>
              <Users className="h-5 w-5 text-stone-400 group-hover:text-pink-500 transition-colors" />
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-700/50 border border-stone-100 dark:border-stone-600 hover:border-pink-300 dark:hover:border-pink-700 transition-colors flex items-center justify-between group">
              <span className="text-sm font-medium text-stone-900 dark:text-white">Assign HeartLink Groups</span>
              <Heart className="h-5 w-5 text-stone-400 group-hover:text-pink-500 transition-colors" />
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-700/50 border border-stone-100 dark:border-stone-600 hover:border-pink-300 dark:hover:border-pink-700 transition-colors flex items-center justify-between group">
              <span className="text-sm font-medium text-stone-900 dark:text-white">Track ISU Progress</span>
              <BookOpen className="h-5 w-5 text-stone-400 group-hover:text-pink-500 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
