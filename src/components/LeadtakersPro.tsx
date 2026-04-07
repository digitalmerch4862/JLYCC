import React from 'react';
import { Facebook } from 'lucide-react';

export default function LeadtakersPro() {
  return (
    <section className="py-4 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-jly-red/20 shrink-0">
              <img 
                src="https://scontent-man2-1.xx.fbcdn.net/v/t39.30808-1/622136095_122267424572192069_617608999485802270_n.jpg?stp=c0.5.477.477a_dst-jpg_s200x200_tt6&_nc_cat=106&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=PKsB-wxvQmsQ7kNvwFuh5lS&_nc_oc=AdqJ10-7oY8AfsccZGEENncES4dsk5y7iHczs0zdD3ThiAsvEoaDbCbqoyUGk3y3FjQ&_nc_zt=24&_nc_ht=scontent-man2-1.xx&_nc_gid=nH1ICfYfhameZRcs-KcJjw&_nc_ss=7a3a8&oh=00_Af22qRA8DxAJnIGHUOaKzxox7LP2gqXhndhuniuIcijhAg&oe=69D2F630"
                alt="Leadtakers Pro"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <h2 className="text-xl font-black text-jly-red uppercase whitespace-nowrap">
              Leadtakers Pro
            </h2>
          </div>
          <p className="text-gray-600 text-sm flex-1 hidden md:block">
            Leadership training for young adults. Stay updated through our Facebook page.
          </p>
          <a
            href="https://www.facebook.com/LeadtakersWC"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-jly-red text-white px-4 py-2 rounded-full font-bold hover:bg-jly-red/90 transition-all duration-300 text-xs uppercase tracking-widest cursor-pointer"
          >
            <Facebook size={16} aria-hidden="true" />
            Facebook
          </a>
        </div>
      </div>
    </section>
  );
}
