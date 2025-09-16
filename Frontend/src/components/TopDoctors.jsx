// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { AppContext } from "../context/Appcontext";

// const TopDoctors = () => {
//   const navigate = useNavigate();
//   const { doctors } = useContext(AppContext);
  
//   console.log("TopDoctors - doctors from context:", doctors);
//   console.log("TopDoctors - doctors length:", doctors?.length);
  
//   return (
//     <div className="flex flex-col items-center gap-4 my-16 text-gray-800">
//       <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
//       <p className="sm:w-1/3 text-center text-sm">
//         Simply browse through our extensive list of trusted doctors.
//       </p>
//       <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-5 px-4 md:px-0">
//         {doctors && doctors.length > 0 ? (
//           doctors.slice(0, 10).map((item, index) => (
//           <div
//            onClick={() => {navigate(`/appointments/${item._id}`); scrollTo(0, 0);}}
//             className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-300"
//             key={index}
//           >
//             <img
//               className="bg-blue-50 w-full"
//               src={item.image}
//               alt={item.name}
//             />
//             <div className="p-4">
//               <div className="flex items-center gap-2 text-sm text-center text-green-500 mb-2">
//                 <p className="w-2 h-2 bg-green-500 rounded-full"></p>
//                 <p>Available</p>
//               </div>
//               <h2 className="text-base font-semibold text-gray-800">
//                 {item.name}
//               </h2>
//               <p className="text-gray-500 text-sm mt-1">{item.speciality}</p>
//             </div>
//           </div>
//           ))
//         ) : (
//           <div className="col-span-full text-center py-8">
//             <p className="text-gray-500">Loading doctors...</p>
//           </div>
//         )}
//       </div>
//       <button onClick={() => {navigate("/doctors"); scrollTo(0, 0)}} className="bg-blue-50 text-sm cursor-pointer text-gray-800 px-12 py-3 rounded-full mt-10">
//         More
//       </button>
//     </div>
//   );
// };

// export default TopDoctors;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/Appcontext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");
  
  console.log("TopDoctors - doctors from context:", doctors);
  console.log("TopDoctors - doctors length:", doctors?.length);

  // Filter doctors based on search query
  const filteredDoctors = doctors?.filter(doctor =>
    doctor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.speciality?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const displayDoctors = searchQuery ? filteredDoctors : doctors?.slice(0, 10) || [];

  const handleDoctorClick = (doctorId) => {
    navigate(`/appointments/${doctorId}`);
    window.scrollTo(0, 0);
  };

  const handleMoreClick = () => {
    navigate("/doctors");
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 px-3 sm:px-6">
      {/* Header */}
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm text-gray-600">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* Search Bar */}
      <div className="w-full max-w-md mt-6 mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search doctors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-5 px-4 md:px-0">
        {displayDoctors && displayDoctors.length > 0 ? (
          displayDoctors.map((item, index) => (
            <div
              key={index}
              onClick={() => handleDoctorClick(item._id)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 hover:shadow-xl bg-white"
            >
              {/* Image Container with Professional Fallback */}
              <div className="relative bg-blue-50 h-48">
                {item.image && item.image !== '' ? (
                  <img
                    className="w-full h-full object-cover"
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      // If image fails to load, show professional placeholder
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                
                {/* Professional Doctor Placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center" style={{display: !item.image ? 'flex' : 'none'}}>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="w-12 h-3 bg-blue-300 rounded mx-auto mb-1"></div>
                    <div className="w-8 h-2 bg-blue-200 rounded mx-auto"></div>
                  </div>
                </div>

                {/* Available Status */}
                <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 shadow-sm">
                  <div className="flex items-center gap-1 text-sm text-green-500">
                    <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                    <p className="text-xs font-medium">Available</p>
                  </div>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500 mb-2">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Available</p>
                </div>
                <h2 className="text-base font-semibold text-gray-800 mb-1">
                  {item.name}
                </h2>
                <p className="text-gray-500 text-sm mb-3">{item.speciality}</p>
                
                {/* Rating */}
                

                {/* Book Button */}
                <button className="w-full text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200">
                  Book Appointment
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <div className="mb-4">
              <svg className="w-16 h-16 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery ? 'No doctors found' : 'Loading doctors...'}
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              {searchQuery 
                ? `No doctors match "${searchQuery}"` 
                : "Please wait while we load our doctors"
              }
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>

      {/* More Button */}
      {!searchQuery && doctors && doctors.length > 10 && (
        <button 
          onClick={handleMoreClick} 
          className="bg-blue-50 text-sm cursor-pointer text-gray-800 px-12 py-3 rounded-full mt-10 hover:bg-blue-100 transition-colors border border-blue-200"
        >
          More
        </button>
      )}
    </div>
  );
};

export default TopDoctors;