import React from 'react';

const Projects = () => {
  const featuredProjects = [
    {
      id: 1,
      title: "Sana - Your Empathetic AI Companion",
      field: "AI/ML",
      description: "A privacy-respecting, multilingual AI chatbot built for safe, emotionally aware mental health support.",
      technologies: ["python", "react", "nodejs", "mongodb"],
      achievements: ["Multilingual support", "Emotionally aware", "Privacy-focused"],
      github: "https://github.com/prabhuavula7/Sana"
    },
    {
      id: 2,
      title: "JetScope",
      field: "Data Science",
      description: "A passion project to predict US domestic air travel demand using historical data and machine learning.",
      technologies: ["python", "jupyter", "pandas", "sklearn"],
      achievements: ["Historical data analysis", "Time series forecasting", "Machine learning models"],
      github: "https://github.com/prabhuavula7/JetScope"
    },
    {
      id: 3,
      title: "MCP Tools Server",
      field: "AI/ML",
      description: "A server that provides 40 tools for the MCP framework, allowing for the execution of tools in a chat-like interface.",
      technologies: ["python", "replicate", "cursor", "docker"],
      achievements: ["MCP framework", "Tool execution", "OpenAI integration"],
      github: "https://github.com/prabhuavula7/MCP-Tools-Integration"
    },
    {
      id: 4,
      title: "Geopersona - Interactive Geography Game",
      field: "Full Stack",
      description: "An engaging geography quiz game that tests your knowledge of countries, capitals, and landmarks around the world.",
      technologies: ["openai", "react", "js", "css"],
      achievements: ["Interactive geography quizzes", "AI-powered hints", "Global knowledge testing"],
      github: "https://github.com/prabhuavula7/geopersona",
      liveLink: "https://geopersona.vercel.app"
    }
  ];

  const [currentProjectIndex, setCurrentProjectIndex] = React.useState(0);
  const [scrollThreshold, setScrollThreshold] = React.useState(0);
  const scrollTimeoutRef = React.useRef(null);

  // Auto-shift every 10 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProjectIndex((prev) => (prev + 1) % featuredProjects.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Horizontal navigation with arrow keys and mouse wheel
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setCurrentProjectIndex((prev) => 
        prev === 0 ? featuredProjects.length - 1 : prev - 1
      );
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setCurrentProjectIndex((prev) => (prev + 1) % featuredProjects.length);
    }
  };

  // Mouse wheel for horizontal navigation (accumulate scroll for sensitivity control)
  const handleWheel = (e) => {
    e.preventDefault();
    
    // Add to scroll threshold
    const newThreshold = scrollThreshold + Math.abs(e.deltaY);
    setScrollThreshold(newThreshold);
    
    // Only change project when threshold is reached
    if (newThreshold >= 80) {
      if (e.deltaY > 0) {
        // Scroll down = go right (next project)
        setCurrentProjectIndex((prev) => (prev + 1) % featuredProjects.length);
      } else {
        // Scroll up = go left (previous project)
        setCurrentProjectIndex((prev) => 
          prev === 0 ? featuredProjects.length - 1 : prev - 1
        );
      }
      
      // Reset threshold
      setScrollThreshold(0);
      
      // Prevent rapid changes
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setScrollThreshold(0);
      }, 1500);
    }
  };

  // Touch/swipe support for mobile
  const [touchStart, setTouchStart] = React.useState(null);
  const [touchEnd, setTouchEnd] = React.useState(null);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      // Swipe left = next project
      setCurrentProjectIndex((prev) => (prev + 1) % featuredProjects.length);
    } else if (isRightSwipe) {
      // Swipe right = previous project
      setCurrentProjectIndex((prev) => 
        prev === 0 ? featuredProjects.length - 1 : prev - 1
      );
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Add event listeners
  React.useEffect(() => {
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
      // Mouse wheel
      projectsContainer.addEventListener('wheel', handleWheel, { passive: false });
      
      // Touch events
      projectsContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
      projectsContainer.addEventListener('touchmove', handleTouchMove, { passive: true });
      projectsContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
      
      // Keyboard
      document.addEventListener('keydown', handleKeyDown);
      
      return () => {
        projectsContainer.removeEventListener('wheel', handleWheel);
        projectsContainer.removeEventListener('touchstart', handleTouchStart);
        projectsContainer.removeEventListener('touchmove', handleTouchMove);
        projectsContainer.removeEventListener('touchend', handleTouchEnd);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [scrollThreshold, touchStart, touchEnd]);

  // Function to render technology logo or fallback
  const renderTechLogo = (techName) => {
    try {
      // Special handling for specific technologies with different file types
      if (techName === 'openai') {
        return (
          <img
            src="/logos/openai.png"
            alt="OpenAI logo"
            className="w-6 h-6 object-contain"
            style={{ minWidth: '24px', minHeight: '24px', display: 'block' }}
            onError={(e) => {
              e.target.style.display = 'none';
              // Show fallback when image fails
              const fallback = document.createElement('div');
              fallback.className = 'w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold text-sm';
              fallback.textContent = techName.charAt(0).toUpperCase();
              e.target.parentNode.appendChild(fallback);
            }}
          />
        );
      }
      
      if (techName === 'replicate') {
        return (
          <img
            src="/logos/replicate.jpeg"
            alt="Replicate logo"
            className="w-6 h-6 object-contain"
            style={{ minWidth: '24px', minHeight: '24px', display: 'block' }}
            onError={(e) => {
              e.target.style.display = 'none';
              // Show fallback when image fails
              const fallback = document.createElement('div');
              fallback.className = 'w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold text-sm';
              fallback.textContent = techName.charAt(0).toUpperCase();
              e.target.parentNode.appendChild(fallback);
            }}
          />
        );
      }
      
      if (techName === 'cursor') {
        return (
          <img
            src="/logos/cursor.jpeg"
            alt="Cursor logo"
            className="w-6 h-6 object-contain"
            style={{ minWidth: '24px', minHeight: '24px', display: 'block' }}
            onError={(e) => {
              e.target.style.display = 'none';
              // Show fallback when image fails
              const fallback = document.createElement('div');
              fallback.className = 'w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold text-sm';
              fallback.textContent = techName.charAt(0).toUpperCase();
              e.target.parentNode.appendChild(fallback);
            }}
          />
        );
      }
      
      if (techName === 'sklearn') {
        return (
          <img
            src="/logos/scikitlearn.svg"
            alt="Scikit-learn logo"
            className="w-6 h-6 object-contain"
            style={{ minWidth: '24px', minHeight: '24px', display: 'block' }}
            onError={(e) => {
              e.target.style.display = 'none';
              // Show fallback when image fails
              const fallback = document.createElement('div');
              fallback.className = 'w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold text-sm';
              fallback.textContent = techName.charAt(0).toUpperCase();
              e.target.parentNode.appendChild(fallback);
            }}
          />
        );
      }
      
      // All other technologies use SVG
      return (
        <img
          src={`/logos/${techName}.svg`}
          alt={`${techName} logo`}
          className="w-6 h-6 object-contain"
          style={{ minWidth: '24px', minHeight: '24px', display: 'block' }}
          onError={(e) => {
            e.target.style.display = 'none';
            // Show fallback when image fails
            const fallback = document.createElement('div');
            fallback.className = 'w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold text-sm';
            fallback.textContent = techName.charAt(0).toUpperCase();
            e.target.parentNode.appendChild(fallback);
          }}
        />
      );
    } catch (error) {
      return (
        <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold text-xs">
          {techName.charAt(0).toUpperCase()}
        </div>
      );
    }
  };

  return (
    <section id="projects" className="py-20 bg-section-light dark:bg-section-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-heading mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-content max-w-3xl mx-auto">
            A selection of my most impactful work showcasing AI/ML Engineering, Full Stack Development, and Data Science
          </p>
        </div>

        {/* Featured Projects Slider */}
        <div id="projects-container" className="max-w-6xl mx-auto mb-16">
          {/* Project Card */}
          <div className="glass-card p-8 rounded-3xl transition-all duration-500 mb-8 container-glow">
            {(() => {
              const project = featuredProjects[currentProjectIndex];
              return (
                <>
                  {/* Project Header */}
                  <div className="mb-6">
                    <span 
                      className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light text-xs font-medium rounded-full border border-primary/20 transition-all duration-300 hover:scale-105 cursor-default"
                      onMouseEnter={(e) => {
                        e.target.style.setProperty('background-color', 'var(--primary)', 'important');
                        e.target.style.setProperty('color', 'white', 'important');
                        e.target.style.setProperty('border-color', 'var(--primary)', 'important');
                        e.target.style.setProperty('box-shadow', '0 10px 25px rgba(139, 69, 19, 0.3)', 'important');
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.removeProperty('background-color');
                        e.target.style.removeProperty('color');
                        e.target.style.removeProperty('border-color');
                        e.target.style.removeProperty('box-shadow');
                      }}
                    >
                      {project.field}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-3xl font-bold text-heading mb-4">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p className="text-content text-lg leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Technologies Used */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-heading mb-3">Technologies</h4>
                    <div className="flex gap-4">
                      {project.technologies.map((tech, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-lg p-2 mb-2">
                            {renderTechLogo(tech)}
                          </div>
                          <span className="text-sm text-content capitalize">{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Achievements */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-heading mb-3">Key Achievements</h4>
                    <ul className="space-y-2">
                      {project.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start text-content text-base">
                          <span className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 bg-black dark:bg-white"></span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* GitHub Link */}
                  <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center text-primary transition-colors duration-300 text-lg font-medium px-6 py-3 border border-primary/20 rounded-xl"
                      onMouseEnter={(e) => {
                        e.target.style.setProperty('background-color', 'var(--primary)', 'important');
                        e.target.style.setProperty('color', 'white', 'important');
                        e.target.style.setProperty('border-color', 'var(--primary)', 'important');
                        e.target.style.setProperty('box-shadow', '0 10px 25px rgba(139, 69, 19, 0.3)', 'important');
                        e.target.style.setProperty('transform', 'scale(1.05)', 'important');
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.removeProperty('background-color');
                        e.target.style.removeProperty('color');
                        e.target.style.removeProperty('border-color');
                        e.target.style.removeProperty('box-shadow');
                        e.target.style.removeProperty('transform');
                      }}
                    >
                      <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                      </svg>
                      View on GitHub
                    </a>
                    
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-accent hover:bg-accent/80 text-white transition-all duration-300 text-lg font-medium px-6 py-3 rounded-xl hover:scale-105 hover:shadow-lg"
                      >
                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Play Live
                      </a>
                    )}
                  </div>
                </>
              );
            })()}
          </div>

          {/* Navigation indicator */}
          <div className="text-center text-sm text-content opacity-70 mb-8">
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <span>←</span>
                <span>Navigate with arrow keys, mouse wheel, or swipe</span>
                <span>→</span>
              </div>
              <div className="text-xs opacity-80">
                Auto-advancing every 10 seconds
              </div>
            </div>
          </div>
        </div>

        {/* Additional Projects & GitHub Section */}
        <div className="text-center">
          <div className="glass-card p-8 rounded-3xl max-w-4xl mx-auto container-glow">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow-lg mb-4">
                <img
                  src="/logos/github.svg"
                  alt="GitHub"
                  className="w-10 h-10"
                />
              </div>
              <h3 className="text-2xl font-bold text-heading mb-3">
                Want to See More?
              </h3>
              <p className="text-content leading-relaxed text-lg mb-6 max-w-2xl">
                These are just a few highlights from my portfolio. I have many more projects 
                covering other fascinating fields. Check out my GitHub 
                profile to explore all my work!
              </p>
              <a
                href="https://github.com/prabhuavula7"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-button bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 inline-flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
                Visit My GitHub Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
