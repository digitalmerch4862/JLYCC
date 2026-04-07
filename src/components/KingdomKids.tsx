import React from 'react';
import { Facebook } from 'lucide-react';

export default function KingdomKids() {
  return (
    <section className="py-4 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500/20 shrink-0">
              <img 
                src="https://scontent-man2-1.xx.fbcdn.net/v/t39.30808-1/433697330_719819573694082_970682339187809206_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=48ZRYUK83K0Q7kNvwGXNU4p&_nc_oc=Adp3nGDjP3WdRq1r8gtCoHlwUTCuiGjNanDN1c4Zc-1Uhk33n01qiizh5GaAVjElT_c&_nc_zt=24&_nc_ht=scontent-man2-1.xx&_nc_gid=vaLHswzXi0G9BMAIJPcJCw&_nc_ss=7a3a8&oh=00_Af2PAh3RWfOdG_L8HE8KtolU4AFKCwVintaWXOXBJMAAWA&oe=69D316BA"
                alt="Kingdom Kids"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <h2 className="text-xl font-black text-amber-500 uppercase whitespace-nowrap">
              Kingdom Kids
            </h2>
          </div>
          <p className="text-gray-600 text-sm flex-1 hidden md:block">
            A fun environment for children to learn about God's love. Stay updated through our Facebook page.
          </p>
          <a
            href="https://www.facebook.com/JLYCCKingdomKids/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-full font-bold hover:bg-amber-600 transition-all duration-300 text-xs uppercase tracking-widest cursor-pointer"
          >
            <Facebook size={16} aria-hidden="true" />
            Facebook
          </a>
        </div>
      </div>
    </section>
  );
}
