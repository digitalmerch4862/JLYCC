import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Heart, LogIn } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    login(email);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/50 rounded-full flex items-center justify-center text-pink-600 dark:text-pink-400 shadow-sm">
            <Heart size={32} />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-stone-600 dark:text-stone-400">
          Or{' '}
          <Link to="/register" className="font-medium text-pink-600 hover:text-pink-500 dark:text-pink-400 dark:hover:text-pink-300 transition-colors">
            register as a new member
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-stone-800 py-8 px-4 shadow-sm sm:rounded-2xl sm:px-10 border border-stone-100 dark:border-stone-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-stone-300 dark:border-stone-600 rounded-lg shadow-sm placeholder-stone-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm bg-white dark:bg-stone-700 text-stone-900 dark:text-white transition-colors"
                  placeholder="admin@jlycc.org or member1@gmail.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-stone-300 dark:border-stone-600 rounded-lg shadow-sm placeholder-stone-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm bg-white dark:bg-stone-700 text-stone-900 dark:text-white transition-colors"
                  placeholder="Any password works for demo"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-stone-300 rounded dark:border-stone-600 dark:bg-stone-700"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-stone-900 dark:text-stone-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-pink-600 hover:text-pink-500 dark:text-pink-400 dark:hover:text-pink-300 transition-colors">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors"
              >
                <LogIn className="mr-2 h-5 w-5" />
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-300 dark:border-stone-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-stone-800 text-stone-500 dark:text-stone-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                className="w-full flex justify-center py-2.5 px-4 border border-stone-300 dark:border-stone-600 rounded-lg shadow-sm text-sm font-medium text-stone-700 dark:text-stone-200 bg-white dark:bg-stone-700 hover:bg-stone-50 dark:hover:bg-stone-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors"
              >
                <svg className="h-5 w-5 mr-2 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
                Continue with Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
