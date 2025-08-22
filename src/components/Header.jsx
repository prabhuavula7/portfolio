import React from 'react';
import { Sun, Moon, Menu } from 'lucide-react';

const Header = ({ scrollToSection, theme, setTheme, isMobileMenuOpen, setIsMobileMenuOpen, ThemeToggleButton }) => {
  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'values', label: 'Values' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id) => {
    scrollToSection(id, setIsMobileMenuOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className="glass fixed top-0 left-0 right-0 z-50 border-b border-white/10"
      style={{
        backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: theme === 'dark' ? '0 8px 32px 0 rgba(0, 0, 0, 0.5)' : '0 8px 32px 0 rgba(0, 0, 0, 0.15)'
      }}
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a 
          href="#home" 
          onClick={() => handleNavClick('home')} 
          className="text-2xl font-bold text-header-link rounded-lg p-3 transition-all duration-300"
          onMouseEnter={(e) => {
            e.target.style.setProperty('background-color', 'rgba(255, 255, 255, 0.15)', 'important');
            e.target.style.setProperty('color', 'var(--header-link-hover)', 'important');
            e.target.style.setProperty('transform', 'scale(1.02)', 'important');
          }}
          onMouseLeave={(e) => {
            e.target.style.removeProperty('background-color');
            e.target.style.removeProperty('color');
            e.target.style.removeProperty('transform');
          }}
        >
          APK
        </a>
        
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className="text-header-link font-medium transition-all duration-300 px-3 py-2 rounded-lg"
              onMouseEnter={(e) => {
                e.target.style.setProperty('background-color', 'rgba(255, 255, 255, 0.15)', 'important');
                e.target.style.setProperty('color', 'var(--header-link-hover)', 'important');
                e.target.style.setProperty('transform', 'scale(1.05)', 'important');
              }}
              onMouseLeave={(e) => {
                e.target.style.removeProperty('background-color');
                e.target.style.removeProperty('color');
                e.target.style.removeProperty('transform');
              }}
            >
              {item.label}
            </a>
          ))}
          
          <div className="ml-4 flex items-center">
            <ThemeToggleButton theme={theme} setTheme={setTheme} />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-header-link hover:text-header-link-hover p-2 rounded-lg transition-all duration-300"
            aria-label="Toggle Mobile Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          {/* Theme toggle for mobile */}
          <div className="md:hidden">
            <ThemeToggleButton theme={theme} setTheme={setTheme} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
