import React from "react";
import { Link } from "react-router-dom";

const specialities = [
  { name: "Dermatologist", icon: "🔬" },
  { name: "Oncologist", icon: "🎗️" },
  { name: "Cardiologist", icon: "❤️" },
  { name: "Otolaryngologist", icon: "👂" },
  { name: "Trichologist", icon: "💇" },
  { name: "Nephrologist", icon: "🫘" },
];

const Speciality = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-gray-800">
      <h1 className="text-3xl font-medium">Find by Speciality</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>

      <div className="flex sm:justify-center gap-6 pt-5 w-full overflow-x-auto px-4">
        {specialities.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            to={`/doctors/${item.name}`}
            key={index}
            className="flex flex-col items-center justify-center text-sm cursor-pointer flex-shrink-0 w-28 sm:w-32 p-4 bg-white rounded-xl shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 transform break-words"
          >
            <span className="text-2xl sm:text-3xl mb-2">{item.icon}</span>
            <p className="text-center font-medium break-words">{item.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Speciality;
