import React from 'react';

const Hero = ({ threeJsCanvasRef, scrollToSection }) => {
  const handleNavClick = (id) => {
    scrollToSection(id);
  };

  return (
    <section id="home" className="relative bg-section-dark flex items-center justify-center min-h-screen pt-20 overflow-x-hidden">
      {/* Three.js Canvas */}
      <canvas ref={threeJsCanvasRef} id="threejs-canvas"></canvas>

      <div className="container mx-auto px-6 py-12 text-center relative z-10 hero-content">
        {/* Text with shaded orange/red gradient and depth */}
        <h1 
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 intro-text drop-shadow-2xl"
          style={{ 
            color: 'var(--text-primary)',
            textShadow: '2px 2px 8px rgba(139, 69, 19, 0.8), 0 0 20px rgba(139, 69, 19, 0.4), 0 0 40px rgba(255, 255, 255, 0.3)' 
          }}
        >
          <span>Hey,</span> <span>I'm</span> <span>Prabhu</span> <span>Kiran</span> <span>Avula,</span> <br className="hidden md:block" />
          <span>a</span> <span>Full Stack Developer and AI/ML Enthusiast</span>
        </h1>
        
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 opacity-0 animate-fade-in delay-2000 font-medium drop-shadow-lg"
           style={{ color: 'var(--text-primary)' }}>
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
