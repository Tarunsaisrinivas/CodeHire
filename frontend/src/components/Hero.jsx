import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="mt-6 bg-light px-6 md:px-20 py-16">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12">
        <div className="md:w-1/2 text-center md:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight"
          >
            Live Code Editor <br /> Meets Smart Job <br /> Search
          </motion.h2>

          <p className="mt-6 text-gray-600 max-w-xl mx-auto md:mx-0">
            The only platform that combines real-time collaborative coding with intelligent job matching. Write code together, build your portfolio live, and get discovered by top employers – all seamlessly integrated in one workspace.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <button className="bg-black text-white border px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-700 transition">
              Launch Editor <ArrowRight size={18} />
            </button>
            <button className="bg-black border text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
              Search Job
            </button>
          </div>
        </div>

        <div className="md:w-1/2 -mt-6 md:mt-0">
          <img
            src="/Images/Illustration.png"
            alt="Megaphone illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </section>
  );
}