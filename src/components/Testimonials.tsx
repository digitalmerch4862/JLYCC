import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import Skeleton from './Skeleton';

export default function Testimonials() {
  const { content, loading } = useContent('testimonials', {
    title: 'TESTIMONIES',
    subtitle: 'FROM CALLING TO COMMISSIONING',
    items: [
      {
        quote: "JLY Bible College didn't just give me theological knowledge; it broke my complacency and forged a warrior's spirit in me. I am now planting churches in unreached territories.",
        author: "Pastor Mark D.",
        role: "Alumnus, Church Planter"
      },
      {
        quote: "The discipline and spiritual rigor I experienced here prepared me for the realities of global missions. This is truly where generals are made.",
        author: "Sarah L.",
        role: "International Missionary"
      },
      {
        quote: "I came seeking a degree, but I left with a divine commission. The leadership training is unparalleled, rooted deeply in the Word and the Holy Spirit.",
        author: "Rev. John M.",
        role: "Senior Pastor"
      }
    ]
  });

  if (loading) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Skeleton className="h-4 w-32 mx-auto mb-2" />
            <Skeleton className="h-12 w-64 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <Skeleton className="h-24 w-full mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-jly-red font-bold tracking-widest text-sm mb-2 uppercase">{content.title}</h2>
          <h3 className="text-4xl md:text-5xl font-black text-jly-blue mb-6 uppercase">
            {content.subtitle}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.items.map((testimonial: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative"
            >
              <Quote className="text-gray-200 absolute top-6 right-6" size={48} />
              <p className="text-gray-600 text-lg italic mb-8 relative z-10">
                "{testimonial.quote}"
              </p>
              <div>
                <h4 className="font-bold text-jly-blue">{testimonial.author}</h4>
                <p className="text-sm text-jly-red font-semibold uppercase">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
