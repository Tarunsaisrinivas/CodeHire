export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 md:px-20 bg-gray-200 mt-6 border-gray-200 rounded-2xl">
      <div className="flex flex-col md:flex-row items-start gap-12">
        <form className="w-full md:w-1/2 space-y-4">
          <h3 className="text-3xl font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-600 mb-10">
            Get in Touch: We are here to help you succeed. Whether you're a developer looking for opportunities or a team seeking collaboration tools, our support team is ready to assist you.
          </p>
          <div className="md:w-1/2 -mt-6 md:mt-0">
            <img
              src="/Images/contact_Illustration.png"
              alt="Megaphone illustration"
              className="w-full max-w-md mx-auto"
            />
          </div>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border p-3 rounded-lg"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border p-3 rounded-lg"
          />
          <textarea
            placeholder="Message"
            className="w-full border p-3 rounded-lg h-28"
          />
          <button className="bg-black border p-2 text-white w-full py-3 rounded-lg hover:bg-purple-700 transition">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}