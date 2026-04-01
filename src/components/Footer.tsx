import { Facebook, Youtube, Shield } from 'lucide-react';
import { useContent } from '../hooks/useContent';

export default function Footer() {
  const { content } = useContent('footer', {
    logoUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_kah_NUvn3TN3XqFK1yhqujYK3NjDx4vXd1oVgL3bdaPA=s160-c-k-c0x00ffffff-no-rj',
    churchName: 'JESUS LOVES YOU',
    tagline: 'City Church\nWhere GENERALS are Made',
    facebookUrl: 'https://www.facebook.com/JLYMain',
    youtubeUrl: 'https://www.youtube.com/@jlymicentral233',
    secRegNo: '0000110444',
    websiteUrl: 'http://www.jlycc.org'
  });

  return (
    <footer className="bg-jly-blue-light text-white py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={content.logoUrl} 
                alt="JLYCC Logo" 
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = document.getElementById('footer-logo-fallback');
                  if (fallback) fallback.style.display = 'flex';
                }}
                referrerPolicy="no-referrer"
              />
              <div id="footer-logo-fallback" className="w-8 h-8 bg-jly-red rounded-full hidden items-center justify-center">
                <span className="text-white font-heading font-bold text-sm">JLY</span>
              </div>
              <span className="font-heading font-bold text-lg uppercase">{content.churchName}</span>
            </div>
            <p className="text-gray-400 text-sm mb-6 whitespace-pre-line">
              {content.tagline}
            </p>
            <div className="flex gap-4">
              <a href={content.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1877F2] transition-colors" aria-label="Facebook Page">
                <Facebook size={24} />
              </a>
              <a href={content.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF0000] transition-colors" aria-label="YouTube Channel">
                <Youtube size={24} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 uppercase tracking-wider text-sm text-gray-300">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#vision" className="hover:text-white transition-colors">Vision</a></li>
              <li><a href="#leadership" className="hover:text-white transition-colors">Leadership</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 uppercase tracking-wider text-sm text-gray-300">Legal & Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>SEC Reg No: {content.secRegNo}</li>
              <li>Registered Non-Profit Organization</li>
              <li><a href="#donate" className="text-jly-red hover:text-white transition-colors font-bold">Donate to our Mission</a></li>
              <li><a href={content.websiteUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{content.websiteUrl.replace('http://', '').replace('https://', '')}</a></li>
              <li className="pt-4">
                <a 
                  href="/login" 
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest transition-all text-gray-400 hover:text-white"
                >
                  <Shield size={14} className="text-jly-red" />
                  Admin Portal
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Jesus Loves You Ministries, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
