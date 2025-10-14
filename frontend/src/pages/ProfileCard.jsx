import React from "react";


function ProfileCard({ name, role, description, image, linkedin }) {
  const linkedinIcon = "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
  return (
     <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 hover:shadow-lg hover:scale-105 transition-all duration-300 w-80">

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={image}
            alt={name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
            <p className="text-sm text-gray-600">{role}</p>
          </div>
        </div>

        {/* LinkedIn icon */}
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700"
        >
           <img
            src={linkedinIcon}
            alt="LinkedIn"
            className="w-5 h-5 object-contain"
          />
          <div className="p-2 bg-gray-100 rounded-full">
            
          </div>
        </a>
      </div>

      {/* Divider */}
      <hr className="my-4 border-gray-300" />

      {/* Description */}
      <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
    </div>
  );
}

export default ProfileCard;
