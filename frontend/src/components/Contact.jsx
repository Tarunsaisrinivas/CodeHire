export default function Contact() {
  return (
       <section id="contact" className="mx-7 px-6 py-10 sm:px-6 md:px-16 lg:px-24 bg-gray-100 rounded-2xl shadow-lg">

      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center md:items-start gap-12">
        {/* Left Section - Text + Form */}
        <div className="w-full md:w-1/2">
          <h3 className="text-4xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900 text-center md:text-left">
            Contact Us
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-8 leading-relaxed text-center md:text-left">
            We’re here to help you succeed! Whether you’re a developer looking
            for opportunities or a team seeking collaboration tools, our support
            team is ready to assist you.
          </p>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <textarea
              placeholder="Message"
              className="w-full border border-gray-300 p-3 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="bg-black text-white w-full py-3 rounded-lg hover:bg-[#5465ff] transition">
              Send Message
            </button>
          </form>
        </div>

        {/* Right Section - Illustration */}
        <div className="w-full md:w-1/2 hidden md:block flex justify-center md:justify-end">
          <img
            src="/Images/Mask.png"
            alt="Contact Illustration"
            className="w-full md:w-[90%] lg:w-[80%] max-w-xl object-contain drop-shadow-md md:ml-auto h-1/2"
          />
        </div>
      </div>
    </section>
  );
}