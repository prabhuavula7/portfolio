import React from 'react';
import profileImg from '../assets/profileImg.jpeg';

const About = () => {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="orb orb-primary orb-a" style={{ width: 480, height: 480, top: '-120px', right: '-80px' }} aria-hidden="true" />
      <div className="orb orb-accent orb-b" style={{ width: 320, height: 320, bottom: '-60px', left: '-60px' }} aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-heading mb-2 reveal">
            About Me
          </h2>
          <div className="section-heading-line reveal" />
        </div>

        {/*
          Bento grid — 4 cols:
          [Profile (1, row-span-2)] [Global (2)] [Journey (1)]
          [Profile (cont'd)       ] [Philosophy(2)] [Interests(1)]
        */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 max-w-6xl mx-auto">

          {/* Box 1: Profile — tall left card */}
          <div className="glass-card p-8 rounded-2xl md:row-span-2 group hover-float container-glow reveal reveal-d1 flex flex-col items-center justify-center text-center">
            <div className="relative mb-5">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
              <img
                src={profileImg}
                alt="Prabhu Kiran Avula"
                className="relative z-10 w-28 h-28 object-cover rounded-full shadow-2xl border-4 border-white/20 dark:border-gray-800/20"
              />
            </div>
            <h3 className="text-xl font-bold text-heading mb-1">Prabhu Kiran Avula</h3>
            <p className="text-sm font-semibold text-accent mb-3">APK</p>
            <p className="text-content leading-relaxed text-sm">
              Full Stack Developer &amp; AI/ML Engineer building intelligent, scalable systems that make an impact.
            </p>
          </div>

          {/* Box 2: Global Perspective — wide top right */}
          <div className="glass-card p-6 rounded-2xl md:col-span-2 group hover-float container-glow reveal reveal-d2">
            <div className="h-full flex flex-col">
              <div className="bento-icon w-10 h-10 rounded-xl flex items-center justify-center mb-3 flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-heading mb-2">Global Perspective</h3>
              <p className="text-content leading-relaxed text-sm">
                Having grown up in <strong>nine cities across four countries</strong>, I've developed a global perspective that shapes how I approach challenges with curiosity, empathy, and adaptability.
              </p>
            </div>
          </div>

          {/* Box 3: Journey — top far right */}
          <div className="glass-card p-6 rounded-2xl md:col-span-1 group hover-float container-glow reveal reveal-d3">
            <div className="h-full flex flex-col">
              <div className="bento-icon w-10 h-10 rounded-xl flex items-center justify-center mb-3 flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-heading mb-2">Origin Story</h3>
              <p className="text-content leading-relaxed text-xs">
                Started with a webpage about aircraft types in high school. That spark became a lifelong obsession with intelligent systems.
              </p>
            </div>
          </div>

          {/* Box 4: Philosophy — wide bottom middle */}
          <div className="glass-card p-6 rounded-2xl md:col-span-2 group hover-float container-glow reveal reveal-d4">
            <div className="h-full flex flex-col">
              <div className="bento-icon w-10 h-10 rounded-xl flex items-center justify-center mb-3 flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-heading mb-2">Philosophy</h3>
              <p className="text-content leading-relaxed text-sm mb-2">
                Staying curious is the key to staying relevant. I'm always exploring new tools, languages, and ideas to push the boundaries of what's possible.
              </p>
              <p className="text-content leading-relaxed text-sm">
                I love being at the crossroads of technology, impact, and human-centered design.
              </p>
            </div>
          </div>

          {/* Box 5: Interests & Connect — bottom right */}
          <div className="glass-card p-6 rounded-2xl md:col-span-1 group hover-float container-glow reveal reveal-d5">
            <div className="h-full flex flex-col">
              <div className="bento-icon w-10 h-10 rounded-xl flex items-center justify-center mb-3 flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-heading mb-2">Beyond Code</h3>
              <p className="text-content leading-relaxed text-xs">
                Aviation, chess, history, economics, and sports. Let's connect and build something meaningful.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
