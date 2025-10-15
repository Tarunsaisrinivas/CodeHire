// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
// import { faBriefcase } from '@fortawesome/free-solid-svg-icons'; // Placeholder for Naukri

// const teamMembers = [
//   {
//     name: 'John Smith',
//     title: 'CEO and Founder',
//     description: '10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy.',
//     image: 'https://blog-pixomatic.s3.appcnt.com/image/22/01/26/61f166e1377d4/_orig/pixomatic_1572877223091.png',
//     linkedin: '#',
//     naukri: '#',
//   },
//   {
//     name: 'Michael Brown',
//     title: 'Senior SEO Specialist',
//     description: '5+ years of experience in SEO and content creation. Proficient in keyword research and on-page optimization.',
//     image: 'https://www.shutterstock.com/image-photo/smiling-african-american-millennial-businessman-600nw-1437938108.jpg',
//     linkedin: '#',
//     naukri: '#',
//   },
//   {
//     name: 'Emily Johnson',
//     title: 'PPC Manager',
//     description: '3+ years of experience in paid search advertising. Skilled in campaign management and performance analysis.',
//     image: 'https://img.freepik.com/free-photo/front-view-business-woman-suit_23-2148603018.jpg?semt=ais_hybrid&w=740&q=80',
//     linkedin: '#',
//     naukri: '#',
//   },
//   {
//     name: 'Sonia Syngal',
//     title: 'Social Media Specialist',
//     description: '4+ years of experience in social media marketing. Proficient in creating and scheduling content, analyzing metrics, and building engagement.',
//     image: 'https://www.cheggindia.com/wp-content/uploads/2023/09/EO-38963-women-ceos-in-india-v5-1024x683.png',
//     linkedin: '#',
//     naukri: '#',
//   },
// ];

// const TeamSection = () => {
//   return (
//     <section className="bg-white text-gray-800 px-6 py-12">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-10 text-center">
//           <span className="inline-block text-black px-4 py-1 rounded-full text-4xl font-semibold mb-2">Team</span>
//           <h2 className="text-3xl font-bold">Built by developers, for developers</h2>
//           <p className="mt-2 text-gray-600">
//             Our team combines expertise in real-time collaboration and AI-powered job matching.
//           </p>
//         </div>

//         {/* Team Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {teamMembers.map((member, index) => (
//             <div key={index} className="bg-gray-100 rounded-2xl p-6 shadow hover:shadow-xl transition flex items-center justify-between">
//               <div className="max-w-[70%]">
//                 <h3 className="text-xl font-semibold text-[#5465ff]">{member.name}</h3>
//                 <p className="text-sm font-medium text-gray-700 mb-2 ">{member.title}</p>
//                 <p className="text-sm text-gray-600 mb-4">{member.description}</p>
//                 <div className="flex gap-4 text-lg text-gray-700">
//                   <a href={member.linkedin} aria-label="LinkedIn" className="hover:text-[#5465ff]">
//                     <FontAwesomeIcon icon={faLinkedin} />
//                   </a>
//                   <a href={member.naukri} aria-label="Naukri" className="hover:text-[#5465ff]">
//                     <FontAwesomeIcon icon={faBriefcase} />
//                   </a>
//                 </div>
//               </div>
//               <img
//                 src={member.image}
//                 alt={member.name}
//                 className="w-20 h-20 rounded-full object-cover ml-4 border-2 border-black-600"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TeamSection;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons'; // Placeholder for Naukri

const teamMembers = [
  {
    name: 'John Smith',
    title: 'CEO and Founder',
    description: '10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy.',
    image: 'https://blog-pixomatic.s3.appcnt.com/image/22/01/26/61f166e1377d4/_orig/pixomatic_1572877223091.png',
    linkedin: '#',
    naukri: '#',
  },
  {
    name: 'Michael Brown',
    title: 'Senior SEO Specialist',
    description: '5+ years of experience in SEO and content creation. Proficient in keyword research and on-page optimization.',
    image: 'https://www.shutterstock.com/image-photo/smiling-african-american-millennial-businessman-600nw-1437938108.jpg',
    linkedin: '#',
    naukri: '#',
  },
  {
    name: 'Emily Johnson',
    title: 'PPC Manager',
    description: '3+ years of experience in paid search advertising. Skilled in campaign management and performance analysis.',
    image: 'https://img.freepik.com/free-photo/front-view-business-woman-suit_23-2148603018.jpg?semt=ais_hybrid&w=740&q=80',
    linkedin: '#',
    naukri: '#',
  },
  {
    name: 'Sonia Syngal',
    title: 'Social Media Specialist',
    description: '4+ years of experience in social media marketing. Proficient in creating and scheduling content, analyzing metrics, and building engagement.',
    image: 'https://www.cheggindia.com/wp-content/uploads/2023/09/EO-38963-women-ceos-in-india-v5-1024x683.png',
    linkedin: '#',
    naukri: '#',
  },
];

const TeamSection = () => {
  return (
    <section id="Teams" className="bg-white text-gray-800 px-4 sm:px-6 md:px-10 lg:px-20 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="inline-block text-black px-4 py-1 rounded-full text-2xl sm:text-4xl font-bold mb-2">Team</span>
          <h2 className="text-2xl sm:text-3xl md:text-2xl font-semibold">Built by developers, for developers</h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Our team combines expertise in real-time collaboration and AI-powered job matching.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-2xl p-4 sm:p-6 shadow hover:shadow-xl transition flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4"
            >
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-semibold text-[#5465ff]">{member.name}</h3>
                <p className="text-sm font-medium text-gray-700 mb-2">{member.title}</p>
                <p className="text-sm text-gray-600 mb-4">{member.description}</p>
                <div className="flex justify-center sm:justify-start gap-4 text-lg text-gray-700">
                  <a href={member.linkedin} aria-label="LinkedIn" className="hover:text-[#5465ff]">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                  <a href={member.naukri} aria-label="Naukri" className="hover:text-[#5465ff]">
                    <FontAwesomeIcon icon={faBriefcase} />
                  </a>
                </div>
              </div>
              <img
                src={member.image}
                alt={member.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-black"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;