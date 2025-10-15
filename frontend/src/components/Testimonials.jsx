import { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    text: "CodeHire has completely transformed how our team collaborates. Real-time coding and chat integration make it easy to discuss and debug together, saving hours every week.",
    name: "Sarah Johnson",
    title: "Lead Developer at TechNova Solutions",
  },
  {
    id: 2,
    text: "We were looking for a single platform for coding interviews and team projects. CodeHire delivered exactly that. Smooth, reliable, and efficient.",
    name: "Rahul Mehta",
    title: "Engineering Manager at InfyLabs",
  },
  {
    id: 3,
    text: "Thanks to CodeHire's job aggregation feature, I found my current role without juggling between different sites. It's a must-have for every developer.",
    name: "Priya Desai",
    title: "Full Stack Developer at CloudSphere",
  },
  {
    id: 4,
    text: "The live collaboration tools in CodeHire are simply amazing. Pair programming and code reviews feel as natural as working side by side.",
    name: "Daniel Kim",
    title: "Software Engineer at BrightByte Inc",
  },
  {
    id: 5,
    text: "I love how CodeHire combines learning and career growth. I can practice with peers and explore new job openings all in one place.",
    name: "Ananya Gupta",
    title: "Computer Science Student at IIT Delhi",
  },
  {
    id: 6,
    text: "Our remote development team uses CodeHire daily. The shared workspace and chat have improved our productivity and communication drastically.",
    name: "Ahmed Khan",
    title: "CTO at NexaTech Global",
  },
  {
    id: 7,
    text: "Before CodeHire, our team struggled with switching between coding tools and job portals. Now everything is integrated seamlessly — it's a huge time-saver.",
    name: "Rebecca Lee",
    title: "Project Manager at SoftMatrix",
  },
  {
    id: 8,
    text: "The real-time code editor is fast, responsive, and perfect for technical interviews. CodeHire has become our go-to hiring platform.",
    name: "John Smith",
    title: "HR Director at ByteBridge",
  },
  {
    id: 9,
    text: "CodeHire has helped me connect with recruiters and other developers easily. The collaboration feature builds both skills and connections.",
    name: "Vivek Sharma",
    title: "Front-End Developer",
  },
  {
    id: 10,
    text: "An incredible platform for developers who want to grow, learn, and find the right opportunities — all without leaving their workspace.",
    name: "Maria Gonzales",
    title: "Software Engineer at DataEdge",
  },
];

export default function PostivusCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-scroll every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section id="testimonials" className="py-20 bg-white ">
      {/* Heading */}
      <div className="px-20 mb-12 px-4 gap-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900">Testimonials</h2>
        <p className="text-gray-600 mt-3 text-lg">
          Hear from developers and teams who trust{" "}
          <span className="text-blue-600 font-semibold">CodeHire</span>.
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative max-w-4xl mx-auto bg-black text-white rounded-3xl shadow-xl overflow-hidden px-6 py-12 sm:px-10 sm:py-14">
        {/* Slides Wrapper */}
        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${activeIndex * 100}%)`,
            }}
          >
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="w-full  flex-shrink-0 px-4"
              >
                <div className="bg-gray-50 border-4 border-[#5465ff] rounded-2xl p-8 sm:p-10 shadow-lg text-center w-full max-w-md mx-auto">
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6 italic">
                    "{t.text}"
                  </p>
                  <h3 className="text-blue-700 font-semibold text-lg sm:text-xl">
                    {t.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">{t.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center mt-10 space-x-6">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full border border-gray-400 hover:bg-[#5465ff] text-xl transition"
            aria-label="Previous testimonial"
          >
            ←
          </button>

          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all ${index === activeIndex
                  ? "bg-blue-600 scale-110"
                  : "bg-gray-400 hover:bg-gray-500"
                  }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-full border border-gray-400 hover:bg-[#5465ff] text-xl transition"
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}