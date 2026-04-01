import React, { useState } from 'react';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { motion } from 'motion/react';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user.email === 'digitalmerch4862@gmail.com') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      console.error("Google Auth Error:", err);
      if (err.code === 'auth/unauthorized-domain') {
        setError('This domain is not authorized in your Firebase Console. Please add "' + window.location.hostname + '" to the Authorized Domains list in Authentication > Settings.');
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('Google Sign-In is not enabled in your Firebase Console.');
      } else if (err.code === 'auth/popup-blocked') {
        setError('The login popup was blocked by your browser. Please allow popups for this site.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (result.user.email === 'digitalmerch4862@gmail.com') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      console.error("Email Auth Error:", err);
      if (err.code === 'auth/unauthorized-domain') {
        setError('This domain is not authorized in your Firebase Console. Please add "' + window.location.hostname + '" to the Authorized Domains list in Authentication > Settings.');
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('Email/Password authentication is not enabled in your Firebase Console.');
      } else if (err.code === 'auth/invalid-credential') {
        setError('Invalid email or password. Please check your credentials.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-jly-blue flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-jly-red rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-black text-jly-blue">JLYCC App</h1>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="text-red-500" size={20} />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-jly-blue uppercase tracking-widest mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-jly-red focus:border-transparent outline-none transition-all"
                placeholder="juandelacruz@gmail.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-jly-blue uppercase tracking-widest mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-jly-red focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-jly-blue text-white py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-jly-blue/90 transition-all disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Login with Email'}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500 uppercase tracking-widest">Or continue with</span>
          </div>
        </div>

        <button 
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-100 py-4 rounded-lg font-bold text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-50"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
          Login with Google
        </button>
      </motion.div>
    </div>
  );
}
