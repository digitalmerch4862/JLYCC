import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { useRef } from 'react';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  // Move the background down slightly as the user scrolls down
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          style={{ y }}
          src="/jlycc-building.jpg"
          alt="JLYCC Building"
          className="w-full h-[130%] object-cover absolute -top-[15%]"
        />
        <div className="absolute inset-0 bg-jly-blue/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-jly-blue/40 via-transparent to-jly-blue" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-jly-red animate-pulse" />
            <span className="text-white text-xs font-bold tracking-widest uppercase">Welcome to JLYCC</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-[1.1]">
            JESUS LOVES YOU <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-jly-red to-red-400">CITY CHURCH</span>
          </h1>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-200 mb-6 tracking-wide uppercase">
            Where Generals Are Made
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-10 font-medium max-w-2xl mx-auto">
            Raising leaders for Kingdom impact since 1983. A training ground for spiritual generals and nation influencers.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#apply"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0px 10px 30px rgba(220, 38, 38, 0.4)" 
              }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-jly-red text-white px-8 py-4 rounded font-heading font-bold text-lg tracking-wider transition-colors"
            >
              START YOUR CALLING
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ChevronRight size={20} />
              </motion.div>
            </motion.a>
            <motion.a
              href="#donate"
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "#ffffff", 
                color: "#1e3a8a",
                boxShadow: "0px 10px 30px rgba(255, 255, 255, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded font-heading font-bold text-lg tracking-wider transition-colors"
            >
              SUPPORT THE MINISTRY
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
