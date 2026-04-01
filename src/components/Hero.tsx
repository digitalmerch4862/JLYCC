import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronRight, Radio } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { isLiveNow } from '../utils/liveStatus';
import { useContent } from '../hooks/useContent';

export default function Hero() {
  const ref = useRef(null);
  const [isLive, setIsLive] = useState(false);
  
  const { content } = useContent('hero', {
    welcomeText: 'Welcome to JLYCC',
    headline: 'JESUS LOVES YOU CITY CHURCH',
    subheadline: 'Where Generals Are Made',
    description: 'Raising leaders for Kingdom impact since 1983. A training ground for spiritual generals and nation influencers.',
    bgImage: 'https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-6/612630923_1337019135131225_686166834040117190_n.png?stp=dst-png_s960x960&_nc_cat=109&ccb=1-7&_nc_sid=2a1932&_nc_ohc=_spsM132ArMQ7kNvwG5Je6I&_nc_oc=AdqCtbqvyDtiQzWvghM-4IOwhJ6-5o0gBaUc5SAb1m6XdfFfGEPaMZ0UTFNggI9iQU4&_nc_zt=23&_nc_ht=scontent.fmnl30-2.fna&_nc_gid=cTbEn_ZsfHdBUlzMKXZbJQ&_nc_ss=7a3a8&oh=00_Afz4f05q17204hTM0PuI-vyPUrTRrwtghBQeBwJ0GUg3EA&oe=69D158A5'
  });

  useEffect(() => {
    const checkLive = () => setIsLive(isLiveNow());
    checkLive();
    const interval = setInterval(checkLive, 60000);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          style={{ y }}
          key={content.bgImage}
          src={content.bgImage}
          alt="JLYCC Building"
          className="w-full h-[130%] object-cover absolute -top-[15%]"
          referrerPolicy="no-referrer"
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
            <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-jly-red animate-pulse' : 'bg-green-400'}`} />
            <span className="text-white text-xs font-bold tracking-widest uppercase">
              {isLive ? 'Live Now: Sunday Service' : content.welcomeText}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-[1.1] whitespace-pre-line">
            {content.headline.includes('CITY CHURCH') ? (
              <>
                {content.headline.replace('CITY CHURCH', '')}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-jly-red to-red-400">CITY CHURCH</span>
              </>
            ) : content.headline}
          </h1>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-200 mb-6 tracking-wide uppercase">
            {content.subheadline}
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-10 font-medium max-w-2xl mx-auto">
            {content.description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {isLive && (
              <motion.a
                href="https://www.youtube.com/@jlymicentral233"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0px 10px 30px rgba(220, 38, 38, 0.6)" 
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-jly-red px-8 py-4 rounded font-heading font-bold text-lg tracking-wider transition-colors border-2 border-jly-red"
              >
                <Radio size={20} className="animate-pulse" />
                WATCH LIVE NOW
              </motion.a>
            )}
            <motion.a
              href="#contact"
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
