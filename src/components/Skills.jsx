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
      'React','JavaScript','TypeScript','Python','Node.js','Next.js','AWS','Azure','GCP',
      'Docker','Kubernetes','Stripe','Auth0','Datadog','MongoDB','Postman','GitHub',
      'TensorFlow','PyTorch','Scikit-learn','Pandas','NumPy','Jupyter'
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

  // Function to render skill logo or fallback
  const renderSkillLogo = (skill) => {
    return (
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center p-1 bg-white/0 dark:bg-white/5"
        title={skill.name}
        aria-label={skill.name}
      >
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
    <section id="skills" className="py-20 bg-section-light dark:bg-section-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-heading mb-4">
            Tech Stack
          </h2>
          <p className="text-xl text-content max-w-3xl mx-auto">
            A comprehensive toolkit for building intelligent systems and modern applications
          </p>
        </div>

        {/* Main Tech Stack Panel */}
        <div className="glass-card p-8 rounded-3xl max-w-6xl mx-auto">
          
          {/* Panel Header with Category Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-600 bg-gradient-to-r from-primary/5 to-accent/5">
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
          
          {/* Panel Content - Skills Grid */}
          <div className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {(() => {
                const limit = 12;
                const listToShow = (!showAll && displaySkills.length > limit) ? displaySkills.slice(0, limit) : displaySkills;

                return listToShow.map((skill, index) => (
                  <div
                    key={`${skill.category}-${skill.name}`}
                    className="skill-card p-6 rounded-2xl text-center transition-all duration-300 hover:scale-105 bg-white dark:bg-slate-600/30 dark:backdrop-blur-xl backdrop-saturate-150 border border-gray-200 dark:border-slate-500/40"
                    title={skill.name}
                    tabIndex={0}
                    role="button"
                    aria-label={skill.name}
                  >
                    {/* Skill Logo */}
                    <div className="mb-4 flex justify-center">
                      {renderSkillLogo(skill)}
                    </div>

                    {/* Skill Name */}
                    <h3 className="text-sm font-semibold text-heading">
                      {skill.name}
                    </h3>
                  </div>
                ));
              })()}
            </div>

            {/* Show More / Show Less for long lists (mobile friendly) */}
            {filteredSkills.length > 12 && (
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
