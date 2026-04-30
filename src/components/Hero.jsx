import React from 'react';

const Hero = ({ threeJsCanvasRef, scrollToSection }) => {
  const handleNavClick = (id) => {
    scrollToSection(id);
  };

  return (
    <section id="home" className="relative flex items-center justify-center min-h-[calc(100vh-5rem)] overflow-hidden">
      {/* Three.js canvas */}
      <canvas ref={threeJsCanvasRef} id="threejs-canvas" className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      <div className="container mx-auto px-6 py-12 text-center relative z-10 hero-content">
        <h1
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 intro-text"
          style={{
            background: 'linear-gradient(160deg, var(--text-primary) 35%, var(--primary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          <span>Hey,</span> <span>I'm</span> <span>Prabhu</span> <span>Kiran</span> <span>Avula,</span> <br className="hidden md:block" />
          <span>a</span> <span>Full Stack Developer and AI/ML Enthusiast</span>
        </h1>

        <p
          className="text-lg md:text-xl max-w-3xl mx-auto mb-10 opacity-0 animate-fade-in delay-2000 font-medium"
          style={{ color: 'var(--text-secondary)' }}
        >
          I build intelligent systems that learn, adapt, and deliver value. <br className="hidden md:block" />
          From models to products — I turn complexity into clarity.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 opacity-0 animate-fade-in delay-2500">
          <a
            href="#projects"
            onClick={() => handleNavClick('projects')}
            className="btn-primary"
          >
            View My Work
          </a>
          <a
            href="#contact"
            onClick={() => handleNavClick('contact')}
            className="btn-secondary"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
