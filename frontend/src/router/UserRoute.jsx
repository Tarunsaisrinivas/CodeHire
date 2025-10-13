import React from 'react';
import { Link } from 'react-router-dom'; // Remove if you're not using React Router

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-6 text-gray-800">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-purple-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Oops! Page not found.</h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn’t exist or has been moved. Try asking your data instead 😉
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/" className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700 transition">
            Go Home
          </Link>
          <Link to="/contact" className="text-purple-600 underline hover:text-purple-800">
            Contact Support
          </Link>
        </div>
        <div className="mt-10 text-sm text-gray-400">
          &copy; {new Date().getFullYear()} DataGPT. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default NotFound;