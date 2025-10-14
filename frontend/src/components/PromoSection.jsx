import React from 'react';

const PromoSection = () => {
  return (
    <section className="bg-gray-100 py-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Text Content */}
        <div className="max-w-xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Let’s make things happen
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Experience the power of real-time collaboration combined with intelligent job matching. Your development environment and career platform in one place.
          </p>
          <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-300">
            Try It Free
          </button>
        </div>

        {/* Right Abstract Graphics */}
        <div className="relative w-full max-w-md h-64 md:h-80 lg:h-96">
          {/* Central black circle with eyes */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-black rounded-full flex items-center justify-center z-10">
            <div className="flex gap-2">
              <div className="w-4 h-6 bg-white rounded-full"></div>
              <div className="w-4 h-6 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Elliptical rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 border-2 border-gray-300 rounded-full animate-spin-slow"></div>
            <div className="w-64 h-64 border-2 border-blue-300 rounded-full absolute animate-spin-reverse-slower"></div>
          </div>

          {/* Starburst shapes */}
          <div className="absolute top-4 left-4 w-6 h-6 bg-white rounded-full shadow-lg"></div>
          <div className="absolute bottom-6 right-6 w-8 h-8 bg-blue-400 rounded-full shadow-lg"></div>
          <div className="absolute top-1/3 right-1/4 w-5 h-5 bg-gray-300 rounded-full shadow-md"></div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;