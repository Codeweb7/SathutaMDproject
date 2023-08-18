import React from 'react';
import Logo from '../image/sathutamlogo.jpeg';

const Sign_in_up_header = () => {
  return (
    <div>
      {/* Navigation bar */}
      <nav className="sticky top-0 bg-white shadow">
        <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <img className="w-auto h-6 sm:h-7" src={Logo} alt="" />
          </div>

          {/* Navigation links */}
          <div className="flex flex-col md:flex-row md:mx-6">
            <a className="my-2 text-gray-800 transition-colors duration-300 transform hover:text-blue-500 md:mx-4 md:my-0" href="/Sign_up">Sign Up</a>
            <a className="my-2 text-gray-800 transition-colors duration-300 transform hover:text-blue-500 md:mx-4 md:my-0" href="/">Sign In</a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sign_in_up_header;
