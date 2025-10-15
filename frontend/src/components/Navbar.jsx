import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex justify-between items-center px-6 md:px-10 py-4 md:py-6 shadow-sm bg-white sticky top-0 z-50">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <img
          src="/Images/codehire.png"
          alt="logo"
          className="h-10 w-auto object-contain"
        />
        <h1 className="text-2xl md:text-4xl font-bold text-primary">
          CodeHire
        </h1>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-6">
        <a href="#Services" className="hover:text-primary transition">
          Services
        </a>
        <a href="#Working process" className="hover:text-primary transition">
          Working Process
        </a>
        <a href="#Teams" className="hover:text-primary transition">
          Teams
        </a>
        <a href="#testimonials" className="hover:text-primary transition">
          Testimonials
        </a>
        <a href="#contact" className="hover:text-primary transition">
          Contact Us
        </a>
      </nav>

      {/* Buttons (Desktop only) */}
      <div className="hidden md:flex space-x-4">
        <button className="bg-black text-white border px-5 py-2 rounded-xl hover:bg-[#5465ff] transition">
          Collaborative Editor
        </button>
        <button className="bg-black text-white border px-5 py-2 rounded-xl hover:bg-[#5465ff] transition">
          Job Search
        </button>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden p-2"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-6 md:hidden z-40">
          <a
            href="#features"
            className="hover:text-primary transition"
            onClick={() => setMenuOpen(false)}
          >
            Features
          </a>
          <a
            href="#process"
            className="hover:text-primary transition"
            onClick={() => setMenuOpen(false)}
          >
            How It Works
          </a>
          <a
            href="#testimonials"
            className="hover:text-primary transition"
            onClick={() => setMenuOpen(false)}
          >
            Testimonials
          </a>
          <a
            href="#contact"
            className="hover:text-primary transition"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </a>

          <div className="flex flex-col space-y-3 mt-4 w-4/5">
            <button className="bg-black text-white border px-5 py-2 rounded-xl hover:bg-blue-700 transition w-full">
              Collaborative Editor
            </button>
            <button className="bg-black text-white border px-5 py-2 rounded-xl hover:bg-blue-700 transition w-full">
              Job Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}