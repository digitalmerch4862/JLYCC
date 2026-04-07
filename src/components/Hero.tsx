import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronRight, Radio } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { isLiveNow } from '../utils/liveStatus';
import { useRealTimeContent } from '../hooks/useRealTimeContent';

interface HeroProps {
  previewData?: any;
}

export default function Hero({ previewData }: HeroProps) {
  const ref = useRef(null);
  const [isLive, setIsLive] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const defaultData = {
    welcomeText: 'Welcome to JLYCC',
    headline: 'JESUS LOVES YOU CITY CHURCH',
    subheadline: 'Where Generals Are Made',
    description: 'Raising leaders for Kingdom impact since 1983. A training ground for spiritual generals and nation influencers.',
    bgImage: 'https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-6/612630923_1337019135131225_686166834040117190_n.png?stp=dst-png_s960x960&_nc_cat=109&ccb=1-7&_nc_sid=2a1932&_nc_ohc=_spsM132ArMQ7kNvwG5Je6I&_nc_oc=AdqCtbqvyDtiQzWvghM-4IOwhJ6-5o0gBaUc5SAb1m6XdfFfGEPaMZ0UTFNggI9iQU4&_nc_zt=23&_nc_ht=scontent.fmnl30-2.fna&_nc_gid=cTbEn_ZsfHdBUlzMKXZbJQ&_nc_ss=7a3a8&oh=00_Afz4f05q17204hTM0PuI-vyPUrTRrwtghBQeBwJ0GUg3EA&oe=69D158A5',
    bgVideoId: '7xLhEOxhxPA',
    videoStart: 0,
    videoEnd: 148
  };

  const { data: contentData } = useRealTimeContent('hero', defaultData);
  const content = previewData || contentData || defaultData;

  useEffect(() => {
    const checkLive = () => setIsLive(isLiveNow());
    checkLive();
    const interval = setInterval(checkLive, 60000);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
    }
  };

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center pt-24 md:pt-32 overflow-hidden bg-jly-blue">
      {/* Background Media with Enhanced Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div style={{ y, scale, opacity }} className="absolute inset-0">
          {content.bgVideoId ? (
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${content.bgVideoId}?autoplay=1&mute=1&loop=1&playlist=${content.bgVideoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&start=${content.videoStart || 0}&end=${content.videoEnd || 120}&enablejsapi=1`}
                className="absolute top-1/2 left-1/2 w-[115%] h-[115%] -translate-x-1/2 -translate-y-1/2 aspect-video object-cover"
                allow="autoplay; encrypted-media"
                title="Background Video"
              />
            </div>
          ) : (
            <img
              src={content.bgImage}
              alt="JLYCC Building"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="absolute inset-0 bg-jly-blue/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-jly-blue/40 via-transparent to-jly-blue" />
        </motion.div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: Math.random() * 0.5, 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%" 
            }}
            animate={{ 
              y: [null, "-20px", "20px", null],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ 
              duration: 5 + Math.random() * 5, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Ambient Glow */}
      <motion.div 
        animate={{ 
          x: mousePos.x - 300, 
          y: mousePos.y - 300 
        }}
        transition={{ type: "spring", damping: 30, stiffness: 50 }}
        className="absolute w-[600px] h-[600px] bg-jly-red/10 rounded-full blur-[120px] pointer-events-none z-5 hidden lg:block"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
            <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-jly-red animate-pulse' : 'bg-green-400'}`} aria-hidden="true" />
            <span className="text-white text-xs font-bold tracking-widest uppercase">
              {isLive ? 'Live Now: Sunday Service' : content.welcomeText}
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-8xl font-black text-white mb-4 leading-[1.1] tracking-tighter whitespace-pre-line"
          >
            {content.headline.includes('CITY CHURCH') ? (
              <>
                {content.headline.replace('CITY CHURCH', '')}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-jly-red to-red-500 drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]">CITY CHURCH</span>
              </>
            ) : content.headline}
          </motion.h1>

          <motion.h2 
            variants={itemVariants}
            className="text-2xl md:text-3xl font-bold text-gray-200 mb-6 tracking-[0.2em] uppercase"
          >
            {content.subheadline}
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 mb-8 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            {content.description}
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-8">
            {isLive && (
              <motion.a
                href="https://www.youtube.com/@jlymicentral233"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 0.95, 
                  boxShadow: "0px 10px 40px rgba(220, 38, 38, 0.6)" 
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-jly-red px-8 py-4 rounded font-heading font-bold text-lg tracking-wider transition-all border-2 border-jly-red"
              >
                <Radio size={20} className="animate-pulse" />
                WATCH LIVE NOW
              </motion.a>
            )}
            <motion.a
              href="#contact"
              whileHover={{ 
                scale: 0.95, 
                boxShadow: "0px 10px 40px rgba(220, 38, 38, 0.4)" 
              }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-jly-red text-white px-8 py-4 rounded font-heading font-bold text-lg tracking-wider transition-all"
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
                scale: 0.95, 
                backgroundColor: "#ffffff", 
                color: "#1e3a8a",
                boxShadow: "0px 10px 40px rgba(255, 255, 255, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded font-heading font-bold text-lg tracking-wider transition-all"
            >
              SUPPORT THE MINISTRY
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
