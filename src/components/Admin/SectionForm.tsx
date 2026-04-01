import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { motion } from 'motion/react';
import { Save, AlertCircle, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Field {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'url';
  placeholder?: string;
}

interface SectionFormProps {
  sectionId: string;
  title: string;
  description: string;
  fields: Field[];
}

export default function SectionForm({ sectionId, title, description, fields }: SectionFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'website_content', sectionId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data() as Record<string, string>);
        } else {
          // Initialize with empty strings for all fields
          const initialData = fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {});
          setFormData(initialData);
        }
      } catch (err: any) {
        setErrorMessage(err.message);
        setStatus('error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [sectionId, fields]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus('idle');
    try {
      await setDoc(doc(db, 'website_content', sectionId), formData);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err: any) {
      setErrorMessage(err.message);
      setStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="text-jly-red animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex items-center gap-4 mb-12">
        <Link 
          to="/admin"
          className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 hover:text-jly-blue hover:shadow-md transition-all"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-4xl font-black text-jly-blue tracking-tighter uppercase">{title}</h1>
          <p className="text-gray-500 mt-1 font-medium">{description}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 space-y-8">
        <div className="grid grid-cols-1 gap-8">
          {fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <label className="block text-xs font-bold text-jly-blue uppercase tracking-widest">{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-jly-red focus:border-transparent outline-none transition-all min-h-[120px] text-sm font-medium"
                />
              ) : (
                <input
                  type={field.type === 'url' ? 'url' : 'text'}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-jly-red focus:border-transparent outline-none transition-all text-sm font-medium"
                />
              )}
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-green-600 font-bold text-sm"
              >
                <CheckCircle2 size={18} />
                Changes saved successfully!
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-red-600 font-bold text-sm"
              >
                <AlertCircle size={18} />
                {errorMessage}
              </motion.div>
            )}
          </div>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-3 bg-jly-blue text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-jly-blue/90 transition-all shadow-lg shadow-jly-blue/20 disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
