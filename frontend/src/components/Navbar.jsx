export default function Navbar() {
  return (
    <header className="flex justify-between items-center px-10 py-6 shadow-sm bg-white sticky">
      <img src="/Images/codehire.png" alt ="logo" />
      <h1 className="text-4xl font-bold text-primary pr-85">CodeHire</h1>
      <nav className="space-x-6 hidden md:block">
        <a href="#features" className="hover:text-primary">Features</a>
        <a href="#process" className="hover:text-primary">How It Works</a>
        <a href="#testimonials" className="hover:text-primary">Testimonials</a>
        <a href="#contact" className="hover:text-primary">Contact</a>
      </nav>
      <div className="space-x-5">
        <button className="bg-black text-white border px-5 py-2 rounded-xl hover:bg-purple-700">
          Collabrative Editor
        </button>
        <button className="bg-black text-white border px-5 py-2 rounded-xl hover:bg-purple-700">
          Job Search
        </button>
      </div>
    </header>
  );
}