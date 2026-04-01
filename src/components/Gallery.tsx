import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useContent } from '../hooks/useContent';

export default function Gallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const { content } = useContent('gallery', {
    title: 'OUR COMMUNITY',
    subtitle: 'LIFE AT JLYCC',
    description: 'Experience the joy, fellowship, and spiritual growth within our church family.',
    photos: [
      { url: "https://scontent.fmnl30-3.fna.fbcdn.net/v/t39.30808-6/659856828_1404121771754294_245439550069898788_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=13d280&_nc_ohc=se4t8EB9sBIQ7kNvwHgNMey&_nc_oc=Adr38YgQfBYJP52vQKHUGe3RRTnnqF9DnckuMjuvnzjyhy4O28lt9OVnEBwD2UFlu4I&_nc_zt=23&_nc_ht=scontent.fmnl30-3.fna&_nc_gid=6n57KwWOCdDnTO9uoTBfgw&_nc_ss=7a3a8&oh=00_AfzrsptmuyOqL3-125y6GII1iulN6pD6L-F5oWBFmIoUsw&oe=69D16C63", category: "Worship" },
      { url: "https://scontent.fmnl30-3.fna.fbcdn.net/v/t39.30808-6/659799853_1404121805087624_1799368263965438416_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=13d280&_nc_ohc=bxR-sZd1eXsQ7kNvwH3gvkV&_nc_oc=Adrh2RJrwyGB3xY3logA-c9dDysm7hBIlrAGNDNUsvkG97AKUYbJYeCi_h_2eLcC4CU&_nc_zt=23&_nc_ht=scontent.fmnl30-3.fna&_nc_gid=82EPeaP9CGHKzXC1Z1sZaw&_nc_ss=7a3a8&oh=00_AfwTkpLRwf6ndFHt5AQLsJUywUpcMulkH-_esT4hkpLmsg&oe=69D14826", category: "Worship" },
      { url: "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-6/658292021_1404122001754271_4178890919066943376_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=13d280&_nc_ohc=iyW1Q9Nyq4YQ7kNvwHcWVw3&_nc_oc=AdoTokCUP2l_NVbwnRXa5_K9mKdR7nlPCjJjGEsapDhnpYFsJkgO-qlo0mP5gW1zlRw&_nc_zt=23&_nc_ht=scontent.fmnl30-2.fna&_nc_gid=cFcaUpmGD0e7S8g9cUw8Zg&_nc_ss=7a3a8&oh=00_AfwHXoT8E57WwxVF2wbP-yNayEq2wEursSRVB910hxnJ3g&oe=69D1765B", category: "Youth" },
      { url: "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-6/657572802_1404122071754264_7162227567918279761_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=13d280&_nc_ohc=-ka6vGWMatoQ7kNvwGmIzs1&_nc_oc=AdoRwEgGxBH-O7ak1U8hhXQ799M9IvaM6tK6QMPNR6DcTjve5wDkj61MHEQT9t584_s&_nc_zt=23&_nc_ht=scontent.fmnl30-2.fna&_nc_gid=DQPHgTVneWpTdGhmUtdkVw&_nc_ss=7a3a8&oh=00_AfwuCWVUOp_Tsqo2DCXF2fmceizsgNb2vviHX4U85MeytQ&oe=69D1677E", category: "Youth" },
      { url: "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-6/658169848_1404121438420994_7283719463848282566_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=13d280&_nc_ohc=GUHTnNiCEL4Q7kNvwFXPIhe&_nc_oc=Adqb2PpEsqWQWmfxtm2xNLM3J5IrLDov_kEN-jrYd3W_nM-Zs9UruwoX3wQBgmKTdBI&_nc_zt=23&_nc_ht=scontent.fmnl30-2.fna&_nc_gid=4rCZUetNuu28PJRvwe-eCQ&_nc_ss=7a3a8&oh=00_AfysYQ7xo7nXnLpH9ENlpF87e5bDkfJpM7tGl4N8BrtCRA&oe=69D14973", category: "Community" },
      { url: "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-6/658529659_1404121495087655_1081659018009705214_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=13d280&_nc_ohc=8Ju81C1LqssQ7kNvwFH5gLP&_nc_oc=AdqcycwcZxAFvRK1VYGEwJ0Mp0inmFSVCq5t5OLRfuo3ffPVPEdT7Srkq7wEH6NPkNk&_nc_zt=23&_nc_ht=scontent.fmnl30-2.fna&_nc_gid=pionZqbiSvKXyTIG9HGUDw&_nc_ss=7a3a8&oh=00_AfxeGQdZk3uUkX6pnyHvdeL_jY3eOwor-QJI00k2eksRGA&oe=69D17102", category: "Community" },
      { url: "https://scontent.fmnl30-1.fna.fbcdn.net/v/t39.30808-6/649750493_122273029520192069_8750985397307920355_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=dd6889&_nc_ohc=fYbko6l0OVoQ7kNvwEzxAS9&_nc_oc=Adps4vvBcSmQ7yzY8DoEf4cgiV7LAVP8J4YL3GkoiwS8cPqcyezJZc-lF5qNQmR_YvY&_nc_zt=23&_nc_ht=scontent.fmnl30-1.fna&_nc_gid=g-iqFar_8BXUe79TXgfPuw&_nc_ss=7a3a8&oh=00_AfwpjRp_YjRg7-N9bCvywTOR4faP0EFsaaOHDSdFlTd5qw&oe=69D167E8", category: "Events" },
      { url: "https://scontent.fmnl30-3.fna.fbcdn.net/v/t39.30808-6/649329025_122273030114192069_4601855650301163098_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=dd6889&_nc_ohc=JrrkJ_-PhlQQ7kNvwF308si&_nc_oc=AdrWq1NJaLwL8l8vKrJszSmWm3FQonZjJ3eqLxcQoIbBJcsv4el3aqctDrY2UKRmi4U&_nc_zt=23&_nc_ht=scontent.fmnl30-3.fna&_nc_gid=th6y2yNlfQB8zS9c8bd4Gw&_nc_ss=7a3a8&oh=00_AfxKbdQVKogz4VKdiS8JUOAtwkVwYQStVI2qEvlG04hSpg&oe=69D1684C", category: "Events" },
      { url: "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-6/650733669_122273030204192069_4179562886554830026_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=dd6889&_nc_ohc=7Z-rV8BPlR0Q7kNvwGbbuN1&_nc_oc=Adq3WQq50zwhDB4qtoxJR2sbZBPP4GYRH9FU5sSS7g2nqXbxlKHZ21hJOEm-6mhXRrE&_nc_zt=23&_nc_ht=scontent.fmnl30-2.fna&_nc_gid=aK8RKz5cFgce76Bclindxw&_nc_ss=7a3a8&oh=00_AfwaKkzwXJze2AL-gsIZ0UAufzkBBgdJN4XFSchdX_gH3Q&oe=69D15F6E", category: "Community" },
      { url: "https://scontent.fmnl30-3.fna.fbcdn.net/v/t39.30808-6/649358985_122273030408192069_4847202199695355592_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=dd6889&_nc_ohc=YIfdmG6rjRgQ7kNvwG23d9e&_nc_oc=AdrHOT64hhd9A6T14MEL93prJwqS6ODS-Z-7N7G2m5uV0Wyno66Kq9fvayDHY2FiWXk&_nc_zt=23&_nc_ht=scontent.fmnl30-3.fna&_nc_gid=d3KMSEVCA4EMkRdVQOiE8Q&_nc_ss=7a3a8&oh=00_AfwQVoLAWC18ZmRe1bWH9C0PEKJuhed1b7-lEt0YxgrsdA&oe=69D17356", category: "Youth" },
      { url: "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-6/650732632_122273031122192069_8328203293226328762_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=dd6889&_nc_ohc=3hTEdkkLn88Q7kNvwFF9hL7&_nc_oc=AdpPza32MGPEatF_as3V2wU9t1DKXbyJJ-kUK6EnjKdOWJknDhezf1gWD2bVlI6qsDA&_nc_zt=23&_nc_ht=scontent.fmnl30-2.fna&_nc_gid=EdJFk9z-XzJleSWEs6Lb7Q&_nc_ss=7a3a8&oh=00_Afzrov8z8u7sYX9Sn3LRuJJMa8Tp90_CptWyWL0DNLbMiQ&oe=69D1772C", category: "Worship" },
      { url: "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-6/656923639_1404121861754285_1336930171503588931_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=13d280&_nc_ohc=CcxUMWSPZf0Q7kNvwF-Ylid&_nc_oc=AdorhQq9ffaJL83GIsV47O82e9hB27mbAh255gjFyecUDqrgUrOR19ZxU38JYr9Qwy0&_nc_zt=23&_nc_ht=scontent.fmnl30-2.fna&_nc_gid=COsNWwvP8-VOtyvu-trbdg&_nc_ss=7a3a8&oh=00_AfziaB7wLIhES0Y2ZBGPbl5t4TO7vv_67oKb-vIAlUYJDg&oe=69D1788B", category: "Worship" }
    ]
  });

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null && content.photos) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % content.photos.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null && content.photos) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + content.photos.length) % content.photos.length);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-gray-50 overflow-hidden">
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

        {/* 3D Photo Album Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto perspective-1000">
          {content.photos?.map((photo: any, index: number) => (
            <motion.div
              key={photo.url}
              initial={{ opacity: 0, y: 50, rotateX: 20, rotateY: index % 2 === 0 ? 10 : -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.05,
                type: "spring",
                stiffness: 100
              }}
              className="relative group cursor-pointer"
              onClick={() => setSelectedPhotoIndex(index)}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: index % 2 === 0 ? 15 : -15,
                  rotateX: 10,
                  z: 50,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                }}
                className="relative aspect-[4/5] rounded-lg overflow-hidden bg-white p-2 shadow-xl transform-gpu transition-all duration-500 preserve-3d"
              >
                {/* Photo Frame Effect */}
                <div className="w-full h-full relative overflow-hidden rounded-sm">
                  <img
                    src={photo.url}
                    alt={`JLYCC Community ${index + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  {/* Glossy Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                </div>
                
                {/* Caption on Hover */}
                <div className="absolute inset-0 bg-jly-blue/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                  <span className="text-jly-red text-[10px] font-black tracking-[0.3em] uppercase mb-2">{photo.category}</span>
                  <span className="text-white text-sm font-bold tracking-widest uppercase border-b border-jly-red pb-1">View Memory</span>
                </div>
              </motion.div>
              
              {/* Stack Shadow Effect */}
              <div className="absolute -bottom-4 left-4 right-4 h-8 bg-black/10 blur-xl rounded-full -z-10 group-hover:bg-black/20 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && content.photos && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2"
              onClick={() => setSelectedPhotoIndex(null)}
            >
              <X size={40} />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-4 z-50 hidden md:block"
              onClick={handlePrev}
            >
              <ChevronLeft size={64} />
            </button>

            <div className="relative max-w-5xl w-full flex flex-col items-center">
              <motion.div
                key={selectedPhotoIndex}
                initial={{ opacity: 0, scale: 0.8, rotateY: -45 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: 45 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="relative bg-white p-3 rounded-sm shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={content.photos[selectedPhotoIndex].url}
                  alt={`JLYCC Community ${selectedPhotoIndex + 1}`}
                  className="max-w-full max-h-[75vh] object-contain"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-4 border-l-4 border-jly-red">
                  <span className="text-jly-red font-black tracking-[0.3em] uppercase text-[10px] block mb-1">
                    {content.photos[selectedPhotoIndex].category}
                  </span>
                  <span className="text-jly-blue font-bold text-sm">
                    Memory {selectedPhotoIndex + 1} of {content.photos.length}
                  </span>
                </div>
              </motion.div>
            </div>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-4 z-50 hidden md:block"
              onClick={handleNext}
            >
              <ChevronRight size={64} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
