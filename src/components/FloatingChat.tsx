import { motion } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [showInitial, setShowInitial] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setShowInitial(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  // Hide on admin and login pages
  if (location.pathname.startsWith('/admin') || location.pathname === '/login') {
    return null;
  }

  return (
    <div className="fixed top-8 right-8 z-50 flex flex-col items-end gap-4">
      {/* Initial Greeting Bubble */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 20, scale: 0.8 }}
          animate={{ 
            opacity: showInitial ? 1 : 0, 
            x: showInitial ? 0 : 20,
            scale: showInitial ? 1 : 0.8,
            pointerEvents: showInitial ? 'auto' : 'none'
          }}
          className="bg-jly-blue text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold whitespace-nowrap mb-2 relative"
        >
          How can we help?
          <div className="absolute -bottom-1 right-6 w-2 h-2 bg-jly-blue rotate-45" />
        </motion.div>
      )}

      {/* Tooltip/Message */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ 
          opacity: isOpen ? 1 : 0, 
          y: isOpen ? 0 : 20,
          scale: isOpen ? 1 : 0.8,
          pointerEvents: isOpen ? 'auto' : 'none'
        }}
        transition={{ 
          type: 'spring',
          stiffness: 260,
          damping: 20,
          delay: isOpen ? 0.1 : 0 
        }}
        className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 max-w-[280px]"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-jly-red flex items-center justify-center text-white font-black text-xs">JLY</div>
            <div>
              <h4 className="font-black text-jly-blue uppercase tracking-tighter text-lg">Chat with us!</h4>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Online</p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-jly-red transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex items-center gap-1 mb-4">
          <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          Have questions about our services or programs? Connect with our team on Facebook Messenger for real-time support.
        </p>
        <a
          href="https://www.facebook.com/JLYMain/"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-jly-red text-white text-center py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-jly-red/90 transition-all shadow-lg shadow-jly-red/20 mb-3 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.91 1.453 5.503 3.735 7.214V22l3.363-1.845c.89.247 1.83.38 2.902.38 5.523 0 10-4.145 10-9.258S17.523 2 12 2zm1.07 12.443l-2.55-2.72-4.97 2.72 5.46-5.8 2.62 2.72 4.9-2.72-5.46 5.8z"/>
          </svg>
          Open Messenger
        </a>
        <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest">
          Typically replies in minutes
        </p>
      </motion.div>

      {/* Main Button */}
      <div className="flex items-center gap-3">
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="bg-white px-3 py-1.5 rounded-lg shadow-lg pointer-events-none hidden md:flex items-center gap-2 border border-gray-100"
        >
          <div className="w-6 h-6 rounded-full bg-jly-red flex items-center justify-center">
            <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.91 1.453 5.503 3.735 7.214V22l3.363-1.845c.89.247 1.83.38 2.902.38 5.523 0 10-4.145 10-9.258S17.523 2 12 2zm1.07 12.443l-2.55-2.72-4.97 2.72 5.46-5.8 2.62 2.72 4.9-2.72-5.46 5.8z"/>
            </svg>
          </div>
          <div className="flex flex-col items-start leading-none">
            <span className="text-[10px] font-bold text-jly-blue uppercase tracking-widest">Chat with us</span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[7px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Typically replies in mins</span>
            </div>
          </div>
        </motion.div>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 relative ${
            isOpen ? 'bg-jly-blue text-white' : 'bg-jly-red text-white'
          }`}
        >
          {isOpen ? <X size={32} /> : <MessageCircle size={32} />}
          
          {/* Pulse effect when closed */}
          {!isOpen && (
            <>
              <span className="absolute -top-1 -left-1 bg-jly-red text-white text-[8px] font-black px-1.5 py-0.5 rounded-full border border-white uppercase tracking-tighter">
                New
              </span>
              <span className="absolute inset-0 rounded-full bg-jly-red animate-ping opacity-20" />
              <span className="absolute top-0 right-0 w-5 h-5 bg-jly-blue border-2 border-white rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                1
              </span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
