import React from 'react';

const ServicesSection = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-24">
      <div className="mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 px-10">Services</h2>
        <p className="text-lg text-gray-600 mb-12">
          Code together instantly with multiple cursors, voice chat, and seamless sync.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Discover Careers Panel */}
          <div className="border rounded-2xl p-6 shadow hover:shadow-lg transition duration-300">
            <div className="flex justify-center mb-4">
              {/* Replace with actual SVG or image */}
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                🔍
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Discover Careers</h3>
            <p className="text-gray-600 mb-4">
              Explore opportunities and find your path with curated career resources.
            </p>
            <button className="inline-flex items-center text-blue-600 hover:underline font-medium">
              Learn more <span className="ml-2">→</span>
            </button>
          </div>

          {/* Live Collaborative Editor Panel */}
          <div className="border rounded-2xl p-6 shadow hover:shadow-lg transition duration-300">
            <div className="flex justify-center mb-4">
              {/* Replace with actual SVG or image */}
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                🖥️
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Live Collaborative Editor</h3>
            <p className="text-gray-600 mb-4">
              Edit code in real-time with teammates using multiple cursors and voice chat.
            </p>
            <button className="inline-flex items-center text-blue-600 hover:underline font-medium">
              Learn more <span className="ml-2">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;