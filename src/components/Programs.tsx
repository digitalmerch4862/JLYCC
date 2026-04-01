import { motion } from 'motion/react';
import { Heart, Users, Globe2 } from 'lucide-react';
import { useContent } from '../hooks/useContent';

const pillarIcons = {
  WORSHIP: Heart,
  DISCIPLESHIP: Users,
  MISSION: Globe2
};

export default function VisionSummary() {
  const { content } = useContent('vision', {
    visionTitle: 'VISION SUMMARY',
    visionText: 'The Jesus Loves You City Church exists to provide a place to come before God in worship; committed to disciples who demonstrate our faith; and establish churches all over the world.',
    missionTitle: 'OUR THREE PILLARS',
    missionText: 'Loving God causes us to WORSHIP Him. Loving the brethren causes us to DISCIPLE. Loving the world causes us to do MISSIONS.',
    pillars: [
      {
        title: "WORSHIP",
        subtitle: "WIND Network",
        quote: "Loving God causes us to WORSHIP Him",
        description: "Worship is not a destination but a journey—deepening as we grow in our knowledge and experience of God. Focused on ministerial service in the temple.",
        colorClass: "text-blue-700",
        bgClass: "bg-blue-700",
        lightBg: "bg-blue-50"
      },
      {
        title: "DISCIPLESHIP",
        subtitle: "Eagles Network",
        quote: "Loving the brethren causes us to DISCIPLE",
        description: "Generational Discipleship. Focused on raising up the next generation of leaders through HeartLink, ISU, and Children's ministries.",
        colorClass: "text-jly-red",
        bgClass: "bg-jly-red",
        lightBg: "bg-red-50"
      },
      {
        title: "MISSION",
        subtitle: "Amen / LeadTakers",
        quote: "Loving the world causes us to do MISSIONS",
        description: "Evangelism & Missions. Focused on reaching the 7 Mountains of Society and expanding our territory globally.",
        colorClass: "text-amber-500",
        bgClass: "bg-amber-500",
        lightBg: "bg-amber-50"
      }
    ]
  });

  return (
    <section id="vision" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-jly-red font-bold tracking-widest text-sm mb-2 uppercase">{content.visionTitle}</h2>
          <h3 className="text-4xl md:text-5xl font-black text-jly-blue mb-6 uppercase">
            {content.missionTitle}
          </h3>
          <p className="text-gray-600 text-lg">
            {content.visionText}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.pillars.map((pillar: any, index: number) => {
            const Icon = pillarIcons[pillar.title as keyof typeof pillarIcons] || Heart;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group text-center"
              >
                <div className={`w-20 h-20 mx-auto ${pillar.bgClass} text-white rounded-full flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform`}>
                  <Icon size={36} />
                </div>
                <h4 className={`text-3xl font-black mb-2 ${pillar.colorClass}`}>{pillar.title}</h4>
                <p className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-6">{pillar.subtitle}</p>
                
                <div className={`p-4 rounded-lg ${pillar.lightBg} mb-6`}>
                  <p className={`font-heading font-bold italic ${pillar.colorClass}`}>
                    "{pillar.quote}"
                  </p>
                </div>
                
                <p className="text-gray-600 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
