import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'blog', label: 'Blog' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'values', label: 'Values' },
  { id: 'contact', label: 'Contact' }
];

const sectionItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'blog', label: 'Writing' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'values', label: 'Values' },
  { id: 'contact', label: 'Contact' }
];

const Header = ({ scrollToSection, theme, setTheme, isMobileMenuOpen, setIsMobileMenuOpen, ThemeToggleButton }) => {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const updateHeaderState = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 24);

      if (location.pathname !== '/') {
        setPastHero(true);
        return;
      }

      const hero = document.getElementById('home');
      setPastHero(hero ? hero.getBoundingClientRect().bottom <= 104 : currentScrollY > window.innerHeight - 104);

      const currentSection = sectionItems.reduce((current, item) => {
        const element = document.getElementById(item.id);
        if (!element) return current;

        const rect = element.getBoundingClientRect();
        return rect.top <= 140 ? item.id : current;
      }, 'home');

      setActiveSection(currentSection);
    };

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
    window.addEventListener('resize', updateHeaderState);
    return () => {
      window.removeEventListener('scroll', updateHeaderState);
      window.removeEventListener('resize', updateHeaderState);
    };
  }, [location.pathname]);

  const handleNavClick = (event, id) => {
    event.preventDefault();
    if (id === 'blog') {
      navigate('/blog');
      return;
    }
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      return;
    }
    scrollToSection(id, setIsMobileMenuOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderThemeToggle = () => React.createElement(ThemeToggleButton, { theme, setTheme });
  const renderBareThemeToggle = () => React.createElement(ThemeToggleButton, { theme, setTheme, variant: 'bare' });
  const activeSectionLabel = sectionItems.find((item) => item.id === activeSection)?.label || 'Home';

  return (
    <header className={`site-header fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'header-scrolled' : 'header-transparent'}`}>
      <nav className={`desktop-nav hidden md:flex items-center ${pastHero ? 'desktop-nav-pill' : 'desktop-nav-full'}`} aria-label="Primary navigation">
        <a
          href="/#home"
          onClick={(event) => handleNavClick(event, 'home')}
          className="nav-brand text-2xl font-bold text-header-link rounded-lg p-3 transition-all duration-300 hover:text-accent"
        >
          APK
        </a>

        <div className="desktop-nav-links flex items-center">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.id === 'blog' ? '/blog' : `/#${item.id}`}
              onClick={(event) => handleNavClick(event, item.id)}
              className="nav-link text-header-link font-medium transition-all duration-200 px-2 lg:px-3 py-2 rounded-lg hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="desktop-nav-theme">
          {renderBareThemeToggle()}
        </div>
      </nav>

      <nav className="mobile-dock md:hidden container mx-auto px-6 py-4 flex justify-between items-center" aria-label="Mobile navigation">
        <a
          href="/#home"
          onClick={(event) => handleNavClick(event, 'home')}
          className="text-2xl font-bold text-header-link rounded-lg p-3 transition-all duration-300 hover:text-accent"
        >
          APK
        </a>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-header-link hover:text-primary p-2 rounded-lg transition-all duration-300"
            aria-label="Toggle Mobile Menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="md:hidden">
            {renderThemeToggle()}
          </div>
        </div>
      </nav>

      {location.pathname === '/' && (
        <nav className={`section-rail hidden md:flex ${scrolled ? 'is-visible' : ''}`} aria-label="Section navigation">
          <div className="section-rail-current" aria-hidden="true">
            <span className="section-rail-line" />
            <span className="section-rail-current-label">{activeSectionLabel}</span>
            <span className="section-rail-line" />
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
