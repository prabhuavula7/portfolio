import React, { useState } from 'react';
import { Analytics } from "@vercel/analytics/react";
import MobileMenu from './MobileMenu';
import {
  Header,
  Hero,
  About,
  Skills,
  Experience,
  Education,
  Projects,
  Values,
  Contact,
  Footer,
  ScrollToTop,
  ThemeToggleButton
} from './components';
import { useTheme, useScrollTop, useIntroAnimation, useThreeJSBackground } from './hooks';
import { scrollToSection } from './utils/scrollUtils';
import './index.css';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useTheme();
  const showScrollTop = useScrollTop();
  const threeJsCanvasRef = useThreeJSBackground();
  
  // Initialize intro animation
  useIntroAnimation();

  const handleScrollToSection = (id) => {
    scrollToSection(id, setIsMobileMenuOpen);
  };

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

      <main className="pt-20">
        {/* Hero Section */}
        <Hero 
          threeJsCanvasRef={threeJsCanvasRef} 
          scrollToSection={handleScrollToSection} 
        />

        {/* About Section */}
        <About />

        {/* Skills Section */}
        <Skills />

        {/* Experience Section */}
        <Experience />

        {/* Education Section */}
        <Education />

        {/* Projects Section */}
        <Projects />

        {/* Values Section */}
        <Values />

        {/* Contact Section */}
        <Contact />
      </main>

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
