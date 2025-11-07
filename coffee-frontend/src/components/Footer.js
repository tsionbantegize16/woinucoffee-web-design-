import { Mail, Phone, MapPin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-coffee-900 via-coffee-800 to-coffee-900 text-white">
      {/* Decorative Ethiopian Pattern */}
      <div className="border-t-4" style={{borderImage: 'linear-gradient(to right, #D4A574, #FFD700, #D4A574) 1'}}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About with Logo */}
          <div>
            <div className="mb-4">
              <img 
                src="/logo.jpg" 
                alt="Woinu Coffee Logo" 
                className="h-20 w-auto object-contain mb-3"
              />
              <h3 className="text-xl font-bold" style={{color: '#D4A574'}}>Woinu Coffee</h3>
              <p className="text-sm" style={{color: '#D4A574'}}>ወይኑ ቡና</p>
            </div>
            <p className="text-amber-100 text-sm leading-relaxed">
              Established in 2025, WoinuCoffee partners with smallholder farmers to export Ethiopia’s most distinctive coffees—
              honoring heritage, advancing sustainability, and connecting origin to the world.
            </p>
            <p className="text-amber-200 text-xs mt-3 italic">
              "ቡና ቦታ እንዲታወቅ ትርፋማ ነው" - Coffee thrives when its origin is known
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4" style={{color: '#D4A574'}}>Explore</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-amber-100 hover:text-white transition-colors flex items-center"><span className="mr-2" style={{color: '#D4A574'}}>›</span>Home</Link></li>
              <li><Link to="/menu" className="text-amber-100 hover:text-white transition-colors flex items-center"><span className="mr-2" style={{color: '#D4A574'}}>›</span>Menu</Link></li>
              <li><Link to="/about" className="text-amber-100 hover:text-white transition-colors flex items-center"><span className="mr-2" style={{color: '#D4A574'}}>›</span>About</Link></li>
              <li><Link to="/gallery" className="text-amber-100 hover:text-white transition-colors flex items-center"><span className="mr-2" style={{color: '#D4A574'}}>›</span>Gallery</Link></li>
              <li><Link to="/blog" className="text-amber-100 hover:text-white transition-colors flex items-center"><span className="mr-2" style={{color: '#D4A574'}}>›</span>Blog</Link></li>
              <li><Link to="/contact" className="text-amber-100 hover:text-white transition-colors flex items-center"><span className="mr-2" style={{color: '#D4A574'}}>›</span>Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4" style={{color: '#D4A574'}}>Connect / ግንኙነት</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-amber-100">
                <Phone className="w-5 h-5" style={{color: '#D4A574'}} />
                <span>+251911204473</span>
              </li>
              <li className="flex items-center space-x-2 text-amber-100">
                <Mail className="w-5 h-5" style={{color: '#D4A574'}} />
                <span>partnerships@woinucoffee.com</span>
              </li>
              <li className="flex items-start space-x-2 text-amber-100">
                <MapPin className="w-5 h-5 mt-1" style={{color: '#D4A574'}} />
                <span>Addis Ababa, Ethiopia<br />አዲስ አበባ፣ ኢትዮጵያ</span>
              </li>
            </ul>
          </div>

          {/* Contact Button */}
          <div>
            <h3 className="font-bold text-lg mb-4" style={{color: '#D4A574'}}>Connect With Us</h3>
            <Link 
              to="/contact" 
              className="inline-block px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #D4A574 0%, #C19A6B 100%)',
                boxShadow: '0 4px 6px rgba(212, 165, 116, 0.3)'
              }}
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-6" style={{borderColor: '#D4A574'}}>
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-amber-100">
            <p className="mb-2 md:mb-0 flex items-center">
              &copy; 2025 WoinuCoffee. Made with <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" /> for Ethiopian growers and global partners
            </p>
            <p className="text-xs">
              <span style={{color: '#D4A574'}}>ከኢትዮጵያ ጋር በጣም ጥሩ ቡና</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
