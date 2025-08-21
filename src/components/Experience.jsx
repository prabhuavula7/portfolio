import React from 'react';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      company: "Accessifiers Organization",
      role: "AI/ML Engineer",
      duration: "Feb 2025 - Present",
      location: "Duvall, WA",
      achievements: [
        "I Lead end-to-end development of an AI-powered mental health assistant for neurodiverse and deaf users, enabling context-aware, multilingual conversations across text, image, audio, and video inputs on platforms like Telegram and WhatsApp using Retrieval-Augmented Generation and vector search in 30+ languages.",
        "Engineered a multilingual, accessibility-first ML model capable of interpreting ungrammatical input, regional languages, and SMS-style shorthand.",
        "Integrated open-source LLMs (OpenRouter) with custom fine-tuning pipelines optimized for neurodiverse expression patterns and inclusive language modeling."
      ],
      technologies: ["AI/ML", "NLP", "LLMs", "RAG", "Vector Search", "Accessibility", "Multilingual"],
      logo: "🧠",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      company: "HighRadius Corporation",
      role: "Software Engineering Consultant",
      duration: "Feb 2021 - Dec 2022",
      location: "Hyderabad, India",
      achievements: [
        "Specialized in building scalable ML models, refining data infrastructure, and delivering robust, high-impact technical solutions across complex systems.",
        "Developed predictive matching models that improved cash application accuracy to 88%, resolving thousands of payment mismatches.",
        "Automated ERP reconciliations for SAP and Oracle, achieving 97% accuracy and reducing processing time by 50% in multi-currency environments.",
        "Led cross-functional teams in end-to-end SaaS implementations, integrating AI/ML pipelines into finance enterprise ecosystems."
      ],
      technologies: ["ML Models", "Data Infrastructure", "Predictive Analytics", "ERP", "SAP", "Oracle", "SaaS"],
      logo: "🏢",
      color: "from-green-500 to-teal-600"
    }
  ];

  return (
    <section id="experience" className="py-20 bg-section-light dark:bg-section-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-heading mb-4">
            Professional Experience
          </h2>
          <p className="text-xl text-content max-w-3xl mx-auto">
            My journey through the world of AI/ML and data science
          </p>
        </div>

        {/* Experience Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="group relative"
            >
              {/* Main Experience Card */}
              <div
                key={experience.id}
                className="glass-card p-6 rounded-3xl transition-all duration-300 hover:scale-105 hover:shadow-lg container-glow"
              >
                
                {/* Company Header */}
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mr-4 shadow-lg overflow-hidden bg-white dark:bg-gray-800">
                    <img
                      src={`/logos/${experience.company === "Accessifiers Organization" ? "accessifiers.jpeg" : "hrc.png"}`}
                      alt={`${experience.company} logo`}
                      className="w-16 h-16 object-contain rounded-xl shadow-lg border border-gray-200 dark:border-gray-600"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-heading mb-1">
                      {experience.company}
                    </h3>
                    <p className="text-lg font-semibold text-accent">
                      {experience.role}
                    </p>
                  </div>
                </div>

                {/* Duration & Location */}
                <div className="flex items-center justify-between mb-6 text-sm text-content">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {experience.duration}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {experience.location}
                  </span>
                </div>

                {/* Key Achievements */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-heading mb-3">Key Achievements</h4>
                  <ul className="space-y-2">
                    {experience.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start text-content text-sm">
                        <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies Used */}
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-heading mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light text-xs font-medium rounded-full border border-primary/20 transition-all duration-300 hover:scale-105 cursor-default"
                        style={{
                          '--tw-bg-opacity': '1'
                        }}
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
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>

              {/* Connection Line (for visual flow) */}
              {experience.id < experiences.length && (
                <div className="hidden xl:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-accent transform -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>

        {/* Continuous Growth & Impact Summary */}
        <div className="text-center mt-16">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-heading mb-6">Continuous Growth & Impact</h3>
            <p className="text-content text-lg leading-relaxed">
              Throughout my journey, I've consistently focused on building scalable, user-centric solutions that drive real business value. From developing AI-powered document intelligence systems to creating mental health chatbots, I've learned that the most impactful technology is built with empathy, scalability, and end-to-end thinking in mind. I'm passionate about staying at the forefront of emerging technologies while ensuring that every solution I build is not just technically sound, but also ethically responsible and genuinely useful to the people who use it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
