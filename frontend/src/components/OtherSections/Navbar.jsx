import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, Bell, LogOut, FileText } from "lucide-react";
import CompanyLogo from "../../assets/CompanyLogo.png";
import scrollStore from "../../store/scrollStore/scrollStore";
import userStore from "../../store/userStore/userStore";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

export const Navbar = observer(() => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user } = userStore;
  const [notificationCount, setNotificationCount] = useState(1);
  const userMenuRef = useRef(null);

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

  const handleLinkClickAndScrollToCommentCaMarche = () => {
    setIsOpen(false);
    setTimeout(() => {
      scrollStore.scrollToHowItWorks();
    }, 100);
  };

  const handleLogout = () => {
    userStore.setToken("");
    setIsUserMenuOpen(false);
    navigate("/");
  };
  //useeffect to close the list after clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            to="/"
            className="hover:text-gray-300 transition-colors duration-300"
            onClick={handleLinkClickAndScrollToCommentCaMarche}
          >
            How it works
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
        {
        user ? (
          <div className="flex items-center gap-6">
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 hover:text-gray-300 transition-colors duration-300"
              >
                <User size={24} />
                <span className="font-medium text-xl">{`${user.firstName} ${user.lastName}`}</span>
              </button>
              {/* User popover list */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-black bg-opacity-95 border border-gray-700 rounded-lg shadow-lg overflow-hidden z-50">
                  <div className="py-1">
                    <Link
                      to="/packages"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-gray-800 w-full text-left"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <FileText size={16} />
                      <span>My Packages</span>
                    </Link>
                    { <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-gray-800 w-full text-left"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User size={16} />
                      <span>Profile</span>
                    </Link> }

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-gray-800 w-full text-left"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}
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
              to="/"
              className="hover:text-gray-300 transition-colors duration-300 w-full text-center py-2"
              onClick={handleLinkClickAndScrollToCommentCaMarche}
            >
              How it works
            </Link>
            <Link
              className="hover:text-gray-300 transition-colors duration-300 w-full text-center py-2"
              onClick={handleScrollToContact}
            >
              Contact
            </Link>
            {user && (
              <>
                <Link
                  to="/packages"
                  className="hover:text-gray-300 transition-colors duration-300 w-full text-center py-2"
                  onClick={handleLinkClick}
                >
                  Packages
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:text-gray-300 transition-colors duration-300 w-full text-center py-2"
                >
                  Logout
                </button>
              </>
            )}
            <div className="flex flex-col space-y-4 pt-8 w-full max-w-xs">
              {user ? (
                <div className="flex items-center justify-center gap-3 border border-white px-6 py-3 rounded-xl w-full">
                  <User size={20} />
                  <span className="font-medium">{`${user.firstName} ${user.lastName}`}</span>
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
});

export default Navbar;
