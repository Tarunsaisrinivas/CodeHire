import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-10 mt-6 border rounded-t-4xl">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Navigation */}
        <div>
          <img src="/Images/codehire.png" alt ="logo" className=''/>
          <h2 className="text-2xl font-bold mb-4">CodeHire</h2>
          <nav className="space-y-2">
            <a href="#about" className="block hover:underline">About us</a>
            <a href="#services" className="block hover:underline">Services</a>
            <a href="#use-cases" className="block hover:underline">Use Cases</a>
            <a href="#pricing" className="block hover:underline">Pricing</a>
            <a href="#blog" className="block hover:underline">Blog</a>
          </nav>
        </div>

        {/* Contact Info */}
        <div>
          <span className="inline-block bg-purple-600 text-white px-3 py-1 rounded mb-4">Contact us:</span>
          <ul className="space-y-2 text-sm">
            <li>Email: <a href="mailto:info@positivus.com" className="hover:underline">info@codehire.com</a></li>
            <li>Phone: <a href="tel:5555678901" className="hover:underline">555-567-8901</a></li>
            <li>Address: 1234 Main St, Moonstone City, Stardust State 12345</li>
          </ul>
        </div>

        {/* Newsletter & Social */}
        <div>
          <form className="space-y-4">
            <label htmlFor="email" className="block text-sm">Subscribe to news:</label>
            <div className="flex">
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="flex-grow px-4 py-2 rounded-l bg-gray-800 text-white border border-white placeholder-gray-400"
              />
              <button
                type="submit"
                className="bg-purple-600 px-4 py-2 rounded-r text-white font-semibold hover:bg-purple-700"
              >
                Subscribe
              </button>
            </div>
          </form>
          <div className="flex gap-4 mt-6">
            <a href="#" aria-label="LinkedIn" className="hover:text-purple-400"></a>
            <a href="#" aria-label="Facebook" className="hover:text-purple-400"></a>
            <a href="#" aria-label="Twitter" className="hover:text-purple-400"></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-white pt-4 text-sm flex justify-between items-center">
        <span>© 2025 Positivus. All Rights Reserved.</span>
        <a href="#privacy" className="hover:underline">Privacy Policy</a>
      </div>
    </footer>
  );
};

export default Footer;