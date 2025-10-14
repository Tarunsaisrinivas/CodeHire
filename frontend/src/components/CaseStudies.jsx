import React from 'react';

const caseStudies = [
  {
    title: 'Remote team used live collaborative editor & job search',
    description:
      'Hired 6 developers in 2 months. Achieved 60% faster code reviews and 3x team growth.',
    link: '#',
  },
  {
    title: 'Junior developer leveraged live coding sessions',
    description:
      'Got 200% salary increase and 15 interview requests in 3 weeks.',
    link: '#',
  },
  {
    title: 'Company integrated live coding assessments',
    description:
      'Achieved 85% better hire success rate and 50% shorter hiring process.',
    link: '#',
  },
];

const CaseStudiesSection = () => {
  return (
    <section className="bg-white py-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Case Studies</h2>
        <p className="text-gray-600 text-lg mb-12">See How Developers and Teams Transform Their Careers eith Our Platform</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="bg-black border rounded-2xl p-6 shadow-xl hover:scale-105 transition-transform"
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                {study.title}
              </h3>
              <p className="text-yellow-300 mb-6">{study.description}</p>
              <a
                href={study.link}
                className="text-blue-600 font-medium hover:underline"
              >
                Learn more →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;