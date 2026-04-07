import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Radio, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';
import { isLiveNow } from '../utils/liveStatus';
import { useContent } from '../hooks/useContent';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [isLive, setIsLive] = useState(false);

  const { content } = useContent('header', {
    logoUrl: 'https://scontent.fmnl30-1.fna.fbcdn.net/v/t39.30808-1/453783636_924875829678893_8484670298322969456_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=102&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=X-St79JfrFYQ7kNvwG3fXIP&_nc_oc=Adrz6NiXqrPvkHuLXp8NUlTnnbnC5H8ztOKfrXS0A4CJ3hzl95fj4p0IrzcH9GTWb64&_nc_zt=24&_nc_ht=scontent.fmnl30-1.fna&_nc_gid=cTbEn_ZsfHdBUlzMKXZbJQ&_nc_ss=7a3a8&oh=00_AfwR_AMyMCMIEF801PMjcRSaiSImgFbORNBSFihJ4NGAlQ&oe=69D15C14',
    churchName: 'JESUS LOVES YOU',
    tagline: 'City Church',
    liveMessage: 'Live Now: Sunday Service is Ongoing!',
    youtubeUrl: 'https://www.youtube.com/@jlymicentral233'
  });

  useEffect(() => {
    // Check live status on mount and every minute
    const checkLive = () => setIsLive(isLiveNow());
    checkLive();
    const interval = setInterval(checkLive, 60000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Vision', href: '#vision' },
    { name: 'Events', href: '#events' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Leadership', href: '#leadership' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed w-full z-50 bg-jly-blue/95 backdrop-blur-sm border-b border-white/10">
      <AnimatePresence>
        {isLive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-jly-red overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center gap-3">
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-2 h-2 bg-white rounded-full"
                aria-hidden="true"
              />
              <span className="text-white text-[10px] sm:text-xs font-black tracking-widest uppercase flex items-center gap-2">
                <Radio size={14} className="animate-pulse" aria-hidden="true" />
                {content.liveMessage}
              </span>
              <a 
                href={content.youtubeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-4 bg-white text-jly-red px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-colors"
              >
                Watch Live
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-shrink-0 flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative flex items-center gap-3">
              {!logoError ? (
                <img 
                  src={content.logoUrl} 
                  alt="JLYCC Logo" 
                  className="w-10 h-10 object-contain"
                  onError={() => setLogoError(true)}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-10 h-10 bg-jly-red rounded-full flex items-center justify-center shadow-lg shadow-jly-red/20">
                  <span className="text-white font-heading font-bold text-lg">JLY</span>
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-white font-heading font-bold text-lg leading-none tracking-tight uppercase">{content.churchName}</span>
                <span className="text-white/90 text-[10px] font-bold tracking-[0.2em] uppercase mt-0.5">{content.tagline}</span>
              </div>
            </div>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ y: -2, color: '#ffffff' }}
                className="text-gray-300 text-sm font-medium uppercase tracking-wider transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-jly-red transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-6">
            <motion.a
              href={content.donateButtonLink || "#donate"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white hover:text-jly-red font-heading font-bold text-sm tracking-wider transition-colors uppercase"
            >
              {content.donateButtonText || "Donate"}
            </motion.a>
            <motion.a
              href={content.connectButtonLink || "#contact"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-jly-red hover:bg-jly-red-dark text-white px-6 py-2.5 rounded font-heading font-bold text-sm tracking-wider transition-colors shadow-lg shadow-jly-red/20 uppercase"
            >
              {content.connectButtonText || "Connect"}
            </motion.a>
            <motion.a
              href="/login"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white/30 hover:text-jly-red transition-colors"
              title="Admin Portal"
            >
              <Shield size={18} />
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none relative w-8 h-8 flex items-center justify-center"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={28} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={28} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-jly-blue z-[70] md:hidden shadow-2xl flex flex-col p-8"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="flex flex-col">
                  <span className="text-white font-heading font-bold text-lg leading-none tracking-tight">JLYCC</span>
                  <span className="text-jly-red text-[10px] font-bold tracking-widest uppercase mt-1">Menu</span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X size={32} aria-hidden="true" />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    className="text-2xl font-black text-white hover:text-jly-red transition-colors uppercase tracking-tighter"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto pt-12 border-t border-white/10 flex flex-col gap-4">
                <motion.a
                  href="#donate"
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="w-full text-center bg-transparent border-2 border-white text-white px-6 py-4 rounded-xl font-heading font-bold text-sm tracking-widest transition-colors uppercase"
                >
                  Donate
                </motion.a>
                <motion.a
                  href={content.connectButtonLink || "#contact"}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="w-full text-center bg-jly-red hover:bg-jly-red-dark text-white px-6 py-4 rounded-xl font-heading font-bold text-sm tracking-widest transition-colors shadow-lg shadow-jly-red/20 uppercase"
                >
                  {content.connectButtonText || "Connect Now"}
                </motion.a>
                <motion.a
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center justify-center gap-2 text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest pt-4"
                >
                  <Shield size={14} />
                  Admin Portal
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
