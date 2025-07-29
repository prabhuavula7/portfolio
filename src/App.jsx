import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client'; 
import * as THREE from 'three'; 
import { Sun, Moon } from 'lucide-react'; 
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import profileImg from './assets/profileImg.jpeg';
import MobileMenu from './MobileMenu'; 
import './index.css'; 
import { Analytics } from "@vercel/analytics/react"


function App() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const threeJsCanvasRef = useRef(null);

    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setShowScrollTop(window.scrollY > 200);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const introTextElement = document.querySelector('.intro-text');
        const spans = introTextElement.querySelectorAll('span');
        const paragraph = document.querySelector('.hero-content p');
        const buttons = document.querySelector('.hero-content .flex');

        spans.forEach((span, index) => {
            span.style.transitionDelay = `${index * 0.08}s`;
        });

        setTimeout(() => {
            introTextElement.classList.add('animate');
        }, 100);

        setTimeout(() => {
            paragraph.classList.remove('opacity-0');
            paragraph.classList.add('animate-fade-in');
            buttons.classList.remove('opacity-0');
            buttons.classList.add('animate-fade-in');
        }, spans.length * 80 + 500); 
    }, []); 

    // Effect for Three.js background setup and animation
    useEffect(() => {
        const canvas = threeJsCanvasRef.current;
        // Ensure canvas ref is available before initializing Three.js
        if (!canvas) {
            console.warn("Three.js canvas reference not available.");
            return;
        }

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); 
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio); 

        camera.position.z = 5;

        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const numParticles = 1000; 
        
        // Generate random vertices for particles
        for (let i = 0; i < numParticles; i++) {
            const x = (Math.random() - 0.5) * 20; 
            const y = (Math.random() - 0.5) * 20; 
            const z = (Math.random() - 0.5) * 20; 
            vertices.push(x, y, z);
        }
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        // Create a material for the particles (orange glowing dots)
        const material = new THREE.PointsMaterial({
            color: 0xffa500, 
            size: 0.05,      
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending 
        });

        // Create the particle system and add it to the scene
        const particles = new THREE.Points(geometry, material);
        scene.add(particles);
        const ambientLight = new THREE.AmbientLight(0x404040); 
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); 
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);
        
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        let windowHalfX = window.innerWidth / 2;
        let windowHalfY = window.innerHeight / 2;
       
        const onDocumentMouseMove = (event) => {
            mouseX = (event.clientX - windowHalfX);
            mouseY = (event.clientY - windowHalfY);
        };
        
        const onDocumentTouchMove = (event) => {
            if (event.touches.length === 1) {
                mouseX = (event.touches[0].pageX - windowHalfX);
                mouseY = (event.touches[0].pageY - windowHalfY);
            }
        };
       
        const onWindowResize = () => {
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix(); 
            renderer.setSize(window.innerWidth, window.innerHeight); 
            renderer.setPixelRatio(window.devicePixelRatio);
        };
        // Add event listeners
        document.addEventListener('mousemove', onDocumentMouseMove);
        document.addEventListener('touchmove', onDocumentTouchMove, { passive: false });
        window.addEventListener('resize', onWindowResize);

        // Animation loop for Three.js
        const animate = () => {
            requestAnimationFrame(animate); 
            targetX = mouseX * 0.001;
            targetY = mouseY * 0.001;
            camera.position.x += (targetX - camera.position.x) * 0.05;
            camera.position.y += (-targetY - camera.position.y) * 0.05; 
            camera.lookAt(scene.position); 
            particles.rotation.x += 0.0005;
            particles.rotation.y += 0.001;

            renderer.render(scene, camera); 
        };

        animate(); 

        return () => {
            document.removeEventListener('mousemove', onDocumentMouseMove);
            document.removeEventListener('touchmove', onDocumentTouchMove);
            window.removeEventListener('resize', onWindowResize);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []); 
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false); 
        }
    };
    // Handler for contact form submission
    const handleContactFormSubmit = (e) => {
        e.preventDefault(); 

        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        console.log('Form Submitted!');
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Message:', message);
       
        const formMessage = document.getElementById('form-message');
        if (formMessage) {
            formMessage.classList.remove('hidden', 'text-red-600'); 
            formMessage.classList.add('text-green-600'); 
            formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            e.target.reset(); 
            setTimeout(() => {
                formMessage.classList.add('hidden');
            }, 5000);
        }
    };
  
  const [theme, setTheme] = useState(() => {
  
    console.log("Loading saved theme from localStorage : ", localStorage.getItem("theme"));
    return localStorage.getItem("theme") || 'dark';
  });

  useEffect(() => {
    const html = document.documentElement;

    if (theme === 'dark') {
      console.log("Setting theme to dark");
      html.classList.add('dark');
      html.classList.remove('light');
    } else if (theme === 'light') {
      console.log("Setting theme to light");
      html.classList.remove('dark');
      html.classList.add('light');
    } else {
      console.warn("Unknown theme:", theme);
      return;
    }

    localStorage.setItem("theme", theme);
  }, [theme]); 

  const ThemeToggleButton = () => (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full hover:bg-gray-700 transition-colors"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-blue-400" />
      ) : (
        <Moon className="w-5 h-5 text-yellow-400" />
      )}
    </button>
  
  );
    

    return (
        <div className="antialiased overflow-x-hidden transition-all duration-500  bg-white dark:bg-black text-black dark:text-white">

            {/* Navigation Bar */}
            <header className="bg-header shadow-md w-full">
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <a href="#home" onClick={() => scrollToSection('home')} className="text-2xl font-bold text-header-link rounded-lg p-2 hover:text-header-link-hover transition-colors">APK</a>
                    <div className="hidden md:flex space-x-8">
                        <a href="#about" onClick={() => scrollToSection('about')} className="text-header-link hover:text-header-link-hover font-medium transition-colors">About</a>
                        <a href="#experience" onClick={() => scrollToSection('experience')} className="text-header-link hover:text-header-link-hover font-medium transition-colors">Experience</a>
                        <a href="#education" onClick={() => scrollToSection('education')} className="text-header-link hover:text-header-link-hover font-medium transition-colors">Education</a>
                        <a href="#projects" onClick={() => scrollToSection('projects')} className="text-header-link hover:text-header-link-hover font-medium transition-colors">Projects</a>
                        <a href="#values" onClick={() => scrollToSection('values')} className="text-header-link hover:text-header-link-hover font-medium transition-colors">Values</a>
                        <a href="#contact" onClick={() => scrollToSection('contact')} className="text-header-link hover:text-header-link-hover font-medium transition-colors">Contact</a>
                        {/* Theme Toggle Button */}
                        {/* <ToggleThemeButton /> */}
                        <div className="ml-4 flex items-center">
                          {ThemeToggleButton()}
                        </div>

                    </div>
                    <div className="flex items-center space-x-4">
                      {/* Mobile Menu Button */}
                      <div className="md:hidden">
                        <button
                          id="mobile-menu-button"
                          onClick={() => setIsMobileMenuOpen(true)}
                          className="text-black dark:text-white focus:outline-none"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </nav>
                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                      <MobileMenu
                        onClose={() => setIsMobileMenuOpen(false)}
                        scrollToSection={scrollToSection}
                        ThemeToggleButton={ThemeToggleButton}
                      />
                    )}

            </header>

            <main>
                {/* Hero/Landing Section */}
                <section id="home" className="relative bg-section-dark text-white flex items-center justify-center min-h-screen pt-20 overflow-x-hidden">
                    {/* Three.js Canvas */}
                    <canvas ref={threeJsCanvasRef} id="threejs-canvas"></canvas>

                    <div className="container mx-auto px-6 py-12 text-center relative z-10 hero-content">
                        {/* Text with shaded orange/red gradient and depth */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 intro-text"
                            style={{ background: 'linear-gradient(45deg, #FF7F50, #FF4500)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: '2px 2px 8px rgba(255, 69, 0, 0.4)' }}>
                            <span>Hey,</span> <span>I'm</span> <span>Prabhu</span> <span>Kiran</span> <span>Avula,</span> <br className="hidden md:block" />
                            <span>a</span> <span>Passionate</span> <span>AI/ML Engineer and Data Scientist.</span>
                        </h1>
                        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 opacity-0 animate-fade-in delay-2000 text-black dark:text-white">
                        I build intelligent systems that learn, adapt, and deliver value. <br className="hidden md:block" /> From models to meaning — I turn complexity into clarity.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 opacity-0 animate-fade-in delay-2500 text-black dark:text-white">
                            <a href="#projects" onClick={() => scrollToSection('projects')} className="btn-primary">View My Work</a>
                            <a href="#contact" onClick={() => scrollToSection('contact')} className="btn-secondary">Get In Touch</a>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="py-16 md:py-24 bg-section-dark">
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl font-bold text-center mb-12 text-heading">About Me</h2>
                        <div className="flex flex-col md:flex-row items-center md:space-x-12">
                            <div className="md:w-1/3 mb-8 md:mb-0 justify-center">
                                <img src={profileImg} alt="Prabhu Kiran Avula" className="rounded-full w-64 h-64 mx-auto object-cover shadow-xl border-4 border-card" />
                            </div>
                            <div className="md:w-2/3 text-lg text-content leading-relaxed">
                            <p className="mb-4">
                              Hi, I’m <strong>Prabhu Kiran Avula</strong> — or <strong>APK</strong> for short!
                            </p>

                            <p className="mb-4">
                              I’m an <strong>AI/ML Engineer</strong> and <strong>Data Scientist</strong> passionate about building intelligent, scalable systems that solve real-world problems. Having grown up in <strong>nine cities across four countries</strong>, I’ve developed a global perspective that shapes how I approach challenges, with curiosity, empathy, and adaptability.
                            </p>

                            <p className="mb-4">
                            My journey into tech began in high school with a basic webpage about aircraft types. That small project sparked a lifelong fascination with intelligent systems and their potential to transform lives. Since then, through two degrees and hands-on experience across industries, I’ve honed deep expertise in machine learning, data science, and applied AI, from developing real-time inference pipelines to fine-tuning LLMs for critical applications.
                            </p>

                            <p className="mb-4">
                            I love being at the crossroads of technology, impact, and human-centered design, whether it's building AI assistants for mental health, optimizing document intelligence, or leading full-stack ML projects. I believe that staying curious is the key to staying relevant, and I’m always exploring new tools, languages, and ideas.
                            </p>

                            <p className="mb-4">
                            Outside of work, I’m an aviation enthusiast, a lover of history and economics, and an avid explorer, whether that’s hiking through national parks, playing cricket or chess, or diving into a new book.
                            </p>

                            <p className="mb-4">
                              I believe that a well-rounded life fuels bold ideas. If you're looking for someone who blends technical depth with creative problem-solving and a people-first mindset, let’s connect and build something meaningful together!
                            </p>
                          </div>
                        </div>
                    </div>
                </section>

                  <section id="skills" className="py-16 md:py-24 bg-section-light dark:bg-section-dark transition-colors duration-300">
                  <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-12 text-heading dark:text-white">Technical Skills</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">

                      {[
                        {
                          title: "Languages & Frameworks",
                          items: ["Python", "R", "Node.js", "SQL", "Java", "JavaScript", "Go", "React", "REST", "TypeScript", "HTML/CSS"],
                        },
                        {
                          title: "ML & Data Science",
                          items: ["Statistical Modelling", "TensorFlow", "PyTorch", "Keras", "Deep Learning", "Natural Language Processing", "LLMs", "RAG", "GenAI", "Predictive Analytics", "Tableau", "Power BI"],
                        },
                        {
                          title: "Big Data & Cloud",
                          items: ["Hadoop", "GCP", "AWS", "Azure", "Spark", "Hive", "PostgreSQL", "MongoDB", "Qdrant", "FAISS"],
                        },
                        {
                          title: "DevOps & Tools",
                          items: ["CI/CD", "SDLC", "Version Control", "Git", "Docker", "Kafka", "Kubernetes", "BigQuery", "Airflow", "Snowflake"],
                        },
                      ].map((category, index) => (
                        <div
                          key={index}
                          className="bg-white dark:bg-black border border-card p-6 rounded-xl shadow-md transition duration-300 hover:shadow-[0_0_18px_3px_rgba(255,115,0,0.4)]"
                        >
                          <h3 className="text-2xl font-semibold text-heading mb-4 text-black dark:text-white">
                            {category.title}
                          </h3>
                          <div className="flex flex-wrap gap-3">
                            {category.items.map((skill, i) => (
                              <span
                                key={i}
                                className="bg-orange-100 text-zinc-800 dark:bg-zinc-800 dark:text-white dark:border-white border text-sm font-medium px-4 py-1.5 rounded-full transition duration-200 hover:bg-orange-500 hover:text-black hover:shadow-[0_0_10px_2px_rgba(255,115,0,0.4)] shadow-sm"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}

                    </div>
                  </div>
                </section>


                {/* Experience Section */}
                <section id="experience" className="py-16 md:py-24 bg-section-light">
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl font-bold text-center mb-12 text-heading">Experience</h2>
                        <div className="relative max-w-4xl mx-auto">
                            <div className="absolute hidden md:block w-1 bg-orange-500 h-full left-1/2 transform -translate-x-1/2 rounded-full shadow-[0_0_12px_2px_rgba(255,115,0,0.6)] z-0"></div>

                            <div className="mb-12 flex flex-col md:flex-row items-center md:justify-between w-full">
                                <div className="md:w-5/12 text-right md:pr-8 mb-4 md:mb-0">
                                    <h3 className="text-2xl font-semibold text-heading">AI/ML Engineer </h3>
                                    <p className="text-timeline-accent text-lg">Accessifiers Organization</p>
                                    <p className="text-timeline-accent text-lg">Duvall, WA</p>
                                    <p className="text-sub-content">Feb 2025 - Present</p>
                                </div>
                                <div className="hidden md:block w-4 h-4 bg-orange-500 rounded-full absolute left-1/2 transform -translate-x-1/2 z-10 shadow-[0_0_10px_2px_rgba(255,115,0,0.5)] border-2 border-white dark:border-black"></div>
                                <div className="md:w-5/12 bg-card p-6 rounded-lg shadow-lg border border-card">
                                    <ul className="list-disc list-inside text-content">
                                        <li>Led end-to-end development of an AI-powered mental health assistant for neurodiverse and deaf users, enabling
                                        context-aware, multilingual conversations across text, image, audio, and video inputs on platforms like Telegram
                                        and WhatsApp using Retrieval-Augmented Generation and vector search in 30+ languages.</li>
                                        <li>Engineered a multilingual, accessibility-first ML model capable of interpreting ungrammatical input, regional languages, and SMS-style shorthand.</li>
                                        <li>Integrated open-source LLMs (OpenRouter) with custom fine-tuning pipelines optimized for neurodiverse expression patterns and inclusive language modeling.</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mb-12 flex flex-col md:flex-row-reverse items-center md:justify-between w-full">
                                <div className="md:w-5/12 text-left md:pl-8 mb-4 md:mb-0">
                                    <h3 className="text-2xl font-semibold text-heading">Software Engineering Consultant</h3>
                                    <p className="text-timeline-accent text-lg">HighRadius Corporation</p>
                                    <p className="text-timeline-accent text-lg">Hyderabad, India</p>
                                    <p className="text-sub-content">Feb 2021 - Dec 2022</p>
                                </div>
                                <div className="hidden md:block w-4 h-4 bg-orange-500 rounded-full absolute left-1/2 transform -translate-x-1/2 z-10 shadow-[0_0_10px_2px_rgba(255,115,0,0.5)] border-2 border-white dark:border-black"></div>
                                <div className="md:w-5/12 bg-card p-6 rounded-lg shadow-lg border border-card">
                                    <ul className="list-disc list-inside text-content">
                                        <li>Specialized in building scalable ML models, refining data infrastructure, and delivering robust, high-impact technical solutions across complex systems.</li>
                                        <li>Developed predictive matching models that improved cash application accuracy to 88%, resolving thousands of payment mismatches.</li>
                                        <li>Automated ERP reconciliations for SAP and Oracle, achieving 97% accuracy and reducing processing time by 50% in multi-currency environments.</li>
                                        <li>Led cross-functional teams in end-to-end SaaS implementations, integrating AI/ML pipelines into finance enterprise ecosystems.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="education" className="py-16 md:py-24 bg-section-light dark:bg-section-dark transition-colors duration-300">
                  <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-12 text-heading dark:text-white">Education</h2>
                      <div className="grid gap-8 max-w-4xl mx-auto">
                    {/* Degree 1 */}
                      <div className="bg-card dark:bg-zinc-900 border border-card dark:border-zinc-700 p-6 rounded-xl shadow-lg transition-all duration-300">
                      <h3 className="text-2xl font-semibold text-orange-500 hover:text-orange-400 transition-colors duration-200 mb-1">
                        Master’s in Computer Science</h3>
                        <p className="text-timeline-accent text-lg">Illinois Institue of Technology, Chicago</p>
                        <p className="text-sub-content dark:text-zinc-400">2022 – 2024</p>
                        <ul className="list-disc list-inside mt-3 text-content dark:text-zinc-300 text-sm">
                          <li>Coursework:
                            Design and Analysis of Algorithms, Advanced Database Organization, Advanced Operating Systems, Computer Networks I, Computer Networks II, Software Project Management, Data Preparation and Analysis, Analytics for Decision Making, User Centred Design, Big Data Technologies, Artificial Intelligence</li>
                          <li>GPA: 3.5/4.0</li>
                        </ul>
                      </div>

                    {/* Degree 2 */}
                      <div className="bg-card dark:bg-zinc-900 border border-card dark:border-zinc-700 p-6 rounded-xl shadow-lg transition-all duration-300">
                      <h3 className="text-2xl font-semibold text-orange-500 hover:text-orange-400 transition-colors duration-200 mb-1">Bachelor of Technology in Computer Science Engineering</h3>
                      <p className="text-timeline-accent text-lg">SRM University, AP, India</p>
                      <p className="text-sub-content dark:text-zinc-400">2018 – 2022</p>
                      <ul className="list-disc list-inside mt-3 text-content dark:text-zinc-300 text-sm">
                          <li>Graduated with a 8.5 CGPA</li>
                          <li>Led Ennovab, an entrepreneurship club backed by UC Berkley Alumni</li>
                          <li>Worked as a TA for Communcative English and Critical Thinking Courses</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Projects Section */}
                <section id="projects" className="py-16 md:py-24 bg-section-dark">
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl font-bold text-center mb-12 text-heading">My Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                            <div className="project-card bg-card rounded-lg shadow-lg overflow-x-hidden border border-card transition duration-300 hover:shadow-[0_0_25px_rgba(255,69,0,0.5)]">
                                <img src="https://placehold.co/600x400/000000/FF7F50?text=Sana" alt="Sana" className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-2xl font-semibold text-heading mb-2">Sana - Your Empathetic AI Companion</h3>
                                    <p className="text-content mb-4">
                                    Sana (from Sanare, Latin for “to heal”) is a privacy-respecting, multilingual AI chatbot built for safe, emotionally aware mental health support. <br />
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">LLMs</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">Hugging Face Transformers</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">OpenRouter</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">RAG</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">NLP</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">Qdrant</span>
                                    </div>
                                    <div className="flex space-x-4">
                                    <a
                                      href="https://github.com/prabhuavula7/Sana"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-orange-500 hover:text-orange-400 font-medium flex items-center transition-colors"
                                    >
                                      GitHub <i className="fab fa-github ml-2 text-sm"></i>
                                    </a>
                                    </div>
                                </div>
                            </div>

                            <div className="project-card bg-card rounded-lg shadow-lg overflow-x-hidden border border-card transition duration-300 hover:shadow-[0_0_25px_rgba(255,69,0,0.5)]">
                                <img src="https://placehold.co/600x400/000000/FF4500?text=docQA" alt="docQA" className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-2xl font-semibold text-heading mb-2">docQA - an Autonomous AI for your documents</h3>
                                    <p className="text-content mb-4">
                                        An autonomous AI agent that can read, summarize, understand, and answer questions about your documents using RAG techniques.
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">Python</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">Tesseract</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">OCR Processing</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">RAG</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">Hugging Face Transformers</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">Qdrant</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">NLP</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">OpenRouter</span>

                                    </div>
                                    <div className="flex space-x-4">
                                        <a
                                          href="https://github.com/prabhuavula7/docQA"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-orange-500 hover:text-orange-400 font-medium flex items-center transition-colors"
                                        >
                                          GitHub <i className="fab fa-github ml-2 text-sm"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="project-card bg-card rounded-lg shadow-lg overflow-x-hidden border border-card transition duration-300 hover:shadow-[0_0_25px_rgba(255,69,0,0.5)]">
                                <img src="https://placehold.co/600x400/000000/FF7F50?text=AI+Chess" alt="AI Chess" className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-2xl font-semibold text-heading mb-2">AI Chessbot</h3>
                                    <p className="text-content mb-4">
                                    This is a full-featured chess game built with React and JavaScript, featuring an AI opponent that uses the minimax algorithm with alpha-beta pruning for optimal moves.
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">Python</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">React</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">JavaScript</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">TailwindCSS</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">MiniMax</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">Alpha-Beta Pruning</span>
                                    </div>
                                    <div className="flex space-x-4">
                                        <a
                                          href="https://github.com/prabhuavula7/AI-chess"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-orange-500 hover:text-orange-400 font-medium flex items-center transition-colors"
                                        >
                                          GitHub <i className="fab fa-github ml-2 text-sm"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="project-card bg-card rounded-lg shadow-lg overflow-x-hidden border border-card transition duration-300 hover:shadow-[0_0_25px_rgba(255,69,0,0.5)]">
                                <img src="https://placehold.co/600x400/000000/FF4500?text=Churn+Toolkit" alt="Churn Insights Toolkit" className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-2xl font-semibold text-heading mb-2">Churn Insights Toolkit</h3>
                                    <p className="text-content mb-4">
                                    This project focuses on predicting customer churn using machine learning techniques. It covers the complete ML pipeline — from data cleaning and EDA to modeling, A/B testing, and explainability.
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">Python</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">XGBoost</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">SHAP</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">A/B Testing</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">EDA</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">Classification Models</span>
                                    </div>
                                    <div className="flex space-x-4">
                                        <a
                                          href="https://github.com/prabhuavula7/churn-insights-toolkit"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-orange-500 hover:text-orange-400 font-medium flex items-center transition-colors"
                                        >
                                          GitHub <i className="fab fa-github ml-2 text-sm"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="project-card bg-card rounded-lg shadow-lg overflow-x-hidden border border-card transition duration-300 hover:shadow-[0_0_25px_rgba(255,69,0,0.5)]">
                                <img src="https://placehold.co/600x400/000000/FF7F50?text=Rhea" alt="Rhea" className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-2xl font-semibold text-heading mb-2">Rhea - Debate Partner</h3>
                                    <p className="text-content mb-4">
                                    A transformer-based NLP system that generates logically structured, for-and-against arguments on complex real-world topics.
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">Python</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">NLP</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">Hugging Face Transformers</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">Beam Search</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">Pandas</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">Fine-Tuning</span>
                                    </div>
                                    <div className="flex space-x-4">
                                        <a
                                          href="https://github.com/prabhuavula7/Rhea"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-orange-500 hover:text-orange-400 font-medium flex items-center transition-colors"
                                        >
                                          GitHub <i className="fab fa-github ml-2 text-sm"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="project-card bg-card rounded-lg shadow-lg overflow-x-hidden border border-card transition duration-300 hover:shadow-[0_0_25px_rgba(255,69,0,0.5)]">
                                <img src="https://placehold.co/600x400/000000/FF4500?text=Nuri" alt="Nuri" className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-2xl font-semibold text-heading mb-2">Nuri</h3>
                                    <p className="text-content mb-4">
                                    Nuri (means “light” in Arabic/Hebrew) is a powerful emotion analysis tool. It uses advanced NLP techniques to extract emotional insights. The predecessor to Sana.
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">Python</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">NLP</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">Classifcation</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">Scikit-learn</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">Fine tuning</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">Jupyter</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">Hugging Face Transformers</span>
                                    </div>
                                    <div className="flex space-x-4">
                                        <a
                                          href="https://github.com/prabhuavula7/Nuri"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-orange-500 hover:text-orange-400 font-medium flex items-center transition-colors"
                                        >
                                          GitHub <i className="fab fa-github ml-2 text-sm"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="project-card bg-card rounded-lg shadow-lg overflow-x-hidden border border-card transition duration-300 hover:shadow-[0_0_25px_rgba(255,69,0,0.5)]">
                                <img src="https://placehold.co/600x400/000000/FF7F50?text=JetScope" alt="JetScope" className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-2xl font-semibold text-heading mb-2">JetScope</h3>
                                    <p className="text-content mb-4">
                                    This project is a personal Data Science exploration of U.S. domestic aviation patterns using years of real-world data from the Bureau of Transportation Statistics.
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">Python</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">EDA</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">Prophet</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">Time Series Forecasting</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">Clustering</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">Feature Engineering</span>
                                        <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-skill">Data Visualization</span>
                                    </div>
                                    <div className="flex space-x-4">
                                        <a
                                          href="https://github.com/prabhuavula7/JetScope"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-orange-500 hover:text-orange-400 font-medium flex items-center transition-colors"
                                        >
                                          GitHub <i className="fab fa-github ml-2 text-sm"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                <section id="values" className="py-16 md:py-24 bg-white text-black dark:bg-black dark:text-white transition-all">
                  <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-12 text-black dark:text-white">
                      My Core Values
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                      {[
                        {
                          title: "Curiosity at the Core",
                          desc: "Its simple. Ask 'why?' Look deeper, at insights that give a better understanding."
                        },
                        {
                          title: "Human First, Always",
                          desc: "AI should empower people, not overshadow them. I design tools that are ethical, accessible, and centered around real human needs.",
                        },
                        {
                          title: "Scalable by Design",
                          desc: "From day one, I build systems that scale. Robust pipelines, flexible models, and architectures ready to evolve with complexity and demand.",
                        },
                        {
                          title: "Responsibly Built",
                          desc: "Bias isn’t just a technical issue, it’s a responsibility. I prioritize fairness, transparency, and integrity at every stage of the project lifecycle.",
                        },
                        {
                          title: "End-to-End Mindset",
                          desc: "Whether it’s raw data wrangling or deployment in production, I think holistically. Connecting dots across the stack to deliver cohesive solutions.",
                        },
                        {
                          title: "Keep It Real",
                          desc: "I focus on building what matters — real-world solutions that solve meaningful problems, not just tech demos chasing trends.",
                        },
                      ].map((value, index) => (
                        <div
                          key={index}
                          className="bg-gray-100 dark:bg-zinc-900 text-black dark:text-white p-6 rounded-lg shadow-md border border-gray-300 dark:border-zinc-700 transition-all hover:shadow-[0_0_20px_4px_rgba(255,115,0,0.25)]"
                        >
                          <h3 className="text-xl font-semibold mb-2 text-orange-600 dark:text-orange-400">
                            {value.title}
                          </h3>
                          <p className="text-sm leading-relaxed">{value.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>


                {/* Contact Section */}
                <section id="contact" className="py-16 md:py-24 bg-section-light dark:bg-section-dark transition-colors duration-300">
                  <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-12 text-heading dark:text-white">Get In Touch</h2>

                    <div className="max-w-xl mx-auto bg-card dark:bg-zinc-900 p-8 rounded-xl shadow-xl border border-card dark:border-zinc-700 transition-all duration-300">
                      <p className="text-center text-lg text-content dark:text-zinc-300 mb-8">
                        Have a question, a project in mind, or just want to say hello? Feel free to reach out!
                      </p>

                      <form
                        action="https://formsubmit.co/prabhuavula7@gmail.com"
                        method="POST"
                        className="space-y-6"
                      >
                      <input type="hidden" name="_captcha" value="false" />
                      <input type="hidden" name="_template" value="table" />
                      <input type="hidden" name="_subject" value="New portfolio message!" />

                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-content dark:text-zinc-400 mb-1">Name</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full px-4 py-2 bg-input dark:bg-zinc-800 text-input dark:text-white border border-input dark:border-zinc-700 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-content dark:text-zinc-400 mb-1">Email</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full px-4 py-2 bg-input dark:bg-zinc-800 text-input dark:text-white border border-input dark:border-zinc-700 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                          />
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-content dark:text-zinc-400 mb-1">Message</label>
                          <textarea
                            id="message"
                            name="message"
                            rows="5"
                            required
                            className="w-full px-4 py-2 bg-input dark:bg-zinc-800 text-input dark:text-white border border-input dark:border-zinc-700 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                          ></textarea>
                        </div>

                        <button
                          type="submit"
                          className="w-full px-6 py-3 bg-orange-500 text-black font-semibold rounded-md hover:bg-orange-600 hover:shadow-[0_0_12px_2px_rgba(255,115,0,0.4)] transition-all duration-300"
                        >
                          Send Message
                        </button>
                      </form>

                      <div id="form-message" className="mt-4 text-center text-sm font-medium hidden text-green-500"></div>
                    </div>
                  </div>
                </section>

            </main>

            {/* Footer */}
            <footer className="w-full text-center py-6 bg-white text-black dark:bg-black dark:text-white transition-all">
              <div className="container mx-auto px-6">
                <p className="mb-4 text-sm">
                  &copy; {new Date().getFullYear()} Prabhu Kiran Avula. All rights reserved.
                </p>
                <div className="flex justify-center space-x-6">
                  <a
                    href="mailto:prabhuavula7@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-orange-500 dark:hover:text-orange-400"
                  >
                    <FaEnvelope className="w-6 h-6" />
                  </a>
                  <a
                    href="https://github.com/prabhuavula7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-orange-500 dark:hover:text-orange-400"
                  >
                    <FaGithub className="w-6 h-6" />
                  </a>
                  <a
                    href="https://linkedin.com/in/prabhuavula"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-orange-500 dark:hover:text-orange-400"
                  >
                    <FaLinkedin className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </footer>
            {showScrollTop && (
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-6 right-6 z-50 p-3 bg-black/40 text-white backdrop-blur-sm rounded-full shadow-lg hover:bg-orange-500 hover:text-black transition-all duration-300 opacity-90 hover:opacity-100"
                aria-label="Scroll to top"
              >
                ↑
              </button>
            )}
            <Analytics />
        </div>
    );
}

// This is the part that tells React to render the App component to the DOM.
const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<App />);
} else {
    const newRoot = document.createElement('div');
    newRoot.id = 'root';
    document.body.appendChild(newRoot);
    ReactDOM.createRoot(newRoot).render(<App />);
}

export default App;
