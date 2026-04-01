import { motion } from 'motion/react';
import { Shield, BookOpen, Globe, Award, Radio, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { isLiveNow } from '../utils/liveStatus';
import { useContent } from '../hooks/useContent';

export default function About() {
  const [isLive, setIsLive] = useState(false);

  const { content } = useContent('about', {
    title: 'ABOUT THE MINISTRY',
    subtitle: 'A LEGACY OF SPIRITUAL AUTHORITY',
    description: 'Jesus Loves You Ministries, Inc. is a registered non-stock, non-profit Christian Corporation dedicated to religious Christian activities. Since our founding on February 23, 1983, we have been committed to building a legacy of spiritual authority and leadership training for kingdom impact.',
    secondaryDescription: "We emphasize rigorous spiritual formation combined with practical leadership. We don't just educate; we forge nation influencers and spiritual generals equipped to take on the darkest territories.",
    videoUrl: 'https://www.youtube.com/embed/GiURvSANcmw?start=2580',
    establishedYear: '1983',
    secRegNo: '0000110444',
    youtubeChannelUrl: 'https://www.youtube.com/@jlymicentral233'
  });

  useEffect(() => {
    const checkLive = () => setIsLive(isLiveNow());
    checkLive();
    const interval = setInterval(checkLive, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Video Embed */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl bg-gray-100 border-4 border-gray-50 hover:border-jly-red transition-colors duration-500 relative group"
            >
              {isLive && (
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-jly-red text-white px-3 py-1.5 rounded-full shadow-lg animate-pulse">
                  <Radio size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Live Now</span>
                </div>
              )}
              
              <iframe 
                src={content.videoUrl} 
                title="JLYCC Video" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                className="w-full h-full border-none"
              ></iframe>

              {isLive && (
                <a 
                  href={content.youtubeChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="bg-white text-jly-red px-6 py-3 rounded-full font-black uppercase tracking-widest flex items-center gap-2 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <ExternalLink size={18} />
                    Join Live Stream
                  </div>
                </a>
              )}
            </motion.div>
            <div className="absolute -bottom-6 -left-6 bg-jly-blue text-white p-6 rounded-lg shadow-2xl border-l-4 border-jly-red hidden md:block z-10">
              <p className="font-heading font-black text-4xl">{content.establishedYear}</p>
              <p className="text-sm font-bold tracking-widest uppercase text-gray-300 mt-1">Established</p>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-jly-red font-bold tracking-widest text-sm mb-2 uppercase">{content.title}</h2>
            <h3 className="text-4xl md:text-5xl font-black text-jly-blue mb-6 leading-tight uppercase">
              {content.subtitle}
            </h3>
            
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              {content.description}
            </p>
            
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {content.secondaryDescription}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded bg-jly-blue/5 flex items-center justify-center flex-shrink-0">
                  <Shield className="text-jly-red" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-jly-blue mb-1">Non-Profit Ministry</h4>
                  <p className="text-sm text-gray-500">SEC Registered No. {content.secRegNo}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded bg-jly-blue/5 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="text-jly-red" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-jly-blue mb-1">Biblical Truth</h4>
                  <p className="text-sm text-gray-500">Uncompromising theological depth</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded bg-jly-blue/5 flex items-center justify-center flex-shrink-0">
                  <Globe className="text-jly-red" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-jly-blue mb-1">Global Mission</h4>
                  <p className="text-sm text-gray-500">Training international students</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded bg-jly-blue/5 flex items-center justify-center flex-shrink-0">
                  <Award className="text-jly-red" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-jly-blue mb-1">Excellence</h4>
                  <p className="text-sm text-gray-500">Military-grade spiritual discipline</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
