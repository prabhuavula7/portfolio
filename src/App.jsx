import React, { useEffect, useState } from 'react';
import { Analytics } from "@vercel/analytics/react";
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import {
  Header,
  Footer,
  ScrollToTop,
  ThemeToggleButton
} from './components';
import { useTheme, useScrollTop } from './hooks';
import { scrollToSection } from './utils/scrollUtils';
import Home from './pages/Home';
import BlogIndex from './pages/BlogIndex';
import BlogPost from './pages/BlogPost';
import './index.css';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useTheme();
  const showScrollTop = useScrollTop();
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollToSection = (id) => {
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      setIsMobileMenuOpen(false);
      return;
    }
    scrollToSection(id, setIsMobileMenuOpen);
  };

  useEffect(() => {
    if (location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname, location.hash]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="antialiased overflow-x-hidden transition-all duration-500 bg-white dark:bg-black text-black dark:text-white">
      {/* Header */}
      <Header
        scrollToSection={handleScrollToSection}
        theme={theme}
        setTheme={setTheme}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        ThemeToggleButton={ThemeToggleButton}
      />

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <MobileMenu
          onClose={() => setIsMobileMenuOpen(false)}
          scrollToSection={handleScrollToSection}
          ThemeToggleButton={() => <ThemeToggleButton theme={theme} setTheme={setTheme} />}
        />
      )}
      <Routes>
        <Route path="/" element={<Home scrollToSection={handleScrollToSection} />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTop showScrollTop={showScrollTop} />

      {/* Analytics */}
      <Analytics />
    </div>
  );
}

export default App;
