import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import CompanyLogo from "../assets/CompanyLogo.png";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-opacity-90 bg-black flex items-center justify-between py-4 px-4 md:px-10 text-white shadow-md">
      {/*Desktop View*/}
      <div className="flex items-center">
        <Link to="/" className="ml-4">
          <img
            src={CompanyLogo}
            className="w-20 md:w-32 hover:opacity-80 transition-opacity duration-300"
            alt="Company Logo"
          />
        </Link>
      </div>

      <div className="hidden md:flex items-center absolute  left-1/2 transform -translate-x-1/2">
        <nav className="flex space-x-10 mr-8">
          <Link className="hover:text-gray-300 transition-colors duration-300">
            Services
          </Link>
          <Link className="hover:text-gray-300 transition-colors duration-300">
            Comment ça marche
          </Link>
          <Link className="hover:text-gray-300 transition-colors duration-300">
            Contact
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <Link className="border border-white px-4 py-2 rounded-xl hover:bg-white hover:text-black transition-all duration-300 ease-in-out">
          Login
        </Link>
        <Link className="border border-white px-4 py-2 rounded-xl hover:bg-white hover:text-black transition-all duration-300 ease-in-out">
          Sign up
        </Link>
      </div>

      {/* Mobile View */}
      <button
        className="md:hidden p-2 z-60"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={30} /> : <Menu size={30} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 md:hidden "
          onClick={handleLinkClick}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8 text-2xl">
            <Link
              to="/services"
              className="hover:text-gray-300 transition-colors duration-300"
              onClick={handleLinkClick}
            >
              Services
            </Link>
            <Link
              to="/how-it-works"
              className="hover:text-gray-300 transition-colors duration-300"
              onClick={handleLinkClick}
            >
              Comment ça marche
            </Link>
            <Link
              to="/contact"
              className="hover:text-gray-300 transition-colors duration-300"
              onClick={handleLinkClick}
            >
              Contact
            </Link>
            <div className="flex flex-col space-y-4 pt-8">
              <Link
                to="/login"
                className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
                onClick={handleLinkClick}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
                onClick={handleLinkClick}
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
