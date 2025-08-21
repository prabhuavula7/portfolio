import React from 'react';
import profileImg from '../assets/profileImg.jpeg';

const About = () => {
  return (
    <section id="about" className="py-20 bg-section-light dark:bg-section-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-heading mb-4">
            About Me
          </h2>

        </div>
        
        {/* Cohesive Puzzle Grid - Small gaps for glow effects */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 max-w-6xl mx-auto p-3">
          
          {/* Box 1: Profile - Top left (2x2) */}
          <div className="glass-card p-6 rounded-tl-3xl md:col-span-2 lg:col-span-2 group hover:scale-105 transition-all duration-300 container-glow">
            <div className="flex flex-col items-center text-center h-full">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <img 
                  src={profileImg} 
                  alt="Prabhu Kiran Avula" 
                  className="relative z-10 w-20 h-20 object-cover rounded-full shadow-2xl border-4 border-white/20 dark:border-gray-800/20"
                />
              </div>
              <h3 className="text-lg font-bold text-heading mb-2">I'm Prabhu Kiran Avula</h3>
              <p className="text-base font-semibold text-accent mb-2">or APK for short</p>
              <p className="text-content leading-relaxed text-sm">
                AI/ML Engineer and Data Scientist passionate about building intelligent, scalable systems.
              </p>
            </div>
          </div>
          
          {/* Box 2: Global Perspective - Top right (2x1) */}
          <div className="glass-card p-6 rounded-tr-3xl md:col-span-2 lg:col-span-2 group hover:scale-105 transition-all duration-300 container-glow">
            <div className="h-full flex flex-col">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-heading mb-2">Global Perspective</h3>
              <p className="text-content leading-relaxed text-sm">
                Having grown up in <strong>nine cities across four countries</strong>, I've developed a global perspective that shapes how I approach challenges with curiosity, empathy, and adaptability.
              </p>
            </div>
          </div>
          
          {/* Box 3: Journey - Bottom left (1x2) */}
          <div className="glass-card p-6 rounded-bl-3xl md:col-span-1 lg:col-span-1 group hover:scale-105 transition-all duration-300 container-glow">
            <div className="h-full flex flex-col">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-heading mb-2">My Journey</h3>
              <p className="text-content leading-relaxed text-xs">
                My journey into tech began in high school with a basic webpage about aircraft types. That small project sparked a lifelong fascination with intelligent systems.
              </p>
            </div>
          </div>
          
          {/* Box 4: Philosophy - Bottom center (2x2) */}
          <div className="glass-card p-6 md:col-span-2 lg:col-span-2 group hover:scale-105 transition-all duration-300 container-glow">
            <div className="h-full flex flex-col">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14v7h9a2 2 0 012 2v0a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2h9a2 2 0 012 2v0a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-heading mb-2">Philosophy</h3>
              <p className="text-content leading-relaxed text-sm mb-2">
                I believe that staying curious is the key to staying relevant. I'm always exploring new tools, languages, and ideas to push the boundaries of what's possible.
              </p>
              <p className="text-content leading-relaxed text-sm">
                I love being at the crossroads of technology, impact, and human-centered design, whether building AI assistants for mental health or optimizing document intelligence.
              </p>
            </div>
          </div>
          
          {/* Box 5: Interests & Connect - Bottom right (1x2) */}
          <div className="glass-card p-6 rounded-br-3xl md:col-span-1 lg:col-span-1 group hover:scale-105 transition-all duration-300 container-glow">
            <div className="h-full flex flex-col">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-heading mb-2">Interests & Connect</h3>
              <p className="text-content leading-relaxed text-xs">
                Outside of work, I'm an aviation enthusiast, chess player, lover of history and economics, and avid explorer. Let's connect and build something meaningful together!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
