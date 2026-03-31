import { motion } from 'motion/react';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-jly-red font-bold tracking-widest text-sm mb-2">GET IN TOUCH</h2>
            <h3 className="text-4xl md:text-5xl font-black text-jly-blue mb-8">
              READY TO RISE AS A LEADER?
            </h3>
            
            <p className="text-gray-600 text-lg mb-10">
              Contact our admissions office today to learn more about our programs, enrollment requirements, and how you can start your journey.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-jly-red" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-jly-blue text-lg">Location</h4>
                  <p className="text-gray-600">
                    <a href="https://maps.app.goo.gl/Hm8gByEjm3pfbsVQ8" target="_blank" rel="noopener noreferrer" className="hover:text-jly-red transition-colors">
                      40 Mayon St,<br/>Mandaluyong City, Metro Manila
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="text-jly-red" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-jly-blue text-lg">Phone</h4>
                  <p className="text-gray-600">
                    <a href="tel:770005669" className="hover:text-jly-red transition-colors">77-000-5669</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="text-jly-red" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-jly-blue text-lg">Email</h4>
                  <p className="text-gray-600">
                    <a href="mailto:jlycc_main@yahoo.com" className="hover:text-jly-red transition-colors">jlycc_main@yahoo.com</a>
                  </p>
                  <p className="text-gray-600">
                    <a href="mailto:jlymi.central@gmail.com" className="hover:text-jly-red transition-colors">jlymi.central@gmail.com</a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-[400px] lg:h-auto bg-gray-200 rounded-xl overflow-hidden relative"
          >
            <iframe
              title="JLYCC Location"
              src="https://maps.google.com/maps?q=40%20Mayon%20St,%20Mandaluyong%20City,%20Metro%20Manila&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            ></iframe>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
