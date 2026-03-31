import { Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-jly-blue-light text-white py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="https://scontent.fmnl30-1.fna.fbcdn.net/v/t39.30808-1/453783636_924875829678893_8484670298322969456_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=102&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=X-St79JfrFYQ7kNvwG3fXIP&_nc_oc=Adrz6NiXqrPvkHuLXp8NUlTnnbnC5H8ztOKfrXS0A4CJ3hzl95fj4p0IrzcH9GTWb64&_nc_zt=24&_nc_ht=scontent.fmnl30-1.fna&_nc_gid=cTbEn_ZsfHdBUlzMKXZbJQ&_nc_ss=7a3a8&oh=00_AfwR_AMyMCMIEF801PMjcRSaiSImgFbORNBSFihJ4NGAlQ&oe=69D15C14" 
                alt="JLYCC Logo" 
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = document.getElementById('footer-logo-fallback');
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div id="footer-logo-fallback" className="w-8 h-8 bg-jly-red rounded-full hidden items-center justify-center">
                <span className="text-white font-heading font-bold text-sm">JLY</span>
              </div>
              <span className="font-heading font-bold text-lg">JESUS LOVES YOU</span>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              City Church<br/>
              Where GENERALS are Made
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/JLYMain" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1877F2] transition-colors" aria-label="Facebook Page">
                <Facebook size={24} />
              </a>
              <a href="https://www.youtube.com/@jlymicentral233" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF0000] transition-colors" aria-label="YouTube Channel">
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
              <li>SEC Reg No: 0000110444</li>
              <li>Registered Non-Profit Organization</li>
              <li><a href="#donate" className="text-jly-red hover:text-white transition-colors font-bold">Donate to our Mission</a></li>
              <li><a href="http://www.jlycc.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">www.jlycc.org</a></li>
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
