import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import CompanyLogo from "../assets/CompanyLogo.png";
import scrollStore from "../store/scrollStore/scrollStore";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleScrollToContact = () => {
    setIsOpen(false);
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Combined function to both close menu and scroll
  const handleLinkClickAndScrollToCommentCaMarche = () => {
    setIsOpen(false);
    setTimeout(() => {
      scrollStore.scrollToHowItWorks();
    }, 100);
  };

  return (
    <nav className="top-0 left-0 w-full z-50 bg-opacity-90 bg-black flex items-center justify-between py-4 px-4 md:px-10 text-white shadow-md">
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

      <div className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2">
        <nav className="flex lg:space-x-10 sm:space-x-4 mr-10">
          <Link
            to="/services"
            className="hover:text-gray-300 transition-colors duration-300"
          >
            Services
          </Link>
          <Link
            className="hover:text-gray-300 transition-colors duration-300"
            onClick={handleLinkClickAndScrollToCommentCaMarche}
          >
            Comment ça marche
          </Link>
          <Link
            className="hover:text-gray-300 transition-colors duration-300"
            onClick={handleScrollToContact}
          >
            Contact
          </Link>
        </nav>
      </div>

      <div className="hidden md:flex items-center gap-4">
        <Link
          to="/login"
          className="border border-white px-4 py-2 rounded-xl hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="border border-white px-4 py-2 rounded-xl hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
        >
          Sign up
        </Link>
      </div>

      {/* Mobile View */}
      <button
        className="md:hidden p-2 z-50 relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={30} color="white" /> : <Menu size={30} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 md:hidden z-40 overflow-auto"
          onClick={(e) => e.target === e.currentTarget && handleLinkClick()}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8 text-2xl text-white p-6">
            <Link
              to="/services"
              className="hover:text-gray-300 transition-colors duration-300 w-full text-center py-2"
              onClick={handleLinkClick}
            >
              Services
            </Link>
            <Link
              className="hover:text-gray-300 transition-colors duration-300 w-full text-center py-2"
              onClick={handleLinkClickAndScrollToCommentCaMarche}
            >
              Comment ça marche
            </Link>
            <Link
              className="hover:text-gray-300 transition-colors duration-300 w-full text-center py-2"
              onClick={handleScrollToContact}
            >
              Contact
            </Link>
            <div className="flex flex-col space-y-4 pt-8 w-full max-w-xs">
              <Link
                to="/login"
                className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-black transition-all duration-300 ease-in-out w-full text-center"
                onClick={handleLinkClick}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-black transition-all duration-300 ease-in-out w-full text-center"
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
