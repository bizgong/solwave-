import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../../constants';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
          onClick={() => { navigate('/'); window.scrollTo(0,0); }}
          className="cursor-pointer z-50"
        >
          <h1 className="text-2xl font-bold tracking-widest text-brand-text">
            솔웨이브<span className="text-brand-accent">.</span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-12">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide transition-colors duration-300 ${
                  isActive ? 'text-brand-accent font-bold' : 'text-brand-text hover:text-brand-accent'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button 
            onClick={() => navigate('/contact')}
            className="px-6 py-2 border border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white transition-all duration-300 text-sm tracking-wide rounded-sm font-medium"
          >
            실시간 예약
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden z-50">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-brand-text transition-colors duration-300">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-white/95 backdrop-blur-xl flex flex-col justify-center items-center space-y-8 transition-transform duration-500 ease-in-out md:hidden ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={handleNavClick}
              className="text-2xl font-light tracking-widest text-brand-text hover:text-brand-accent transition-colors"
            >
              {link.name}
            </NavLink>
          ))}
          <button 
             onClick={() => { handleNavClick(); navigate('/contact'); }}
             className="mt-8 px-8 py-3 bg-brand-accent text-white text-lg font-medium tracking-wide shadow-lg shadow-brand-accent/30"
          >
            예약 문의하기
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;