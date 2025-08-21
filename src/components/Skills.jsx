import React, { useState } from 'react';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');

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
        { name: 'Tableau', logo: '/logos/tableau.svg' },
        { name: 'Postman', logo: '/logos/postman.svg' },
        { name: 'Docker', logo: '/logos/docker.svg' },
        { name: 'AWS', logo: '/logos/aws.svg' },
        { name: 'Azure', logo: '/logos/azure.svg' },
        { name: 'GCP', logo: '/logos/gcp.svg' },
        { name: 'GitHub', logo: '/logos/github.svg' }
      ]
    }
  ];

  const allSkills = skillCategories.flatMap(category => 
    category.skills.map(skill => ({ ...skill, category: category.id }))
  );

  const filteredSkills = activeCategory === 'all' 
    ? allSkills 
    : skillCategories.find(cat => cat.id === activeCategory)?.skills || [];

  // Function to render skill logo or fallback
  const renderSkillLogo = (skill) => {
    try {
      return (
        <img 
          src={skill.logo} 
          alt={`${skill.name} logo`}
          className="w-12 h-12 object-contain"
          onError={(e) => {
            // Fallback to text if image fails to load
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      );
    } catch (error) {
      return (
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-white font-bold text-sm">
          {skill.name.charAt(0)}
        </div>
      );
    }
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
        <div className="glass-card p-8 rounded-3xl max-w-6xl mx-auto container-glow">
          
          {/* Panel Header with Category Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-600 bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="flex flex-wrap justify-center gap-2 p-6">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  activeCategory === 'all'
                    ? 'glass-button bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                    : 'glass-button hover:bg-gradient-to-r hover:from-primary/20 hover:to-accent/20'
                }`}
              >
                All Tech Stack
              </button>
              {skillCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
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

          {/* Panel Content - Skills Grid */}
          <div className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {filteredSkills.map((skill, index) => (
                <div
                  key={`${skill.category}-${skill.name}`}
                  className="skill-card p-6 rounded-2xl text-center transition-all duration-300 hover:scale-105 hover:shadow-lg bg-white dark:bg-slate-600/30 dark:backdrop-blur-xl backdrop-saturate-150 border border-gray-200 dark:border-slate-500/40 dark:shadow-slate-600/20 container-glow"
                >
                  {/* Skill Logo */}
                  <div className="mb-4 flex justify-center">
                    {renderSkillLogo(skill)}
                    {/* Fallback text if logo fails */}
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-white font-bold text-sm hidden">
                      {skill.name.charAt(0)}
                    </div>
                  </div>

                  {/* Skill Name */}
                  <h3 className="text-sm font-semibold text-heading">
                    {skill.name}
                  </h3>
                </div>
              ))}
            </div>

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
