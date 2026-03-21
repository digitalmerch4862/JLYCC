import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Map, Facebook, Youtube, Video, Download } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const Home = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text-primary font-sans flex flex-col">
      <header className="bg-surface shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/logo.png" alt="JLYCC Logo" className="mr-2 h-8 w-8 object-contain" />
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <ThemeToggle />
            <Link to="/login" className="text-text-secondary hover:text-accent font-medium px-3 py-2 transition-colors">Login</Link>
            <Link to="/register" className="bg-accent hover:bg-pink-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">Join Us</Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row h-screen bg-bg">
          <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
            <div className="text-center lg:text-left max-w-2xl">
              <h1 className="text-4xl tracking-tight font-extrabold text-text-primary sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Welcome to</span>{' '}
                <span className="block text-accent xl:inline">JLYCC</span>
              </h1>
              <p className="mt-3 text-base text-text-secondary sm:mt-5 sm:text-lg md:text-xl">
                Find where you belong, grow with us, and take your next step in your spiritual journey. Jesus Loves You Celebration Church is a family waiting for you.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-3">
                <div className="rounded-md shadow">
                  <Link to="/register" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-accent hover:bg-pink-700 md:py-4 md:text-lg md:px-10 transition-colors">
                    Get Started
                  </Link>
                </div>
                <div>
                  <Link to="/login" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-accent bg-accent/20 hover:bg-accent/30 md:py-4 md:text-lg md:px-10 transition-colors">
                    Member Login
                  </Link>
                </div>
                {deferredPrompt && (
                  <div>
                    <button 
                      onClick={handleInstall}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-stone-700 hover:bg-stone-600 md:py-4 md:text-lg md:px-10 transition-colors"
                    >
                      <Download size={20} className="mr-2" />
                      Add to Home Screen
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex-1 bg-black overflow-hidden relative">
            <iframe 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%]"
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

      <footer className="bg-surface border-t border-surface py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <img src="/logo.png" alt="JLYCC Logo" className="mr-2 h-6 w-6 object-contain" />
            <span className="text-lg font-bold tracking-tight text-text-primary">JLYCC</span>
          </div>
          
          <div className="flex space-x-6">
            <a href="https://www.facebook.com/jlycc.main" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors">
              <span className="sr-only">Facebook</span>
              <Facebook size={24} />
            </a>
            <a href="https://www.youtube.com/@jlymicentral233" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors">
              <span className="sr-only">YouTube</span>
              <Youtube size={24} />
            </a>
            <a href="https://www.tiktok.com/@bishop_rpb?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors">
              <span className="sr-only">TikTok</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
          </div>
          
          <div className="mt-4 md:mt-0 text-sm text-text-secondary">
            &copy; {new Date().getFullYear()} Jesus Loves You Celebration Church. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
