import React, { useState } from 'react';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filterText, setFilterText] = useState('');
  const [showAll, setShowAll] = useState(false);

  const skillCategories = [
    {
      id: 'ai-ml',
      name: 'AI & Machine Learning',
      skills: [
        { name: 'OpenAI', logo: '/logos/openai.png' },
        { name: 'Claude', logo: '/logos/claude.png' },
        { name: 'Gemini', logo: '/logos/gemini.png' },
        { name: 'ElevenLabs', logo: '/logos/elevenlabs.png' },
        { name: 'Replicate', logo: '/logos/replicate.jpeg' },
        { name: 'TensorFlow', logo: '/logos/tensorflow.svg' },
        { name: 'PyTorch', logo: '/logos/pytorch.svg' },
        { name: 'Pandas', logo: '/logos/pandas.svg' },
        { name: 'NumPy', logo: '/logos/numpy.svg' },
        { name: 'Scikit-learn', logo: '/logos/scikitlearn.svg' },
        { name: 'Jupyter', logo: '/logos/jupyter.svg' }
      ]
    },
    {
      id: 'frontend',
      name: 'Frontend Development',
      skills: [
        { name: 'React', logo: '/logos/react.svg' },
        { name: 'JavaScript', logo: '/logos/js.svg' },
        { name: 'TypeScript', logo: '/logos/ts.svg' },
        { name: 'HTML', logo: '/logos/html.svg' },
        { name: 'CSS', logo: '/logos/css.svg' },
        { name: 'Tailwind CSS', logo: '/logos/tailwindcss.svg' },
        { name: 'Next.js', logo: '/logos/nextjs.svg' },
        { name: 'Figma', logo: '/logos/figma.svg' }
      ]
    },
    {
      id: 'backend',
      name: 'Backend Development',
      skills: [
        { name: 'Python', logo: '/logos/python.svg' },
        { name: 'Node.js', logo: '/logos/nodejs.svg' },
        { name: 'Express.js', logo: '/logos/express.svg' },
        { name: 'Supabase', logo: '/logos/supabase.jpeg' },
        { name: 'MongoDB', logo: '/logos/mongodb.svg' },
        { name: 'MySQL', logo: '/logos/mysql.svg' },
        { name: 'Redis', logo: '/logos/redis.svg' },
        { name: 'Git', logo: '/logos/git.svg' },
        { name: 'Java', logo: '/logos/java.svg' },
        { name: 'Rust', logo: '/logos/rust.svg' }
      ]
    },
    {
      id: 'tools',
      name: 'Tools & Platforms',
      skills: [
        { name: 'Cursor', logo: '/logos/cursor.jpeg' },
        { name: 'VS Code', logo: '/logos/vscode.svg' },
        { name: 'n8n', logo: '/logos/n8n.svg' },
        { name: 'Tableau', logo: '/logos/tableau.svg' },
        { name: 'Postman', logo: '/logos/postman.svg' },
        { name: 'Docker', logo: '/logos/docker.svg' },
        { name: 'AWS', logo: '/logos/aws.svg' },
        { name: 'Azure', logo: '/logos/azure.svg' },
        { name: 'GCP', logo: '/logos/gcp.svg' },
        { name: 'GitHub', logo: '/logos/github.svg' },
        { name: 'Auth0', logo: '/logos/auth0.png' },
        { name: 'Datadog', logo: '/logos/datadog.png' },
        { name: 'Stripe', logo: '/logos/stripe.png' }
      ]
    }
  ];

  const allSkills = skillCategories.flatMap(category => 
    category.skills.map(skill => ({ ...skill, category: category.id }))
  );

  const baseFiltered = activeCategory === 'all'
    ? allSkills
    : skillCategories.find(cat => cat.id === activeCategory)?.skills || [];

  const filteredSkills = baseFiltered.filter(s =>
    s.name.toLowerCase().includes(filterText.trim().toLowerCase())
  );

  // Prioritize common techs for the overview
  const prioritize = (list) => {
    const priority = [
      'React','JavaScript','TypeScript','Python','Node.js','Next.js','OpenAI','Claude',
      'Gemini','Supabase','AWS','Azure','GCP','Docker','Stripe','Auth0','Datadog',
      'MongoDB','Postman','GitHub','Cursor','TensorFlow','PyTorch','Scikit-learn',
      'Pandas','NumPy','Jupyter','ElevenLabs','Replicate'
    ];

    const idx = (name) => {
      const i = priority.findIndex(p => p.toLowerCase() === name.toLowerCase());
      return i === -1 ? priority.length : i;
    };

    return [...list].sort((a, b) => {
      const ia = idx(a.name);
      const ib = idx(b.name);
      if (ia !== ib) return ia - ib;
      return a.name.localeCompare(b.name);
    });
  };

  // Use prioritized order for the overview (All tab) when no filter is active
  const displaySkills = (activeCategory === 'all' && filterText.trim() === '')
    ? prioritize(filteredSkills)
    : filteredSkills;

  const renderSkillLogo = (skill) => {
    if (skill.name === 'GitHub') {
      return (
        <div className="w-12 h-12 flex items-center justify-center" title={skill.name} aria-label={skill.name}>
          <span className="github-mark w-10 h-10" aria-hidden="true" />
        </div>
      );
    }

    return (
      <div className="w-12 h-12 flex items-center justify-center" title={skill.name} aria-label={skill.name}>
        <img
          src={skill.logo}
          alt={`${skill.name} logo`}
          className="max-w-full max-h-full object-contain"
          onError={(e) => {
            e.target.style.display = 'none';
            const parent = e.target.parentNode;
            if (parent) {
              let fallback = parent.querySelector('.skill-fallback');
              if (!fallback) {
                fallback = document.createElement('div');
                fallback.className = 'skill-fallback w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm';
                fallback.textContent = skill.name.charAt(0);
                parent.appendChild(fallback);
              } else {
                fallback.style.display = 'flex';
              }
            }
          }}
        />
      </div>
    );
  };

  return (
    <section id="skills" className="py-20 bg-section-light dark:bg-section-dark relative overflow-hidden">
      <div className="orb orb-accent orb-c" style={{ width: 380, height: 380, top: '-60px', right: '-60px' }} aria-hidden="true" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-heading mb-2 reveal">
            Tech Stack
          </h2>
          <div className="section-heading-line reveal" />
          <p className="text-xl text-content max-w-3xl mx-auto mt-4 reveal reveal-d2">
            A comprehensive toolkit for building intelligent systems and modern applications
          </p>
        </div>

        {/* Main Tech Stack Panel */}
        <div className="glass-card p-8 rounded-3xl max-w-6xl mx-auto">
          
          {/* Panel Header with Category Tabs */}
          <div className="bg-gradient-to-r from-primary/5 to-accent/5" style={{ borderBottom: '1px solid var(--border)' }}>
            <div className="flex flex-wrap justify-center gap-2 p-6">
              <button
                onClick={() => { setActiveCategory('all'); setShowAll(false); setFilterText(''); }}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  activeCategory === 'all'
                    ? 'glass-button bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                    : 'glass-button hover:bg-gradient-to-r hover:from-primary/20 hover:to-accent/20'
                }`}
              >
                Overview
              </button>
              {skillCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => { setActiveCategory(category.id); setShowAll(false); setFilterText(''); }}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'glass-button bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                      : 'glass-button hover:bg-gradient-to-r hover:from-primary/20 hover:to-accent/20'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Search / filter input */}
          <div className="p-6 flex items-center justify-center gap-4">
            <input
              type="search"
              value={filterText}
              onChange={(e) => { setFilterText(e.target.value); setShowAll(false); }}
              placeholder="Search technologies (e.g. React, Stripe, Auth0)"
              className="w-full max-w-xl px-4 py-2 rounded-xl border border-input bg-input text-input focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              aria-label="Filter technologies"
            />
          </div>
          
          {/* Panel Content - Logo Wall */}
          <div className="p-8">
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-x-4 gap-y-8">
              {(() => {
                const limit = 20;
                const listToShow = (!showAll && displaySkills.length > limit) ? displaySkills.slice(0, limit) : displaySkills;

                return listToShow.map((skill) => (
                  <div
                    key={`${skill.category}-${skill.name}`}
                    className="flex flex-col items-center gap-2 group cursor-default"
                    tabIndex={0}
                    aria-label={skill.name}
                  >
                    <div className="w-12 h-12 flex items-center justify-center transition-all duration-200 group-hover:scale-110 group-hover:-translate-y-1">
                      {renderSkillLogo(skill)}
                    </div>
                    <span
                      className="text-xs font-medium text-center leading-tight transition-opacity duration-150 group-hover:opacity-100"
                      style={{ color: 'var(--text-secondary)', opacity: 0.55 }}
                    >
                      {skill.name}
                    </span>
                  </div>
                ));
              })()}
            </div>

            {/* Show More / Show Less */}
            {filteredSkills.length > 20 && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowAll(prev => !prev)}
                  className="glass-button px-6 py-2 rounded-2xl"
                >
                  {showAll ? 'Show less' : `Show all (${filteredSkills.length})`}
                </button>
              </div>
            )}

            {/* Skills Summary */}
            <div className="mt-12 text-center">
              <div className="p-6 rounded-2xl max-w-3xl mx-auto">
                <h3 className="text-xl font-bold text-heading mb-3">
                  Continuous Learning & Growth
                </h3>
                <p className="text-content leading-relaxed">
                  My tech stack is constantly evolving as I explore new technologies and methodologies. 
                  I believe in staying current with industry trends while maintaining deep expertise in core areas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
