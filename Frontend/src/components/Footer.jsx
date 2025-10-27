import React, { use } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* left section */}
        <div>
          <img onClick={() => navigate("/")} className="mb-5 w-40 cursor-pointer" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor,
            quod eligendi. Officiis autem numquam distinctio magnam ullam
            nostrum perspiciatis! Consequatur quibusdam quo repudiandae esse
            voluptatem nesciunt, facilis soluta quisquam odit!
          </p>
        </div>
        {/* middle section */}

        <div>
          <p className="text-xl font-medium mb-5">Company</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        {/* right section */}
        <div>
          <p className="text-xl font-medium mb-5">Get in touch</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91 8778798***</li>
            <li>abc@gmail.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
