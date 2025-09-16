
import React, { useContext, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/Appcontext";

const AllTest = () => {
  const { testName } = useParams();
  const navigate = useNavigate();
  const { tests } = useContext(AppContext);
  const [showFilter, SetShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { name: "Skin", icon: "🩺", color: "from-pink-500 to-rose-500", bgColor: "bg-pink-50", textColor: "text-pink-700" },
    { name: "Cancer", icon: "🎗️", color: "from-purple-500 to-indigo-500", bgColor: "bg-purple-50", textColor: "text-purple-700" },
    { name: "Cardio", icon: "❤️", color: "from-red-500 to-pink-500", bgColor: "bg-red-50", textColor: "text-red-700" },
    { name: "ENT", icon: "👂", color: "from-blue-500 to-cyan-500", bgColor: "bg-blue-50", textColor: "text-blue-700" },
    { name: "Hair", icon: "💇", color: "from-amber-500 to-orange-500", bgColor: "bg-amber-50", textColor: "text-amber-700" },
    { name: "Kidney", icon: "🫘", color: "from-green-500 to-emerald-500", bgColor: "bg-green-50", textColor: "text-green-700" },
  ];

  const filteredTests = useMemo(() => {
    if (!tests || tests.length === 0) return [];

    let filtered = tests;

    if (testName) {
      filtered = filtered.filter(
        (t) => t.disease_cat.toLowerCase() === testName.toLowerCase()
      );
    }

    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(lowercasedQuery) ||
          t.disease_type.toLowerCase().includes(lowercasedQuery) ||
          t.disease_cat.toLowerCase().includes(lowercasedQuery)
      );
    }
    return filtered;
  }, [tests, testName, searchQuery]);

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.name === category);
    return cat ? cat.icon : "🔬";
  };

  const getCategoryColor = (category) => {
    const cat = categories.find(c => c.name === category);
    return cat ? cat.color : "from-gray-500 to-gray-600";
  };

  const getCategoryInfo = (category) => {
    const cat = categories.find(c => c.name === category);
    return cat || { name: category, icon: "🔬", color: "from-gray-500 to-gray-600", bgColor: "bg-gray-50", textColor: "text-gray-700" };
  };

  const getTestCount = (categoryName) => {
    if (!tests || tests.length === 0) return 0;
    return tests.filter(t => t.disease_cat === categoryName).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header & Search */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-3xl font-bold text-gray-800">
              {testName ? `${testName} Tests` : "All Medical Tests"}
            </h1>
            <div className="w-full md:w-1/2 lg:w-1/3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search tests, diseases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-gray-800 bg-white rounded-full text-sm shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
            <p className="text-gray-600">
              Showing {filteredTests.length} {filteredTests.length === 1 ? 'test' : 'tests'}
              {searchQuery && ` for "${searchQuery}"`}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="px-4 py-1.5 bg-gray-200 text-gray-700 font-medium rounded-full hover:bg-gray-300 transition-colors flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                Clear Search
              </button>
            )}
          </div>
        </div>

        {/* Filter Toggle Button for Mobile */}
      <button
          className={`lg:hidden mb-6 px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg ${
            showFilter 
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-blue-500/25" 
              : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300"
        }`}
        onClick={() => SetShowFilter(!showFilter)}
      >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            {showFilter ? "Hide Filters" : "Show Filters"}
          </div>
      </button>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <div className={`lg:w-64 flex-shrink-0 ${showFilter ? "block" : "hidden lg:block"}`}>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-4 sticky top-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <div className="p-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </div>
                Filter by Category
              </h3>
              
              <div className="space-y-3">
                {/* All Tests Option */}
                <button
                  onClick={() => navigate("/all_tests")}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group ${
                    !testName 
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25" 
                      : "bg-gray-50 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 text-gray-700 hover:shadow-md"
                  }`}
                >
                  <div className={`p-1.5 rounded-lg ${!testName ? "bg-white/20" : "bg-blue-100 group-hover:bg-blue-200"}`}>
                    <span className="text-lg">🔬</span>
                  </div>
                  <div className="flex-1 text-left">
                    <span className="font-semibold text-sm">All Tests</span>
                    <p className="text-xs opacity-80">Complete collection</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                    !testName ? "bg-white/30 text-white" : "bg-blue-100 text-blue-700 group-hover:bg-blue-200"
                  }`}>
                    {tests?.length || 0}
                  </span>
                </button>

                {/* Category Options */}
                {categories.map((category) => {
                  const isActive = testName === category.name;
                  const testCount = getTestCount(category.name);
                  const categoryInfo = getCategoryInfo(category.name);
                  
                  return (
                    <button
                      key={category.name}
            onClick={() =>
                        isActive 
                          ? navigate("/all_tests") 
                          : navigate(`/all_tests/${category.name}`)
                      }
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group ${
                        isActive 
                          ? `bg-gradient-to-r ${category.color} text-white shadow-lg` 
                          : `bg-gray-50 hover:${category.bgColor} text-gray-700 hover:shadow-md hover:${category.textColor}`
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg transition-colors duration-300 ${
                        isActive 
                          ? "bg-white/20" 
                          : `bg-gray-100 group-hover:${category.bgColor.replace('bg-', 'bg-').replace('-50', '-100')}`
                      }`}>
                        <span className="text-lg">{category.icon}</span>
                      </div>
                      <div className="flex-1 text-left">
                        <span className="font-semibold text-sm">{category.name}</span>
                        <p className="text-xs opacity-80">
                          {testCount === 0 ? 'No tests available' : `${testCount} test${testCount === 1 ? '' : 's'}`}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-bold transition-colors duration-300 ${
                        isActive 
                          ? "bg-white/30 text-white" 
                          : `bg-gray-200 group-hover:${category.bgColor.replace('bg-', 'bg-').replace('-50', '-200')} group-hover:${category.textColor.replace('text-', 'text-').replace('-700', '-800')}`
                      }`}>
                        {testCount}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Tests Grid */}
          <div className="flex-1">
            {/* Tests Grid */}
            {filteredTests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTests.map((item, index) => {
                  const categoryInfo = getCategoryInfo(item.disease_cat);
                  
                  return (
                    <div
                      key={index}
              onClick={() => navigate(`/tests/${item._id}`)}
                      className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-3 hover:scale-105 border border-white/20"
                    >
                      {/* Card Header with Gradient */}
                      <div className={`h-32 bg-gradient-to-br ${getCategoryColor(item.disease_cat)} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute top-4 right-4 text-3xl opacity-30">
                          {getCategoryIcon(item.disease_cat)}
                        </div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                            <span className="text-xs font-semibold bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                              Available
                            </span>
                          </div>
                        </div>
                        <div className="absolute top-4 left-4">
                          <div className={`px-2 py-1 rounded-full text-xs font-bold ${categoryInfo.bgColor} ${categoryInfo.textColor}`}>
                            {item.disease_cat}
                          </div>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-6">
                        <div className="mb-4">
                          <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium text-xs">
                              {item.disease_type}
                            </span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-medium text-xs">
                              {item.disease_cat}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-xl font-bold text-green-600">
                            {item.price}
                          </div>
                          <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-300">
                            <span className="text-xs">View Details</span>
                            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6H9a2 2 0 00-2 2v10a2 2 0 002 2h6a2 2 0 002-2V8a2 2 0 00-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">No tests found</h3>
                <p className="text-gray-600 text-base mb-6 max-w-md mx-auto">
                  {searchQuery 
                    ? `No tests match your search for "${searchQuery}"` 
                    : "No tests available in this category"
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium text-sm"
                    >
                      Clear Search
                    </button>
                  )}
                  <button
                    onClick={() => navigate("/all_tests")}
                    className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium text-sm"
                  >
                    View All Tests
                  </button>
                </div>
              </div>
            )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AllTest;


// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { AppContext } from "../context/Appcontext";
// import { assets } from "../assets/assets";
// // Cancer  Skin Kidney

// const AllTest = () => {
//   const { testName } = useParams();
//   const navigate = useNavigate();
//   const [filterTest, setFilterTest] = useState([]);
//   const { tests } = useContext(AppContext);
//   const [showFilter, SetShowFilter] = useState(false);

//   const applyFilter = () => {
//     if (testName) {
//       setFilterTest(
//         tests.filter(
//           (t) => t.disease_cat.toLowerCase() === (testName || "").toLowerCase()
//         )
//       );
//     } else {
//       setFilterTest(tests);
//     }
//   };

//   useEffect(() => {
//     if (tests.length > 0) {
//       applyFilter();
//     }
//   }, [tests, testName]);

//   return (
//     <div>
//       <p className="text-gray-600">Browse through the different disease.</p>
//       <button
//         className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
//           showFilter ? "bg-[#5f6fff] text-white" : ""
//         }`}
//         onClick={() => SetShowFilter(!showFilter)}
//       >
//         Apply Filters
//       </button>
//       <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
//         <div className={` flex-col gap-4 text-sm text-gray-600 ${showFilter ? "flex gap-1" : "hidden sm:flex "}}`}>
//           <p
//             onClick={() =>
//               testName === "Skin"
//                 ? navigate(`/all_tests`)
//                 : navigate("/all_tests/Skin")
//             }
//             className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border cursor-pointer border-gray-300 rounded transition-all ${
//               testName === "Skin" ? "bg-indigo-100 text-black" : ""
//             }`}
//           >
//             Skin
//           </p>
//           <p
//             onClick={() =>
//               testName === "Cancer"
//                 ? navigate(`/all_tests`)
//                 : navigate("/all_tests/Cancer")
//             }
//             className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border cursor-pointer border-gray-300 rounded  transition-all ${
//               testName === "Cancer" ? "bg-indigo-100 text-black" : ""
//             }`}
//           >
//             Cancer
//           </p>
//           <p
//             onClick={() =>
//               testName === "Cardio"
//                 ? navigate(`/all_tests`)
//                 : navigate("/all_tests/Cardio")
//             }
//             className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border cursor-pointer border-gray-300 rounded  transition-all ${
//               testName === "Cardio" ? "bg-indigo-100 text-black" : ""
//             }`}
//           >
//             Cardio
//           </p>
//           <p
//             onClick={() =>
//               testName === "ENT"
//                 ? navigate(`/all_tests`)
//                 : navigate("/all_tests/ENT")
//             }
//             className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border cursor-pointer border-gray-300 rounded  transition-all ${
//               testName === "ENT" ? "bg-indigo-100 text-black" : ""
//             }`}
//           >
//             ENT
//           </p>
//           <p
//             onClick={() =>
//               testName === "Hair"
//                 ? navigate(`/all_tests`)
//                 : navigate("/all_tests/Hair")
//             }
//             className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border cursor-pointer border-gray-300 rounded  transition-all ${
//               testName === "Hair" ? "bg-indigo-100 text-black" : ""
//             }`}
//           >
//             Hair
//           </p>
//           <p
//             onClick={() =>
//               testName === "Kidney"
//                 ? navigate(`/all_tests`)
//                 : navigate("/all_tests/Kidney")
//             }
//             className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border cursor-pointer border-gray-300 rounded  transition-all ${
//               testName === "Kidney" ? "bg-indigo-100 text-black" : ""
//             }`}
//           >
//             Kidney
//           </p>
//         </div>

//         <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-5 px-4 md:px-0 ">
//           {filterTest.map((item, index) => (
//             <div
//               onClick={() => navigate(`/tests/${item._id}`)}
//               className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-300"
//               key={index}
//             >
//               <img
//                 className="bg-blue-50 w-full"
//                 src={assets.about_image}
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
//                 <p className="text-gray-500 text-sm mt-1">
//                   {item.disease_type} ({item.disease_cat})
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllTest;