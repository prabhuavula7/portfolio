import React, { useEffect } from 'react';
import {
  Hero,
  About,
  Skills,
  Experience,
  Education,
  Projects,
  Values,
  Contact,
  BlogPreview
} from '../components';
import { useIntroAnimation, useThreeJSBackground } from '../hooks';
import { scrollToSection } from '../utils/scrollUtils';
import { useLocation } from 'react-router-dom';

const Home = ({ scrollToSection: handleScrollToSection }) => {
  const threeJsCanvasRef = useThreeJSBackground();
  const location = useLocation();

  useIntroAnimation();

  useEffect(() => {
    if (!location.hash) return;
    const target = location.hash.replace('#', '');
    if (!target) return;
    setTimeout(() => {
      scrollToSection(target);
    }, 50);
  }, [location.hash]);

  return (
    <main className="pt-20">
      <Hero threeJsCanvasRef={threeJsCanvasRef} scrollToSection={handleScrollToSection} />
      <About />
      <Experience />
      <Skills />
      <BlogPreview />
      <Education />
      <Projects />
      <Values />
      <Contact />
    </main>
  );
};

export default Home;
