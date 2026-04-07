import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { useContent } from '../hooks/useContent';

export default function WhyChooseUs() {
  const { content } = useContent('why_us', {
    title: 'THE JLY DIFFERENCE',
    subtitle: 'ANSWER THE CALL WITH EXCELLENCE',
    description: "We don't just impart knowledge; we forge character. Our environment is designed to strip away complacency and build spiritual resilience.",
    reasons: [
      "Over 40 years of ministry legacy and proven fruitfulness",
      "Spirit-led training emphasizing the power of the Holy Spirit",
      "Intensive leadership development for real-world ministry",
      "Practical ministry exposure through our network of churches",
      "Strong spiritual discipline culture modeling military excellence"
    ],
    imageUrl: 'https://scontent.fmnl30-1.fna.fbcdn.net/v/t39.30808-6/649733303_1386967550136383_6181150934109095101_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=13d280&_nc_ohc=_UxUtWQXN5oQ7kNvwHjf8Xj&_nc_oc=AdrkOScsvLo_qm5i9XpPVuv_5-eVTN52STGcAPvQqK3vJOmf3EZjyje43DtFeMQclK0&_nc_zt=23&_nc_ht=scontent.fmnl30-1.fna&_nc_gid=Htcv9in-H8KiJwEwHgTC3w&_nc_ss=7a3a8&oh=00_AfxBTcUXHFx82_urqNCOyTDELpCMyDxSMdQ7AjfKvPkyxg&oe=69D18F53',
    quote: '"The just shall live by faith..."',
    quoteAuthor: '— Habakkuk 2:4'
  });

  return (
    <section id="why-us" className="py-24 bg-jly-blue text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-jly-red font-bold tracking-widest text-sm mb-2 uppercase">{content.title}</h2>
            <h3 className="text-4xl md:text-5xl font-black mb-6 leading-tight uppercase">
              {content.subtitle}
            </h3>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              {content.description}
            </p>

            <ul className="space-y-4">
              {content.reasons.map((reason: string, index: number) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="text-jly-red flex-shrink-0 mt-1" size={20} aria-hidden="true" />
                  <span className="text-gray-200 text-lg">{reason}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] rounded-xl overflow-hidden border-4 border-white/10"
          >
            <img 
              src={content.imageUrl} 
              alt="Worship and Ministry" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-jly-blue via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-2xl font-heading font-bold italic">{content.quote}</p>
              <p className="text-jly-red font-bold mt-2">{content.quoteAuthor}</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
