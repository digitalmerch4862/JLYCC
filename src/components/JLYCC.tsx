import React from 'react';
import { Facebook } from 'lucide-react';

export default function JLYCC() {
  return (
    <section className="py-4 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-jly-blue/20 shrink-0">
              <img 
                src="/android-chrome-512x512.png" 
                alt="JLYCC"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <h2 className="text-xl font-black text-jly-blue uppercase whitespace-nowrap">
              JLYCC
            </h2>
          </div>
          <p className="text-gray-600 text-sm flex-1 hidden md:block">
            Join our main Sunday service! Stay updated through our Facebook page.
          </p>
          <a
            href="https://www.facebook.com/JLYMain/"
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
