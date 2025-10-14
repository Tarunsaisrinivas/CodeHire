import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import JobSearch from './pages/JobSearch'
import ProfileCard from './pages/ProfileCard'
function App() {
  const [count, setCount] = useState(0)
  const profiles = [
    {
      name: "Tarun Sai Srinivas",
      role: "Senior SEO Specialist",
      description:
        "5+ years of experience in SEO and content creation. Proficient in keyword research and on-page optimization.",
      image: "data:image/jpeg;base64,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",
      linkedin: "https://linkedin.com/in/tarun-sai-srinivas",
    },
    {
      name: "Ganesh reddy",
      role: "Content Marketing Manager",
      description:
        "Experienced in creating engaging content strategies and managing digital campaigns for global brands.",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      linkedin: "https://linkedin.com",
    },
    {
      name: "David Lee",
      role: "Technical SEO Analyst",
      description:
        "Specialist in technical SEO audits, schema markup, and improving website performance for search engines.",
      image: "https://randomuser.me/api/portraits/men/78.jpg",
      linkedin: "https://linkedin.com",
    },
  ];
  return (
    <>
      <JobSearch/>
     {/* <div className='min-h-auto bg-gray-50 flex justify-center  p-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
        {profiles.map((profile, index) => (
          <ProfileCard key={index} {...profile} />
        ))}
        </div>
     </div> */}
      
    </>
  )
}

export default App
