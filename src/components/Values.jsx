import React from 'react';

const Values = () => {
  const values = [
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
      desc: "Bias isn't just a technical issue, it's a responsibility. I prioritize fairness, transparency, and integrity at every stage of the project lifecycle.",
    },
    {
      title: "End-to-End Mindset",
      desc: "Whether it's raw data wrangling or deployment in production, I think holistically. Connecting dots across the stack to deliver cohesive solutions.",
    },
    {
      title: "Keep It Real",
      desc: "I focus on building what matters — real-world solutions that solve meaningful problems, not just tech demos chasing trends.",
    },
  ];

  return (
    <section id="values" className="py-16 md:py-24 bg-section-light dark:bg-section-dark relative overflow-hidden">
      <div className="orb orb-primary orb-c" style={{ width: 400, height: 400, top: '-80px', left: '-80px' }} aria-hidden="true" />
      <div className="orb orb-accent orb-a" style={{ width: 300, height: 300, bottom: '-60px', right: '-40px' }} aria-hidden="true" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-heading mb-2 reveal">My Core Values</h2>
          <div className="section-heading-line reveal" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {values.map((value, index) => (
            <div
              key={index}
              className={`glass-card p-6 rounded-2xl hover-float group container-glow reveal reveal-scale reveal-d${(index % 6) + 1}`}
            >
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-4 flex-shrink-0">
                  <span className="text-white text-xl font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-heading group-hover:text-accent transition-colors duration-300 text-center">
                  {value.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-content text-center">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
