import React, {useState} from "react";

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
        description: 'Our platform analyzes your coding patterns, identifies strengths, and suggests areas for improvement. Get personalized learning paths and practice recommendations based on your activity.'
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
        description: 'Apply directly through integrated job platforms and practice technical interviews with peers. Use live coding scenarios to prepare and gain confidence before real interviews.'
    }
];

const WorkingProcess = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleStep = (index) => {
        setOpenIndex(index === openIndex ? null : index);
    };

    return(
        <div className=" mx-auto px-10 py-10">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-black-600">Our Working Process</h2>
                <p className="text-gray-600 mt-2">Step-by-Step Guide to Achieving Your Business Goals</p>
            </div>

            <div className="space-y-4">
                {steps.map((step, index) => {
                    const isOpen = openIndex === index;
                    return (
                        <div 
                            key = {index}
                            className={`rounded-2xl border ${isOpen ? 'bg-purple-400 text-white' : 'bg-white text-black'} tansition-all duration-300`} >
                                
                            <button 
                                onClick={() =>toggleStep(index)}
                                className="w-full flex items-center justify-between px-6 py-4 focus:outline-none">

                                <div className="flex items-center gap-4">
                                    <span className={`text-xl font-bold ${isOpen ? 'text-white' : 'text-black'}`}>
                                        {step.number}
                                    </span>
                                    <span className={`text-lg font-medium ${isOpen ? 'text-white' : 'text-black'}`}>
                                        {step.title}
                                    </span>
                                </div>
                                
                                <span className={`w-6 h-6 flex item-center justify-center rounded-fill border ${isOpen ? 'border-white text-white' : 'border-black text-black'}`}>
                                    {isOpen ? '-' : '+'}
                                </span>
                            </button>
                            {isOpen && step.description && (
                                <div className="px-6 pb-4 text-sm">{step.description}</div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WorkingProcess;