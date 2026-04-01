import { motion } from 'motion/react';
import { User } from 'lucide-react';
import { useState } from 'react';
import { useContent } from '../hooks/useContent';

export default function Leadership() {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  
  const { content } = useContent('leadership', {
    title: 'BOARD OF DIRECTORS',
    subtitle: 'LEADERSHIP CREDIBILITY',
    description: 'Guided by seasoned ministers and professionals who embody the pioneer spirit and unwavering commitment to the Great Commission.',
    leaders: [
      {
        name: "Bhp. Rey Pe Benito",
        image: "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-6/657331523_1404122091754262_3069268156856240990_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s206x206_tt6&_nc_cat=100&ccb=1-7&_nc_sid=a934a8&_nc_ohc=GCQHUklMRkoQ7kNvwGJE8OT&_nc_oc=Adr50GYYuiQ12G5-enrsKx49r_qDkHxSd__r6zPWXelpEGiK5oMkqpujVO_bebCO32Y&_nc_zt=23&_nc_ht=scontent.fmnl30-2.fna&_nc_gid=TDevOlRJ4yIAY335vOvfew&_nc_ss=7a3a8&oh=00_AfxggzrsDaOh9OEY3PLU8jxDSWEsEawCPI3ef7jxWsvBIQ&oe=69D1816E"
      },
      {
        name: "Ps. Joy Pe Benito",
        image: "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-6/649670490_1386967966803008_2424536375076875887_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s206x206_tt6&_nc_cat=109&ccb=1-7&_nc_sid=a934a8&_nc_ohc=cbqG8Fvn9vkQ7kNvwEqAtPa&_nc_oc=AdrfaBgbMuNxPrKWQ9GInMYSEvpQkyOmL9NR1oxqaBrkXmRwlfCtDd2i0Eo5e6wOEUI&_nc_zt=23&_nc_ht=scontent.fmnl30-2.fna&_nc_gid=qnXOHbKISjoqrBgxrnQtGA&_nc_ss=7a3a8&oh=00_AfycG3Cg-eMuziUMK4sil3NZyRtZ7AHc_p7GElVyID0InQ&oe=69D16D86"
      },
      {
        name: "Dr. Edna M. Baluran",
        image: "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-6/480565227_1069330558566752_8450119658131360585_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=dd6889&_nc_ohc=loosaijgQMQQ7kNvwFqZRpm&_nc_oc=AdoVDmPU8BW_gzPbnl0_55EKkbvycd4oFXu7-e_ElL0occWrkz4AR-sQ4369rWhv6bM&_nc_zt=23&_nc_ht=scontent.fmnl30-2.fna&_nc_gid=yFpCi2Pz9on3EvVOhSpGQQ&_nc_ss=7a3a8&oh=00_Afx_MXdjVqOkx8j0mcSnCq1_AUIT4l_Ce6EbRjNeKY27Kg&oe=69D18E4E"
      }
    ]
  });

  const handleImageError = (name: string) => {
    setImageErrors(prev => ({ ...prev, [name]: true }));
  };

  return (
    <section id="leadership" className="py-24 bg-white">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {content.leaders.map((leader: any, index: number) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(249, 250, 251, 1)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group text-center cursor-pointer p-6 rounded-2xl transition-all duration-300 hover:shadow-lg"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
