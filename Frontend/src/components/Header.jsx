import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-[#5f6fff] rounded-lg px-6 md:px-10 lg:px-20">
      {/* left side */}

      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl font-semibold text-white leading-tight md:leading-tight lg:leading-tight">
          Book Appointment <br className="hdden sm:block" />
          With Trusted Doctors
        </p>
        <div className="flex felx-col md:flwx-row items-center gap-3 text-white text-sm font-light">
          <p>
            {/* <img src={assets.group_profiles} alt="" /> */}
            Simply browse through our extensive list of trusted doctors, <br />
            schedule your appointment hassle-free.
          </p>
        </div>

        <a
          className="flex item-center gap-2  bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-500"
          href=""
        >
          Test Disease <img className="w-3" src={assets.arrow_icon} alt="" />
        </a>
        <a
          className="flex item-center gap-2  bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-500 button-wrapper"
          href=""
        >
          Chat with Dr.GPT{" "}
          <img className="w-3" src={assets.arrow_icon} alt="" />
        </a>
        <a
          className="flex item-center gap-2  bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-500"
          href=""
        >
          Book Appointment{" "}
          <img className="w-3" src={assets.arrow_icon} alt="" />
        </a>
      </div>
      {/* ?right side */}

      <div className="md:w-1/2 relative">
        <img
          className="w-full md:absolute bottom-0 h-auto rounded-lg"
          src={assets.header_img}
          alt=""
        />
      </div>
    </div>
  );
};

export default Header;
