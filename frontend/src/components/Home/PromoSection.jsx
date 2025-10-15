import React from 'react';

const PromoSection = () => {
    return (
        <section className="mx-7 px-6 py-10 sm:px-6 md:px-16 lg:px-24 bg-gray-100 rounded-2xl shadow-lg">
            <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
                {/* Left Text Content */}
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                        Let’s make things happen
                    </h2>
                    <p className="text-base sm:text-lg text-gray-700 mb-8">
                        Experience the power of real-time collaboration combined with intelligent job matching. Your development environment and career platform in one place.
                    </p>
                    <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-[#5465ff] transition duration-300">
                        Try It Free
                    </button>
                </div>

                {/* Right Image */}
                <div className="lg:w-1/3 hidden md:block  justify-center">
                    <img
                        src="/Images/contact_Illustration.png"
                        alt="Contact Illustration"
                        className="w-full max-w-sm sm:max-w-md lg:max-w-lg object-contain"
                    />
                </div>
            </div>
        </section>
    );
};

export default PromoSection;