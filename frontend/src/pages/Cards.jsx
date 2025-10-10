import React from "react";

function Cards(jobTitle,location,salary) {
  return (

    // <div className="flex justify-between border rounded-xl shadow-md p-4 w-64">
        
<>
    <div className="w-1/2 border-1">
      
      <h2 className="text-lg font-semibold">jobTitle</h2>
        <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" className="size-10 float-right" alt="hello"  />
      <p className="text-gray-500 text-sm">📍 location</p>
      <p className="text-gray-700 font-medium">salary</p>
   
    
      <button className="mt-2 w-30 bg-blue-600 text-white rounded-lg py-1 hover:bg-blue-700">
        apply
      </button>
    </div>
    {/* // </div> */}
    </>
    

    
  );
}

export default Cards;
