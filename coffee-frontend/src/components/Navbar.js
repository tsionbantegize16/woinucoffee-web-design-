import { Link } from 'react-router-dom';
import { Coffee, Menu as MenuIcon, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/menu', label: 'Menu' },
    { path: '/about', label: 'About' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/blog', label: 'Blog' },
  ];

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-md border-b-4" style={{borderBottomColor: '#D4A574'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
            <img 
              src="/logo.jpg" 
              alt="Woinu Coffee Logo" 
              className="h-16 w-auto object-contain"
            />
            <div>
              <span className="text-2xl font-bold text-coffee-900">Woinu Coffee</span>
              <p className="text-xs" style={{color: '#D4A574'}}>ወይኑ ቡና • Ethiopian Coffee</p>
              <p className="text-sm font-semibold mt-1" style={{color: '#D4A574'}}>
                Discover The Art Of Perfect Coffee
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-coffee-800 hover:text-white transition-all duration-300 font-medium px-4 py-2 rounded-lg"
                style={{
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #D4A574 0%, #C19A6B 100%)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              to="/contact" 
              className="px-6 py-2 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #D4A574 0%, #C19A6B 100%)',
                boxShadow: '0 4px 6px rgba(212, 165, 116, 0.3)'
              }}
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{color: '#D4A574'}}
          >
            {isOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-cream-50" style={{background: 'linear-gradient(to bottom, #FFF8E7, #F5E6D3)', borderTop: '2px solid #D4A574'}}>
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block py-3 px-4 rounded-lg transition-colors text-coffee-800 font-medium"
                style={{
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #D4A574 0%, #C19A6B 100%)';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#6B5B45';
                }}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              to="/contact" 
              className="block py-3 px-4 rounded-lg font-semibold text-white text-center mt-3"
              style={{
                background: 'linear-gradient(135deg, #D4A574 0%, #C19A6B 100%)',
                boxShadow: '0 4px 6px rgba(212, 165, 116, 0.3)'
              }}
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
