import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc, query, limit } from 'firebase/firestore';
import { db } from '../../firebase';
import { motion, AnimatePresence } from 'motion/react';
import { Users, UserPlus, Trash2, Shield, Mail, CheckCircle2, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Admin {
  id: string;
  email: string;
  permissions: string[];
}

const SECTIONS = ['Hero', 'Vision', 'Events', 'Leadership', 'Gallery'];

export default function Admins() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEmail, setNewEmail] = useState('');
  const [newPermissions, setNewPermissions] = useState<string[]>(SECTIONS);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const q = query(collection(db, 'admins'), limit(10));
      const querySnapshot = await getDocs(q);
      const adminList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Admin[];
      setAdmins(adminList);
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (admins.length >= 10) {
      setErrorMessage('Maximum limit of 10 admins reached.');
      setStatus('error');
      return;
    }
    setSaving(true);
    setStatus('idle');
    try {
      // Use a simple ID or the email as ID
      const adminId = newEmail.replace(/[^a-zA-Z0-9]/g, '_');
      await setDoc(doc(db, 'admins', adminId), {
        email: newEmail,
        permissions: newPermissions
      });
      setNewEmail('');
      setNewPermissions(SECTIONS);
      setStatus('success');
      fetchAdmins();
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err: any) {
      setErrorMessage(err.message);
      setStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAdmin = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this admin?')) {
      try {
        await deleteDoc(doc(db, 'admins', id));
        fetchAdmins();
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  const togglePermission = (section: string) => {
    setNewPermissions(prev => 
      prev.includes(section) 
        ? prev.filter(p => p !== section) 
        : [...prev, section]
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="text-jly-red animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl space-y-12">
      <div className="flex items-center gap-4 mb-12">
        <Link 
          to="/admin"
          className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 hover:text-jly-blue hover:shadow-md transition-all"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-4xl font-black text-jly-blue tracking-tighter uppercase">ADMIN MANAGEMENT</h1>
          <p className="text-gray-500 mt-1 font-medium">Manage authorized personnel and their permissions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Add Admin Form */}
        <div className="lg:col-span-1">
          <form onSubmit={handleAddAdmin} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6 sticky top-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-jly-red/10 rounded-xl flex items-center justify-center text-jly-red">
                <UserPlus size={20} />
              </div>
              <h2 className="text-xl font-black text-jly-blue tracking-tight">ADD NEW ADMIN</h2>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-jly-blue uppercase tracking-widest">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email" 
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-jly-red focus:border-transparent outline-none transition-all text-sm font-medium"
                  placeholder="admin@jlycc.org"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-jly-blue uppercase tracking-widest">Permissions</label>
              <div className="grid grid-cols-1 gap-2">
                {SECTIONS.map(section => (
                  <label key={section} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-all">
                    <input 
                      type="checkbox" 
                      checked={newPermissions.includes(section)}
                      onChange={() => togglePermission(section)}
                      className="w-4 h-4 text-jly-red rounded border-gray-300 focus:ring-jly-red"
                    />
                    <span className="text-sm font-bold text-jly-blue uppercase tracking-wider">{section}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full flex items-center justify-center gap-3 bg-jly-blue text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-jly-blue/90 transition-all shadow-lg shadow-jly-blue/20 disabled:opacity-50"
            >
              {saving ? <Loader2 className="animate-spin" size={20} /> : <UserPlus size={20} />}
              {saving ? 'Adding...' : 'Add Admin'}
            </button>

            <AnimatePresence>
              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-green-600 font-bold text-xs justify-center"
                >
                  <CheckCircle2 size={14} />
                  Admin added successfully!
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-red-600 font-bold text-xs justify-center"
                >
                  <AlertCircle size={14} />
                  {errorMessage}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* Admin List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-black text-jly-blue tracking-tight uppercase">AUTHORIZED PERSONNEL ({admins.length}/10)</h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {admins.map((admin) => (
              <motion.div
                key={admin.id}
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-jly-blue group-hover:bg-jly-blue group-hover:text-white transition-all">
                    <Shield size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-jly-blue text-lg tracking-tight">{admin.email}</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {admin.permissions.map(p => (
                        <span key={p} className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full uppercase tracking-widest">{p}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {admin.email !== 'digitalmerch4862@gmail.com' && (
                  <button 
                    onClick={() => handleDeleteAdmin(admin.id)}
                    className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </motion.div>
            ))}

            {admins.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                <Users className="mx-auto text-gray-200 mb-4" size={48} />
                <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No additional admins found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
