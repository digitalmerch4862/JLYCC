import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { motion } from 'motion/react';
import { Save, AlertCircle, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Field {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'url' | 'number';
  placeholder?: string;
}

interface SectionFormProps {
  sectionId: string;
  title: string;
  description: string;
  fields: Field[];
  PreviewComponent?: React.ComponentType<{ previewData?: any }>;
}

export default function SectionForm({ sectionId, title, description, fields, PreviewComponent }: SectionFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'website_content', sectionId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data() as Record<string, any>);
        } else {
          // Initialize with empty values for all fields
          const initialData = fields.reduce((acc, field) => ({ 
            ...acc, 
            [field.name]: field.type === 'number' ? 0 : '' 
          }), {});
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

  const handleChange = (name: string, value: any, type: string) => {
    const finalValue = type === 'number' ? Number(value) : value;
    setFormData(prev => ({ ...prev, [name]: finalValue }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="text-jly-red animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl space-y-8">
      <div className="flex items-center justify-between gap-4 mb-12">
        <div className="flex items-center gap-4">
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

        {PreviewComponent && (
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all ${
              showPreview 
                ? 'bg-jly-red text-white shadow-lg shadow-jly-red/20' 
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
            }`}
          >
            {showPreview ? 'Hide Preview' : 'Show Live Preview'}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 space-y-8">
          <div className="grid grid-cols-1 gap-8">
            {fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <label className="block text-xs font-bold text-jly-blue uppercase tracking-widest">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value, field.type)}
                    placeholder={field.placeholder}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-jly-red focus:border-transparent outline-none transition-all min-h-[120px] text-sm font-medium"
                  />
                ) : (
                  <input
                    type={field.type === 'url' ? 'url' : field.type === 'number' ? 'number' : 'text'}
                    value={formData[field.name] ?? ''}
                    onChange={(e) => handleChange(field.name, e.target.value, field.type)}
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

        {showPreview && PreviewComponent && (
          <div className="sticky top-8 space-y-4">
            <div className="flex items-center justify-between px-4">
              <h3 className="text-sm font-bold text-jly-blue uppercase tracking-widest">Live Preview</h3>
              <span className="text-[10px] bg-green-100 text-green-600 px-2 py-1 rounded-full font-black uppercase">Real-time</span>
            </div>
            <div className="rounded-3xl overflow-hidden border-4 border-jly-blue/5 shadow-2xl scale-90 origin-top">
              <PreviewComponent previewData={formData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
