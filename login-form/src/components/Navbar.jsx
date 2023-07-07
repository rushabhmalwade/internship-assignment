import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className=" border-b-2 flex flex-row align justify-between md:flex-row px-10 bg-gray-900 bg-white fixed w-full top-0 left-0 md:border-b-2 border-gray-200">
        <div className=" mt-4 content-center  font-medium   bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
          <Link to="/" className="block py-2 pl-3 pr-4 text-blue bg-white text-blue-700  md:bg-transparent md:text-blue-700 md:p-4 md:dark:text-blue-500">
            Home
          </Link>
          </div>

          <div className="flex flex-row  mt-4  md:p-4 right-10 font-medium rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
          <Link to="/login-form" className=" py-2 pl-3 pr-4 text-blue bg-white text-blue-700  md:bg-transparent md:text-blue-700 md:p-0">
            Sign-Up
          </Link>
          <Link to="/forget-password" className=" py-2 pl-3 pr-4 text-blue bg-white text-blue-700  md:bg-transparent md:text-blue-700 md:p-0">
            Forget Password?
          </Link>
          </div>
      </nav>
    </>
  );
};

export default Navbar;
