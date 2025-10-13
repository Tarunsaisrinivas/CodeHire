// import { useState } from "react";

// const testimonials = [
//   {
//     id: 1,
//     text: "CodeHire has completely transformed how our team collaborates. Real-time coding and chat integration make it easy to discuss and debug together, saving hours every week.",
//     name: "Sarah Johnson",
//     title: "Lead Developer at TechNova Solutions"
//   },
//   {
//     id: 2,
//     text: "We were looking for a single platform for coding interviews and team projects. CodeHire delivered exactly that. Smooth, reliable, and efficient.",
//     name: "Rahul Mehta",
//     title: "Engineering Manager at InfyLabs"
//   },
//   {
//     id: 3,
//     text: "Thanks to CodeHire’s job aggregation feature, I found my current role without juggling between different sites. It’s a must-have for every developer.",
//     name: "Priya Desai",
//     title: "Full Stack Developer at CloudSphere"
//   },
//   {
//     id: 4,
//     text: "The live collaboration tools in CodeHire are simply amazing. Pair programming and code reviews feel as natural as working side by side.",
//     name: "Daniel Kim",
//     title: "Software Engineer at BrightByte Inc"
//   },
//   {
//     id: 5,
//     text: "I love how CodeHire combines learning and career growth. I can practice with peers and explore new job openings all in one place.",
//     name: "Ananya Gupta",
//     title: "Computer Science Student at IIT Delhi"
//   },
//   {
//     id: 6,
//     text: "Our remote development team uses CodeHire daily. The shared workspace and chat have improved our productivity and communication drastically.",
//     name: "Ahmed Khan",
//     title: "CTO at NexaTech Global"
//   },
//   {
//     id: 7,
//     text: "Before CodeHire, our team struggled with switching between coding tools and job portals. Now everything is integrated seamlessly — it’s a huge time-saver.",
//     name: "Rebecca Lee",
//     title: "Project Manager at SoftMatrix"
//   },
//   {
//     id: 8,
//     text: "The real-time code editor is fast, responsive, and perfect for technical interviews. CodeHire has become our go-to hiring platform.",
//     name: "John Smith",
//     title: "HR Director at ByteBridge"
//   },
//   {
//     id: 9,
//     text: "CodeHire has helped me connect with recruiters and other developers easily. The collaboration feature builds both skills and connections.",
//     name: "Vivek Sharma",
//     title: "Front-End Developer"
//   },
//   {
//     id: 10,
//     text: "An incredible platform for developers who want to grow, learn, and find the right opportunities — all without leaving their workspace.",
//     name: "Maria Gonzales",
//     title: "Software Engineer at DataEdge"
//   }
// ];

// export default function PostivusCarousel() {
//   const [activeIndex, setActiveIndex] = useState(1);

//   const handlePrev = () => {
//     setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
//   };

//   return (
//     <div className="bg-black  text-white py-10 px-4 rounded-t-xl max-w-5xl mx-auto">
//       <div className="grid grid-cols-1 md:grid-cols-3 flex flex-row justify-center gap-4 items-center">
//         {testimonials.map((t, index) => (
//           <div
//             key={t.id}
//             className={`border rounded-lg p-6 shadow-sm transition-all duration-300 ${
//               index === activeIndex ? "border-blue-600" : "border-gray-400"
//             }`}
//           >
//             <p className="text-white-300 text-sm mb-4">"{t.text}"</p>
//             <div className="font-semibold text-blue-900 text-sm">{t.name}</div>
//             <div className="text-xs text-yellow-500">{t.title}</div>
//           </div>
//         ))}
//       </div>

//       {/* Navigation */}
//       <div className="flex justify-center items-center mt-8 space-x-4">
//         <button
//           onClick={handlePrev}
//           className="px-3 py-1 bg-black-300 rounded hover:bg-blue-100 text-lg"
//         >
//           ←
//         </button>
//         <div className="flex space-x-2">
//           {testimonials.map((_, index) => (
//             <span
//               key={index}
//               onClick={() => setActiveIndex(index)}
//               className={`w-3 h-3 rounded-full cursor-pointer ${
//                 index === activeIndex ? "bg-blue-600" : "bg-gray-300"
//               }`}
//             />
//           ))}
//         </div>
//         <button
//           onClick={handleNext}
//           className="px-3 py-1 bg-black-300 rounded hover:bg-blue-100 text-lg"
//         >
//           →
//         </button>
//       </div>
//     </div>
//   );
// }


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
    text: "Thanks to CodeHire’s job aggregation feature, I found my current role without juggling between different sites. It’s a must-have for every developer.",
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
    title: "CTO at NexaTech Global"
  },
  {
    id: 7,
    text: "Before CodeHire, our team struggled with switching between coding tools and job portals. Now everything is integrated seamlessly — it’s a huge time-saver.",
    name: "Rebecca Lee",
    title: "Project Manager at SoftMatrix"
  },
  {
    id: 8,
    text: "The real-time code editor is fast, responsive, and perfect for technical interviews. CodeHire has become our go-to hiring platform.",
    name: "John Smith",
    title: "HR Director at ByteBridge"
  },
  {
    id: 9,
    text: "CodeHire has helped me connect with recruiters and other developers easily. The collaboration feature builds both skills and connections.",
    name: "Vivek Sharma",
    title: "Front-End Developer"
  },
  {
    id: 10,
    text: "An incredible platform for developers who want to grow, learn, and find the right opportunities — all without leaving their workspace.",
    name: "Maria Gonzales",
    title: "Software Engineer at DataEdge"
  }
];

export default function PostivusCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-scroll every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 2000);
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
    <section>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-black-600 px-10">Testimonials</h2>
        <p className="text-gray-600 mt-2 mb-4 px-10">Hear from Developers Teams: Real Stories of Collaboration and Career Success</p>
      </div>
      <div className="bg-black text-white py-16 px-4 rounded-2xl max-w-3xl mx-auto shadow-lg relative overflow-hidden">
        {/* Carousel Wrapper */}
        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${activeIndex * 100}%)`,
              width: `${testimonials.length * 100}%`,
            }}
          >
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="w-full flex-shrink-0 flex justify-center items-center px-6"
              >
                <div className="bg-gray-900 border border-gray-700 rounded-2xl p-10 shadow-lg w-full max-w-md text-center">
                  <p className="text-gray-200 text-base md:text-lg leading-relaxed mb-6 italic">
                    “{t.text}”
                  </p>
                  <h3 className="text-green-400 font-semibold text-lg md:text-xl">
                    {t.name}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">{t.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center mt-10 space-x-6">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full border border-gray-500 hover:bg-gray-800 text-xl transition"
          >
            ←
          </button>

          <div className="flex space-x-2 hover:scale-105 transition-transform">
            {testimonials.map((_, index) => (
              <span
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                  index === activeIndex
                    ? "bg-blue-500 scale-110"
                    : "bg-gray-500 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-full border border-gray-500 hover:bg-gray-800 text-xl transition"
          >
            →
          </button>
        </div>

        {/* Optional gradient fade on sides */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
}
