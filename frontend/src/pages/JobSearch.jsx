import React,{useState} from 'react'
import tick from '../../images/images.png'
import Cards from './Cards';
function JobSearch() {
    const [selectedSite,setSelectedSite] = useState("");
    const jobs = [
    {
      jobTitle: "Frontend Developer",
      image: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
      location: "Bangalore, India",
      salary: "$2000/mo",
      applyText: "Apply Now",
    },
    {
      jobTitle: "Backend Developer",
      image: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
      location: "Hyderabad, India",
      salary: "$2500/mo",
      applyText: "Apply Now",
    },
    {
      jobTitle: "Fullstack Developer",
      image: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
      location: "Mumbai, India",
      salary: "$3000/mo",
      applyText: "Apply Now",
    },
  ]
  
  const platforms = [{name:"linkedin"},{name:"naukri"},{name:"Glassdoor"}]
  const tickIcon = "https://media.istockphoto.com/id/1299806659/vector/check-mark-icon-for-design-blank-white-and-black-backgrounds-line-icon.jpg?s=1024x1024&w=is&k=20&c=itoSyocJNDk0i4LQ7VXimL25o3wfx3lcJw--u3rgGd0=";


  return (
    <>
    <div className='bg-blue-300 p-5'>
        <div className='flex flex-col justify-center '>

        <p className='text-5xl mb-3 flex justify-center mb-4 '>Discover  Your Dream <br />Developer Job</p>
        {/* <p className='text-5xl mb-3  text-center'>Developer Job</p> */}
        <p className='mb-4 text-lg flex justify-center -ml-20'>Explore thousands of opportunities from top <br />companies worldwide</p>
        </div>
        <div className='flex gap-3 justify-center mb-5 -ml-2'>
            <input className="border-2 rounded-full w-70 h-10" type="text" name="" id="" />
            <button className='text-white border-none w-30  text-xl bg-black cursor-pointer border-2  rounded-lg' htmlFor="">Search</button>
        </div>

        <div className='flex justify-center gap-3 -ml-5'>
            <div className=' flex gap-2 border-2 px-3 py-2 rounded-3xl' >
                <img  className="w-6 h-6" src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="image" />
                <p className='text-xl cursor-pointer' name='linkedin'>linkedin</p>
            </div>
            <div className='flex gap-2 border-2 px-3 py-2 rounded-3xl'>
                <img className="w-6 h-6" src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="image" />
                <p className='text-xl cursor-pointer' name = 'naukri'>naukri</p>
            </div>
            <div className='flex gap-2 border-2 px-3 py-2 rounded-3xl'>
                <img className="w-6 h-6" src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="image" />
                <p className='text-xl cursor-pointer' name = 'Glassdoor'>Glassdoor</p>
            </div>  
        </div>


                <div>
                    
                </div>



        
    </div>
    <div>
       
        <div className="grid grid-cols-2 justify-center">
        {jobs.map((job, index) => (
            
            <Cards key={index} {...job} />
        ))}
        </div>

    </div>
    </>
    
  )
}

export default JobSearch