import React from 'react';
import { Facebook } from 'lucide-react';

export default function LeadtakersYouth() {
  return (
    <section className="py-4 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-jly-blue/20 shrink-0">
              <img 
                src="https://scontent-man2-1.xx.fbcdn.net/v/t39.30808-1/309099764_158181883526259_8634066233004912702_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=vbClV7jULn8Q7kNvwEELbKY&_nc_oc=AdonFvwPcXwhukH8bqzLojSZgKZ8eX7tvQ4Oj72yj1G7CPmturpfkCPFcMBWnRMnSWY&_nc_zt=24&_nc_ht=scontent-man2-1.xx&_nc_gid=NkvLy0-5n6MeiMOBhDvPRQ&_nc_ss=7a3a8&oh=00_Af3NO8E9OieHgaI5bxoGk2YcdQpwMAdC-EGoD_6GcgoJkg&oe=69D30F68"
                alt="Leadtakers Youth"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <h2 className="text-xl font-black text-jly-blue uppercase whitespace-nowrap">
              Leadtakers Youth
            </h2>
          </div>
          <p className="text-gray-600 text-sm flex-1 hidden md:block">
            Join our vibrant youth community! Stay updated through our Facebook page.
          </p>
          <a
            href="https://www.facebook.com/share/v/17PuqBVtZW/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-jly-blue text-white px-4 py-2 rounded-full font-bold hover:bg-jly-blue/90 transition-all duration-300 text-xs uppercase tracking-widest cursor-pointer"
          >
            <Facebook size={16} aria-hidden="true" />
            Facebook
          </a>
        </div>
      </div>
    </section>
  );
}
