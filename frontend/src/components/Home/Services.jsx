import React from 'react';

const ServicesSection = () => {
    return (
        <section id="Services" className="bg-white py-16 px-6 md:px-12 lg:px-24">
            <div className='text-center'>
                <h2 className="text-4xl font-bold mb-4 w-[1/7] mx-auto text-black">
                    Services
                </h2>
                <p className="text-lg text-gray-600 mb-12">
                    Code together instantly with multiple cursors, voice chat, and seamless sync.
                </p>

                {/* Cards in a single row */}
                <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
                    {/* Discover Careers Panel */}
                    <div className="border-b-7 bg-gray-100 flex flex-col md:flex-row items-center border rounded-2xl p-6 shadow hover:shadow-lg transition duration-300 w-full md:w-1/2">
                        <div className="md:w-2/3 md:pr-6">
                            <h3 className="text-2xl text-black font-semibold mb-2">Discover Careers</h3>
                            <p className="text-gray-600 mb-4">
                                Explore a wide range of career opportunities across industries.
                                Get personalized recommendations to match your skills and interests.
                            </p>
                            <button className="inline-flex items-center text-blue-600 hover:underline font-medium">
                                Learn more <span className="ml-2">→</span>
                            </button>
                        </div>
                        <div className="md:w-1/3 flex justify-center mt-6 md:mt-0">
                            <div className="w-42 h-42 flex items-center justify-center text-3xl">
                                <img src='/Images/tokyo-magnifier-web-search-with-elements 2.png' />
                            </div>
                        </div>
                    </div>

                    {/* Live Collaborative Editor Panel */}
                    <div className="bg-[#5465ff] border-b-7 flex flex-col md:flex-row items-center border rounded-2xl p-6 shadow hover:shadow-lg transition duration-300 w-full md:w-1/2">
                        <div className="md:w-2/3 md:pr-6">
                            <h3 className="text-2xl font-semibold mb-2">Live Collaborative Editor</h3>
                            <p className="text-zinc-700 mb-4">
                                Edit code in real-time with teammates using multiple cursors and voice chat.
                            </p>
                            <button className="inline-flex items-center text-blue-100 hover:underline font-medium">
                                Learn more <span className="ml-2">→</span>
                            </button>
                        </div>
                        <div className="md:w-1/3 flex justify-center mt-6 md:mt-0">
                            <div className="w-42 h-42 flex items-center justify-center text-3xl">
                                <img src='/Images/tokyo-selecting-a-value-in-the-browser-window 1.png' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;