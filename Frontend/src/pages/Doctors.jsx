// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { AppContext } from "../context/Appcontext";
// // oncologist  dermatologist nephrologist

// const Doctors = () => {
//   const { speciality } = useParams();
//   const navigate = useNavigate();
//   const [filterDoc, setFilteredDoc] = useState([]);
//   const [showFilter, SetShowFilter] = useState(false);

//   const { doctors } = useContext(AppContext);

//   const applyFilter = () => {
//     console.log("Doctors page - doctors from context:", doctors);
//     console.log("Doctors page - speciality param:", speciality);

//     if (speciality) {
//       const filtered = doctors.filter((doc) => {
//         const docSpeciality = doc.speciality?.trim();
//         const matchSpeciality = speciality.trim();
//         console.log(`Comparing: "${docSpeciality}" === "${matchSpeciality}"`);
//         return docSpeciality === matchSpeciality;
//       });
//       console.log("Filtered doctors:", filtered);
//       setFilteredDoc(filtered);
//     } else {
//       console.log("No speciality filter, showing all doctors:", doctors);
//       setFilteredDoc(doctors);
//     }
//   };

//   useEffect(() => {
//     applyFilter();
//   }, [doctors, speciality]);

//   return (
//     <div>
//       <p className="text-gray-600">Browse through the doctors specialist.</p>
//       <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
//         <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ?"bg-[#5f6fff] text-white":""}`} onClick={() => SetShowFilter(!showFilter)}>
//           Apply Filters
//         </button>
//         <div className={` flex-col gap-4 text-sm text-gray-600 ${showFilter ? "flex gap-1" : "hidden sm:flex "}}`}>
//           <p
//             onClick={() =>
//               speciality === "Dermatologist"
//                 ? navigate(`/doctors`)
//                 : navigate("/doctors/Dermatologist")
//             }
//             className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border cursor-pointer border-gray-300 rounded  transition-all ${
//               speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""
//             }`}
//           >
//             Dermatologist
//           </p>
//           <p
//             onClick={() =>
//               speciality === "Oncologist"
//                 ? navigate(`/doctors`)
//                 : navigate("/doctors/Oncologist")
//             }
//             className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border cursor-pointer border-gray-300 rounded  transition-all ${
//               speciality === "Oncologist" ? "bg-indigo-100 text-black" : ""
//             }`}
//           >
//             Oncologist
//           </p>
//           <p
//             onClick={() =>
//               speciality === "Cardiologist"
//                 ? navigate(`/doctors`)
//                 : navigate("/doctors/Cardiologist")
//             }
//             className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border cursor-pointer border-gray-300 rounded  transition-all ${
//               speciality === "Cardiologist" ? "bg-indigo-100 text-black" : ""
//             }`}
//           >
//             Cardiologist
//           </p>
//           <p
//             onClick={() =>
//               speciality === "Otolaryngologist"
//                 ? navigate(`/doctors`)
//                 : navigate("/doctors/Otolaryngologist")
//             }
//             className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border cursor-pointer border-gray-300 rounded  transition-all ${
//               speciality === "Otolaryngologist"
//                 ? "bg-indigo-100 text-black"
//                 : ""
//             }`}
//           >
//             Otolaryngologist
//           </p>
//           <p
//             onClick={() =>
//               speciality === "Trichologist"
//                 ? navigate(`/doctors`)
//                 : navigate("/doctors/Trichologist")
//             }
//             className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border cursor-pointer border-gray-300 rounded  transition-all ${
//               speciality === "Trichologist" ? "bg-indigo-100 text-black" : ""
//             }`}
//           >
//             Trichologist
//           </p>
//           <p
//             onClick={() =>
//               speciality === "Nephrologist"
//                 ? navigate(`/doctors`)
//                 : navigate("/doctors/Nephrologist")
//             }
//             className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border cursor-pointer border-gray-300 rounded  transition-all ${
//               speciality === "Nephrologist" ? "bg-indigo-100 text-black" : ""
//             }`}
//           >
//             Nephrologist
//           </p>
//         </div>

//         <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-5 px-4 md:px-0 ">
//           {filterDoc && filterDoc.length > 0 ? (
//             filterDoc.map((item, index) => (
//             <div
//               onClick={() => navigate(`/appointments/${item._id}`)}
//               className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-300"
//               key={index}
//             >
//               <img
//                 className="bg-blue-50 w-full"
//                 src={item.image}
//                 alt={item.name}
//               />
//               <div className="p-4">
//                 <div className="flex items-center gap-2 text-sm text-center text-green-500 mb-2">
//                   <p className="w-2 h-2 bg-green-500 rounded-full"></p>
//                   <p>Available</p>
//                 </div>
//                 <h2 className="text-base font-semibold text-gray-800">
//                   {item.name}
//                 </h2>
//                 <p className="text-gray-500 text-sm mt-1">{item.speciality}</p>
//               </div>
//             </div>
//             ))
//           ) : (
//             <div className="col-span-full text-center py-8">
//               <p className="text-gray-500">
//                 {doctors && doctors.length === 0
//                   ? "Loading doctors..."
//                   : "No doctors found for this speciality"
//                 }
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Doctors;

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/Appcontext";

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const [filterDoc, setFilteredDoc] = useState([]);
  const [showFilter, SetShowFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    console.log("Doctors page - doctors from context:", doctors);
    console.log("Doctors page - speciality param:", speciality);

    setIsLoading(true);

    if (speciality) {
      const filtered = doctors.filter((doc) => {
        const docSpeciality = doc.speciality?.trim();
        const matchSpeciality = speciality.trim();
        console.log(`Comparing: "${docSpeciality}" === "${matchSpeciality}"`);
        return docSpeciality === matchSpeciality;
      });
      console.log("Filtered doctors:", filtered);
      setFilteredDoc(filtered);
    } else {
      console.log("No speciality filter, showing all doctors:", doctors);
      setFilteredDoc(doctors);
    }

    setTimeout(() => setIsLoading(false), 300); // Smooth loading transition
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  const specialities = [
    { name: "Dermatologist", icon: "🔬" },
    { name: "Oncologist", icon: "🎗️" },
    { name: "Cardiologist", icon: "❤️" },
    { name: "Otolaryngologist", icon: "👂" },
    { name: "Trichologist", icon: "💇" },
    { name: "Nephrologist", icon: "🫘" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Find Your Specialist Doctor
          </h1>
          <p className="text-gray-600 text-lg">
            Browse through the doctors specialist.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <button
              className={`w-full py-3 px-6 border rounded-xl text-sm transition-all duration-300 transform hover:scale-105 shadow-lg ${
                showFilter
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-transparent shadow-blue-200"
                  : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:shadow-md"
              }`}
              onClick={() => SetShowFilter(!showFilter)}
            >
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                    clipRule="evenodd"
                  />
                </svg>
                {showFilter ? "Hide Filters" : "Apply Filters"}
              </div>
            </button>
          </div>

          {/* Sidebar Filters */}
          <div
            className={`lg:w-80 ${showFilter ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 sticky top-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Specialities
                </h3>
              </div>

              <div className="space-y-3">
                {specialities.map((spec, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      speciality === spec.name
                        ? navigate(`/doctors`)
                        : navigate(`/doctors/${spec.name}`)
                    }
                    className={`group flex items-center gap-4 p-4 border cursor-pointer rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                      speciality === spec.name
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-transparent shadow-lg scale-105"
                        : "bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-indigo-50 text-gray-700 border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <div
                      className={`text-2xl transition-transform duration-300 group-hover:scale-110 ${
                        speciality === spec.name
                          ? "filter brightness-0 invert"
                          : ""
                      }`}
                    >
                      {spec.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{spec.name}</p>
                      <p
                        className={`text-xs ${
                          speciality === spec.name
                            ? "text-blue-100"
                            : "text-gray-500"
                        }`}
                      >
                        Specialist Doctor
                      </p>
                    </div>
                    {speciality === spec.name && (
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Clear Filter Button */}
              {speciality && (
                <button
                  onClick={() => navigate("/doctors")}
                  className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 rounded-xl transition-all duration-300 transform hover:scale-105 font-medium"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {speciality ? `${speciality} Specialists` : "All Doctors"}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {isLoading
                      ? "Loading..."
                      : `${filterDoc.length} ${
                          filterDoc.length === 1 ? "doctor" : "doctors"
                        } found`}
                  </p>
                </div>

                {/* Sort/View Options */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Sort by: Relevance
                  </div>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {[...Array(8)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse"
                  >
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Doctors Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
                {filterDoc && filterDoc.length > 0 ? (
                  filterDoc.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => navigate(`/appointments/${item._id}`)}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      {/* Doctor Image */}
                      <div className="relative overflow-hidden">
                        <img
                          className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-105"
                          src={item.image}
                          alt={item.name}
                        />

                        {/* Availability Badge */}
                        <div className="absolute top-4 left-4 flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-green-600 text-sm font-medium">
                            Available
                          </span>
                        </div>
                      </div>

                      {/* Doctor Info */}
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          {item.speciality}
                        </p>
                        <button className="w-full text-sm bg-blue-600 hover:bg-blue-700 hover:shadow-md text-white font-medium py-2.5 px-4 mt-2 cursor-pointer rounded-lg transition-all duration-300">
                          Book Appointment
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  /* Empty State */
                  <div className="col-span-full text-center py-16">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      {doctors && doctors.length === 0
                        ? "Loading doctors..."
                        : "No doctors found"}
                    </h3>

                    <p className="text-gray-500 mb-6">
                      {doctors && doctors.length === 0
                        ? "Please wait while we fetch the doctors data"
                        : speciality
                        ? `No ${speciality} specialists are currently available`
                        : "No doctors are currently available"}
                    </p>
                    {speciality && (
                      <button
                        onClick={() => navigate("/doctors")}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        View All Doctors
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
