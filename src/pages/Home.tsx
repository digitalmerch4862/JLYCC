import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Map, Facebook, Youtube, Video } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const Home = () => {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-sans flex flex-col">
      <header className="bg-white dark:bg-stone-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Heart className="text-pink-600 dark:text-pink-400 mr-2" size={28} />
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <ThemeToggle />
            <Link to="/login" className="text-stone-600 dark:text-stone-300 hover:text-pink-600 dark:hover:text-pink-400 font-medium px-3 py-2 transition-colors">Login</Link>
            <Link to="/register" className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">Join Us</Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative bg-white dark:bg-stone-800 overflow-hidden border-b border-stone-200 dark:border-stone-700">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-white dark:bg-stone-800 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-10 sm:pt-16 lg:pt-20 px-4 sm:px-6 lg:px-8">
              <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-stone-900 dark:text-white sm:text-5xl md:text-6xl">
                    <span className="block xl:inline">Welcome to</span>{' '}
                    <span className="block text-pink-600 dark:text-pink-400 xl:inline">JLYCC</span>
                  </h1>
                  <p className="mt-3 text-base text-stone-500 dark:text-stone-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Find where you belong, grow with us, and take your next step in your spiritual journey. Jesus Loves You Celebration Church is a family waiting for you.
                  </p>
                  <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-3">
                    <div className="rounded-md shadow w-full sm:w-auto">
                      <Link to="/register" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-pink-600 hover:bg-pink-700 md:py-4 md:text-lg md:px-10 transition-colors">
                        Get Started
                      </Link>
                    </div>
                    <div className="w-full sm:w-auto">
                      <Link to="/login" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-pink-700 bg-pink-100 hover:bg-pink-200 dark:bg-stone-700 dark:text-pink-300 dark:hover:bg-stone-600 md:py-4 md:text-lg md:px-10 transition-colors">
                        Member Login
                      </Link>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-black">
            <iframe 
              className="w-full h-full min-h-[300px] sm:min-h-[400px] lg:min-h-full"
              src="https://www.youtube.com/embed/GiURvSANcmw?autoplay=1&mute=1&start=65" 
              title="JLYCC Live Stream" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </main>

      <footer className="bg-white dark:bg-stone-800 border-t border-stone-200 dark:border-stone-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Heart className="text-pink-600 dark:text-pink-400 mr-2" size={20} />
            <span className="text-lg font-bold tracking-tight text-stone-800 dark:text-stone-200">JLYCC</span>
          </div>
          
          <div className="flex space-x-6">
            <a href="https://www.facebook.com/jlycc.main" target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-pink-600 dark:text-stone-400 dark:hover:text-pink-400 transition-colors">
              <span className="sr-only">Facebook</span>
              <Facebook size={24} />
            </a>
            <a href="https://www.youtube.com/@jlymicentral233" target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-pink-600 dark:text-stone-400 dark:hover:text-pink-400 transition-colors">
              <span className="sr-only">YouTube</span>
              <Youtube size={24} />
            </a>
            <a href="https://www.tiktok.com/@bishop_rpb?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-pink-600 dark:text-stone-400 dark:hover:text-pink-400 transition-colors">
              <span className="sr-only">TikTok</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
          </div>
          
          <div className="mt-4 md:mt-0 text-sm text-stone-500 dark:text-stone-400">
            &copy; {new Date().getFullYear()} Jesus Loves You Celebration Church. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
