import { motion } from 'motion/react';
import { useContent } from '../hooks/useContent';

export default function CTA() {
  const { content } = useContent('cta', {
    headline: 'STEP INTO YOUR CALLING',
    subheadline: 'Be Trained. Be Equipped. Be Sent.',
    buttonText: 'Apply Now',
    buttonLink: '#contact'
  });

  return (
    <section className="py-24 bg-jly-red relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black rounded-full mix-blend-overlay filter blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight uppercase">
            {content.headline}
          </h2>
          <p className="text-xl md:text-3xl text-white/90 font-heading font-bold mb-10">
            {content.subheadline}
          </p>
          
          <a
            href={content.buttonLink}
            className="inline-block bg-white text-jly-red hover:bg-gray-100 px-10 py-5 rounded font-heading font-black text-xl tracking-widest uppercase transition-transform hover:scale-105 shadow-2xl"
          >
            {content.buttonText}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
