import React, { useState, useRef, useEffect } from 'react';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      company: "ActionAtlas Inc.",
      role: "Full Stack Developer",
      duration: "Aug 2025 - Present",
      location: "Bellevue, WA",
      achievements: [
        "Built and shipped core full-stack functionality for ActionAtlas's AWS-backed creative-ops platform, delivering major product modules (projects, budgets, freelancers, workflows) while improving UI performance and reliability.",
        "Integrated and modernized critical platform services Stripe (billing + seat management), Auth0, AWS Lambda/S3, Datadog, Slack/email webhooks, implementing some from scratch, refactoring others for production readiness.",
        "Replaced fragmented logging with a unified structured observability system, dramatically improving debugging speed, traceability, and incident response across the platform.",
        "Collaborated cross-functionally with design, product, and backend teams to deliver features end-to-end, ensuring smooth releases and platform stability",
        "Implemented Data Science features including advanced reporting dashboards, data exports, and analytics tools to empower users with actionable insights."
      ],
      technologies: ["React", "Node.js", "AWS", "Stripe", "Auth0", "Datadog", "JavaScript", "Python", "Posthog", "MongoDB"],
      logo: "🎨",
    },
    {
      id: 2,
      company: "Accessifiers Organization",
      role: "Machine Learning Engineer",
      duration: "Feb 2025 - Dec 2025",
      location: "Seattle, WA",
      achievements: [
        "Led end-to-end design and implementation of an AI-driven mental health assistant for neurodiverse and deaf users, spanning data ingestion, model training, inference, and deployment, with multimodal support (text, image, audio, video) across Telegram and WhatsApp.",
        "Built and trained transformer-based language models from first principles using domain-specific medical and mental-health datasets, incorporating custom tokenization, multilingual embeddings, and noise-robust preprocessing to handle ungrammatical input, code-switching, regional languages, and SMS-style shorthand across 30+ languages.",
        "Engineered an accessibility-first ML pipeline integrating Retrieval-Augmented Generation, vector similarity search, and context persistence, enabling clinically grounded, context-aware responses while supporting inclusive language patterns for neurodiverse communication."
      ],
      technologies: ["Python", "NLP", "LLMs", "RAG", "Vector Search", "React", "Azure"],
      logo: "🧠",
    },
    {
      id: 3,
      company: "Hack for LA",
      role: "Data Scientist",
      duration: "Oct 2024 - Jan 2025",
      location: "Los Angeles, CA",
      achievements: [
        "Processed and analyzed a 12.5M+ Los Angeles parking citation dataset to enable neighborhood-level disparity visualization for civic engagement.",
        "Built ETL and geospatial analysis pipelines in Python/Jupyter to feed interactive Mapbox visualizations within a React web app.",
        "Collaborated with cross-functional open source team to deliver backend data services and frontend integration for public-facing civic analytics."
      ],
      technologies: ["Python", "Data Analysis", "ETL", "Tableau", "React", "Jupyter", "Google Cloud"],
      logo: "🌆",
    },
    {
      id: 4,
      company: "HighRadius Corporation",
      role: "Technical Consultant",
      duration: "Feb 2021 - Dec 2022",
      location: "Hyderabad, India",
      achievements: [
        "As a Technical Consultant for the Cash Application module, I focused on AI/ML-enabled solutions. I designed and deployed automation solutions using machine learning frameworks to automate 85% of remittance data extraction, reducing manual processing time by 65% for 10,000+ monthly documents across global clients. Developed predictive models that improved cash application matching accuracy to 88%, resolving thousands of payment mismatches and accelerating financial reconciliations. Engineered real-time discrepancy detection systems to reduce unprocessed payment disputes by 55% and automated ERP reconciliations (SAP/Oracle), cutting processing time by 50% while achieving 97% accuracy in multi-currency environments. Led cross-functional teams in end-to-end SaaS implementations, integrating AI solutions with enterprise systems (e.g., Spark, GCP) and optimizing data pipelines to align with business workflows. My expertise lies in ML models, refining data infrastructure, and delivering technical solutions that efficiently bridge complex systems."
      ],
      technologies: ["Google Clour", "SQL", "SAP", "Oracle", "Consulting", "Software Project Management", "Computer Vision"],
      logo: "🏢",
    },
    {
      id: 5,
      company: "Minerva Project",
      role: "Teaching Assistant",
      duration: "Jan 2019 - Jan 2020",
      location: "Amaravati, India",
      achievements: [
        "Teaching Assistant — Communicative English & Critical Thinking",
        "Led weekly discussion workshops for a cohort of ~25–35 students, designing active-learning exercises on argument structure, evidence, vocabulary, tone, and body language for presentations.",
        "Mentored students 1:1 (presentations + writing).",
        "Collaborated with professors to align outcomes each semester; co-created 3+ new assignments and two standardized rubrics, and published guidance in the LMS (checklists, exemplars, feedback templates).",
        "Trained the incoming TA with a handover playbook (grading SOPs, facilitation tips), ensuring smooth continuity and consistent instructional quality."
      ],
      technologies: ["Critical Thinking", "Teaching", "Communication", "Mentorship", "Curriculum Development"],
      logo: "🏫",
    },
    {
      id: 6,
      company: "Ennovab",
      role: "Co-Lead & Board Member",
      duration: "Oct 2018 - May 2022",
      location: "Amaravati, India",
      achievements: [
        "Led Ennovab, a student-run org backed by UC Berkeley alumni, focused on turning innovative ideas into real-world solutions. As co-lead, I ran weekly meetings, recruited and onboarded new talent, and organized monthly events to spark collaboration among student entrepreneurs.",
        "I drove projects such as building a motorcycle-sharing system to simplify student commutes to campus, creating an attendance tracker using indoor GPS tech to cut down on proxy attendance—praised by SRM-AP faculty for boosting classroom efficiency, developing a VR app to pinpoint pain injuries in patients, which caught the attention of local medical staff, and working on a home maintenance platform to make handling repairs hassle-free.",
        "Behind the scenes, I kept the team on track by delegating tasks, refining project ideas, and managing daily operations. This hands-on role sharpened my leadership and problem-solving skills, teaching me how to turn ideas into actionable solutions while fostering a culture of innovation."
      ],
      technologies: ["Entrepreneurship", "Leadership", "Project Management", "Innovation"],
      logo: "💼",
    }
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const listRef = useRef(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const active = list.querySelector('[data-active="true"]');
    if (active) active.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [selectedIndex]);

  const logoFor = (company) => {
    if (company === 'Accessifiers Organization') return '/logos/accessifiers.jpeg';
    if (company === 'ActionAtlas Inc.') return '/logos/actionatlas.jpeg';
    if (company === 'Hack for LA') return '/logos/hackforla.png';
    if (company === 'Minerva Project') return '/logos/minervaproject.png';
    if (company === 'Ennovab') return '/logos/ennovab.png';
    return '/logos/hrc.png';
  };

  return (
    <section id="experience" className="py-16 bg-section-light dark:bg-section-dark">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-heading">Professional Experience</h2>
        </div>

        <div className="grid grid-cols-1 md:[grid-template-columns:300px_minmax(0,1fr)] gap-8 items-stretch">
          {/* Left: company list with subtle vertical line */}
          <div className="relative md:sticky md:top-24">
            <div className="absolute left-8 top-4 bottom-4 w-px bg-gray-200 dark:bg-gray-700" />

            <ul ref={listRef} className="space-y-6 pl-12">
              {experiences.map((exp, idx) => {
                const active = idx === selectedIndex;
                return (
                  <li key={exp.id} data-active={active}>
                    <button
                      onClick={() => setSelectedIndex(idx)}
                      className={`flex items-center gap-4 text-left w-full transition-all duration-200 ${active ? 'translate-x-2' : 'opacity-90 hover:translate-x-1'} focus:outline-none`}
                      aria-current={active ? 'true' : undefined}
                    >
                      <div className={`relative flex-shrink-0`}> 
                        <span className={`block w-4 h-4 rounded-full ${active ? 'bg-accent shadow-lg ring-4 ring-accent/20' : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600'}`} />
                      </div>

                      <div className="flex flex-col">
                        <span className={`text-sm font-semibold ${active ? 'text-heading' : 'text-content'}`}>{exp.company}</span>
                        <span className="text-xs text-content opacity-70">{exp.role}</span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: selected card - full height, scrollable content */}
          <div className="flex flex-col">
            {(() => {
              const exp = experiences[selectedIndex];
              return (
                <div className="glass-card p-6 rounded-3xl shadow-xl h-full flex flex-col">
                  {/* header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-white dark:bg-gray-800 p-2 flex items-center justify-center">
                      <img src={logoFor(exp.company)} alt={`${exp.company} logo`} className="w-full h-full object-contain rounded" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-heading">{exp.role} <span className="text-sm md:text-base font-medium text-accent">@ {exp.company}</span></h3>
                      <div className="text-sm text-content opacity-80 mt-1">{exp.location} | {exp.duration}</div>
                    </div>
                  </div>

                  {/* scrollable achievements */}
                  <div className="flex-1 overflow-y-auto pr-2" style={{ maxHeight: 'calc(100vh - 320px)' }}>
                    <ul className="list-none space-y-3">
                      {exp.achievements.map((a, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* footer technologies */}
                  <div className="mt-4 flex-shrink-0 mt-6">
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((t, i) => (
                        <span
                          key={i}
                          className="tech-pill px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light text-xs font-medium rounded-full border border-primary/20"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Experience;
