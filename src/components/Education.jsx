import React, { useState } from 'react';

const Education = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const educationData = [
    {
      id: 1,
      institution: "Illinois Institute of Technology, Chicago",
      degree: "Master's in Computer Science",
      duration: "2022 – 2024",
      location: "Chicago, USA",
      logo: "iit.png",
      description: "Comprehensive computer science program covering Design and Analysis of Algorithms, Advanced Database Organization, Advanced Operating Systems, Computer Networks I & II, Software Project Management, Data Preparation and Analysis, Analytics for Decision Making, User Centred Design, Big Data Technologies, and Artificial Intelligence.",
      achievements: [
        "GPA: 3.5/4.0",
        "Advanced coursework in algorithms, database systems, and operating systems"
      ],
      technologies: ["Algorithms", "Database Systems", "Operating Systems", "Computer Networks", "Software Project Management", "Data Analysis", "AI", "Big Data"]
    },
    {
      id: 2,
      institution: "SRM University, AP, India",
      degree: "Bachelor of Technology in Computer Science Engineering",
      duration: "2018 – 2022",
      location: "AP, India",
      logo: "srmap.jpeg",
      description: "Strong foundation in computer science engineering with emphasis on programming, software development, and technical leadership.",
      achievements: [
        "Graduated with a 8.5 CGPA",
        "Led Ennovab, an entrepreneurship club backed by UC Berkeley Alumni",
        "Worked as a TA for Communicative English and Critical Thinking Courses"
      ],
      technologies: ["Computer Science", "Programming", "Software Engineering", "Entrepreneurship", "Leadership", "Teaching"]
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === educationData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? educationData.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section id="education" className="py-20 bg-section-light dark:bg-section-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-heading mb-4">
            Education
          </h2>
          <p className="text-xl text-content max-w-3xl mx-auto">
            My academic journey in computer science and technology
          </p>
        </div>

        {/* Education Slider */}
        <div className="max-w-6xl mx-auto relative">
          {/* Main Slide */}
          <div className="glass-card p-8 md:p-12 rounded-3xl overflow-hidden transition-all duration-300 container-glow">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              
              {/* Institution Logo */}
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden bg-white dark:bg-gray-800 flex-shrink-0">
                <img
                  src={`/logos/${educationData[currentIndex].logo}`}
                  alt={`${educationData[currentIndex].institution} logo`}
                  className="w-20 h-20 object-cover rounded-2xl shadow-lg border-2 border-white/20 dark:border-gray-700/20"
                />
              </div>

              {/* Education Content */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl lg:text-3xl font-bold text-heading mb-2">
                  {educationData[currentIndex].institution}
                </h3>
                <p className="text-xl font-semibold text-accent mb-3">
                  {educationData[currentIndex].degree}
                </p>
                
                {/* Duration & Location */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-6 text-sm text-content">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {educationData[currentIndex].duration}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {educationData[currentIndex].location}
                  </span>
                </div>

                {/* Description */}
                <p className="text-content leading-relaxed mb-6 max-w-4xl">
                  {educationData[currentIndex].description}
                </p>

                {/* Achievements */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-heading mb-3">Key Achievements</h4>
                  <ul className="space-y-2">
                    {educationData[currentIndex].achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start text-content text-sm">
                        <span className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 bg-black dark:bg-white"></span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies/Skills */}
                <div>
                  <h4 className="text-lg font-semibold text-heading mb-3">Focus Areas</h4>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                    {educationData[currentIndex].technologies.map((tech, index) => (
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
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:bg-amber-50 dark:hover:bg-gray-700 hover:scale-110 transition-all duration-300 z-10 group border border-gray-200 dark:border-gray-600 hover:border-amber-300 dark:hover:border-accent"
          >
            <svg className="w-6 h-6 text-gray-700 dark:text-primary group-hover:text-amber-700 dark:group-hover:text-accent transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:bg-amber-50 dark:hover:bg-gray-700 hover:scale-110 transition-all duration-300 z-10 group border border-gray-200 dark:border-gray-600 hover:border-amber-300 dark:hover:border-accent"
          >
            <svg className="w-6 h-6 text-gray-700 dark:text-primary group-hover:text-amber-700 dark:group-hover:text-accent transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {educationData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary scale-125' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
