import React, { useState, useEffect, useContext } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import Chatbot from "./Chatbot"; // Import the Chatbot component
import { AppContext } from "../context/Appcontext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showChatbot, setShowChatbot] = useState(false); // State to control the chatbot modal
  const { token, setToken,userData } = useContext(AppContext);

  // Update screen size dynamically
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const openChatbot = () => {
    setShowChatbot(true);
  };

  const closeChatbot = () => {
    setShowChatbot(false);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setToken(false)
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        className="w-28 md:w-44 cursor-pointer"
        src={assets.logo}
        alt=""
      />
      {/* Desktop Nav */}
      <ul className="hidden md:flex item-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">HOME</li>
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
        </NavLink>
        <NavLink to="/all_tests">
          <li className="py-1">ALL TESTS</li>
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
        </NavLink>
      </ul>
      {/* DR.GPT Button */}
      <ul className="hidden md:flex item-start font-medium">
        <li
          className="relative px-4 cursor-pointer"
          onClick={openChatbot} // Open chatbot on click
        >
          <div
            onClick={() => navigate("/")}
            className="py-1 px-3 button-wrapper text-gray-700 hover:text-gray-900 transition duration-300"
          >
            Dr.GPT
          </div>
        </li>
      </ul>
      {/* Right Section */}
      <div className="flex items-center gap-4">
        {token ? (
          <div
            className={`flex items-center gap-2 cursor-pointer relative ${
              !isMobile ? "group" : ""
            }`}
            onClick={() => isMobile && setDropdownOpen((prev) => !prev)} // only toggle on mobile
          >
            <img className="h-8 w-auto rounded-full" src={userData.image?userData.image:assets.profile_pic} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />

            {/* Dropdown */}
            <div
              className={`absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20
                ${
                  isMobile
                    ? dropdownOpen
                      ? "block"
                      : "hidden"
                    : "hidden group-hover:block"
                }`}
            >
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-[#5f6fff] text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt=""
        />

        {/* Mobile Menu */}
        <div
          className={`${
            showMenu ? "fixed w-full " : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} alt="" />
            <img
              className="w-7 cursor-pointer"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p>HOME</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">
              <p>ALL DOCTORS</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/all_tests">
              <p>ALL TESTS</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">
              <p>ABOUT</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              <p>CONTACT</p>
            </NavLink>
          </ul>
        </div>
      </div>
      {showChatbot && <Chatbot onClose={closeChatbot} />}{" "}
      {/* Render the chatbot modal */}
    </div>
  );
};

export default Navbar;
