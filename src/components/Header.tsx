import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Vision', href: '#vision' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Leadership', href: '#leadership' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed w-full z-50 bg-jly-blue/95 backdrop-blur-sm border-b border-white/10">
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
                  src="/logo.png" 
                  alt="JLYCC Logo" 
                  className="w-10 h-10 object-contain"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="w-10 h-10 bg-jly-red rounded-full flex items-center justify-center shadow-lg shadow-jly-red/20">
                  <span className="text-white font-heading font-bold text-lg">JLY</span>
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-white font-heading font-bold text-lg leading-none tracking-tight">JESUS LOVES YOU</span>
                <span className="text-white/90 text-[10px] font-bold tracking-[0.2em] uppercase mt-0.5">Celebration Church</span>
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
              href="#donate"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white hover:text-jly-red font-heading font-bold text-sm tracking-wider transition-colors uppercase"
            >
              Donate
            </motion.a>
            <motion.a
              href="#apply"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-jly-red hover:bg-jly-red-dark text-white px-6 py-2.5 rounded font-heading font-bold text-sm tracking-wider transition-colors shadow-lg shadow-jly-red/20"
            >
              Connect
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none relative w-8 h-8 flex items-center justify-center"
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

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-jly-blue border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  className="block px-3 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md uppercase tracking-wider"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4 flex flex-col gap-3"
              >
                <a
                  href="#donate"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-transparent border border-white text-white px-6 py-3 rounded font-heading font-bold text-sm tracking-wider transition-colors"
                >
                  Donate
                </a>
                <a
                  href="#apply"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-jly-red hover:bg-jly-red-dark text-white px-6 py-3 rounded font-heading font-bold text-sm tracking-wider transition-colors shadow-lg shadow-jly-red/20"
                >
                  Connect
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
