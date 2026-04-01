import { motion } from 'motion/react';
import { Heart, Globe, BookOpen } from 'lucide-react';
import { useContent } from '../hooks/useContent';

export default function Support() {
  const { content } = useContent('support', {
    title: 'PARTNER WITH US',
    subtitle: 'SUPPORT OUR NON-PROFIT MISSION',
    description: 'Jesus Loves You Ministries, Inc. operates as a registered non-profit organization. We rely on the faithful partnership of believers to fund scholarships, expand our facilities, and send missionaries worldwide.',
    registrationNumber: 'No. 0000110444',
    pillars: [
      {
        title: 'Scholarship Fund',
        description: "Sponsor a student's theological education and living expenses during their training.",
        icon: 'BookOpen',
        color: 'jly-blue'
      },
      {
        title: 'Global Missions',
        description: 'Fund church planting initiatives and missionary deployments across the globe.',
        icon: 'Globe',
        color: 'jly-red'
      },
      {
        title: 'General Ministry',
        description: 'Support the day-to-day operations and expansion of Jesus Loves You Ministries.',
        icon: 'Heart',
        color: 'jly-blue'
      }
    ]
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen size={32} />;
      case 'Globe': return <Globe size={32} />;
      case 'Heart': return <Heart size={32} />;
      default: return <Heart size={32} />;
    }
  };

  return (
    <section id="donate" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-jly-red font-bold tracking-widest text-sm mb-2 uppercase">{content.title}</h2>
          <h3 className="text-4xl md:text-5xl font-black text-jly-blue mb-6 uppercase">
            {content.subtitle}
          </h3>
          <p className="text-gray-600 text-lg">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {content.pillars.map((pillar: any, index: number) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 p-8 rounded-xl text-center border border-gray-100"
            >
              <div className={`w-16 h-16 bg-${pillar.color}/10 text-${pillar.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                {getIcon(pillar.icon)}
              </div>
              <h4 className="text-xl font-bold text-jly-blue mb-3">{pillar.title}</h4>
              <p className="text-gray-600 mb-6">{pillar.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 bg-jly-red hover:bg-jly-red-dark text-white px-8 py-4 rounded font-heading font-bold text-lg tracking-wider transition-all hover:scale-105 shadow-lg uppercase"
          >
            <Heart size={20} />
            MAKE A DONATION
          </a>
          <p className="mt-4 text-sm text-gray-500">All donations are directed to our SEC-registered non-profit ({content.registrationNumber}).</p>
        </div>
      </div>
    </section>
  );
}
