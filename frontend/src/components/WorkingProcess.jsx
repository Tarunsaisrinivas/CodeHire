import React, { useState } from "react";

const steps = [
  {
    number: '01',
    title: 'Launch Collaborative Editor',
    description:
      'Start coding in real-time with your team or join existing projects. Invite collaborators, set up your workspace, and begin pair programming with instant sync and communication tools.'
  },
  {
    number: '02',
    title: 'Build and Showcase Projects',
    description:
      'Work on project collaboratively while automatically building your portfolio. Every coding session, contribution, and problem-solving approach gets captured to showcase your real skills to employers.'
  },
  {
    number: '03',
    title: 'Skill Assessment and Growth',
    description:
      'Our platform analyzes your coding patterns, identifies strengths, and suggests areas for improvement. Get personalized learning paths and practice recommendations based on your activity.'
  },
  {
    number: '04',
    title: 'Smart Job Matching',
    description:
      'Receive AI-powered job recommendations from 50+ platforms based on your skills, project work, and career preferences. Our algorithm continuously learns and refines matches as you code.'
  },
  {
    number: '05',
    title: 'Apply and Interview Prep',
    description:
      'Apply directly through integrated job platforms and practice technical interviews with peers. Use live coding scenarios to prepare and gain confidence before real interviews.'
  }
];

const WorkingProcess = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleStep = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div id="Working process" className="px-4 sm:px-6 md:px-10 lg:px-20 py-10">
      <div className="mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mt-6">
          Our Working Process
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mt-2">
          Step-by-Step Guide to Achieving Your Business Goals
        </p>
      </div>
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`relative max-w-3xl mx-auto border-b-4 rounded-2xl border transition-all duration-300 ${
                isOpen ? 'bg-[#5465ff] text-white' : 'bg-white text-black'
              }`}
            >
              <button
                onClick={() => toggleStep(index)}
                className="w-full flex items-center justify-between px-4 sm:px-6 py-4 focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <span className={`text-xl sm:text-2xl font-bold ${isOpen ? 'text-white' : 'text-black'}`}>
                    {step.number}
                  </span>
                  <span className={`text-base sm:text-lg font-medium ${isOpen ? 'text-white' : 'text-black'}`}>
                    {step.title}
                  </span>
                </div>

                <span
                  className={`w-6 h-6 flex items-center justify-center rounded-full border ${
                    isOpen ? 'border-white text-white' : 'border-black text-black'
                  }`}
                >
                  {isOpen ? '-' : '+'}
                </span>
              </button>

              {isOpen && step.description && (
                <div className="px-4 sm:px-6 pb-4 text-sm sm:text-base">
                  {step.description}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkingProcess;