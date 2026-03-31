import { motion } from 'motion/react';
import { User } from 'lucide-react';
import { useState } from 'react';

const leaders = [
  {
    name: "Bhp. Rey Pe Benito",
    role: "President",
    image: "/RPB.jpg"
  },
  {
    name: "Ps. Joy Pe Benito",
    role: "Chief Operating Officer",
    image: "/JPB.jpg"
  },
  {
    name: "Dr. Edna M. Baluran",
    role: "Treasurer",
    image: "/EMB.jpg"
  }
];

export default function Leadership() {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (name: string) => {
    setImageErrors(prev => ({ ...prev, [name]: true }));
  };

  return (
    <section id="leadership" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-jly-red font-bold tracking-widest text-sm mb-2">BOARD OF DIRECTORS</h2>
          <h3 className="text-4xl md:text-5xl font-black text-jly-blue mb-6">
            LEADERSHIP CREDIBILITY
          </h3>
          <p className="text-gray-600 text-lg">
            Guided by seasoned ministers and professionals who embody the pioneer spirit and unwavering commitment to the Great Commission.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group text-center"
            >
              <div className="relative mb-6 mx-auto w-56 h-56 rounded-full overflow-hidden border-4 border-gray-100 group-hover:border-jly-red transition-all duration-300 shadow-xl">
                {!imageErrors[leader.name] ? (
                  <img 
                    src={leader.image} 
                    alt={leader.name} 
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    onError={() => handleImageError(leader.name)}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                    <User size={80} strokeWidth={1} />
                  </div>
                )}
              </div>
              <h4 className="text-xl font-bold text-jly-blue mb-1 uppercase tracking-tight">{leader.name}</h4>
              <p className="text-jly-red font-bold text-xs uppercase tracking-widest">{leader.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
