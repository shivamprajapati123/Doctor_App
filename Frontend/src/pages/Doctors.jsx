import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/Appcontext";
// oncologist  dermatologist nephrologist

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const [filterDoc, setFilteredDoc] = useState([]);
  const [showFilter, SetShowFilter] = useState(false);

  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    console.log("Doctors page - doctors from context:", doctors);
    console.log("Doctors page - speciality param:", speciality);
    
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
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ?"bg-[#5f6fff] text-white":""}`} onClick={() => SetShowFilter(!showFilter)}>
          Apply Filters
        </button>
        <div className={` flex-col gap-4 text-sm text-gray-600 ${showFilter ? "flex gap-1" : "hidden sm:flex "}}`}>
          <p
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate(`/doctors`)
                : navigate("/doctors/Dermatologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border cursor-pointer border-gray-300 rounded  transition-all ${
              speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Dermatologist
          </p>
          <p
            onClick={() =>
              speciality === "Oncologist"
                ? navigate(`/doctors`)
                : navigate("/doctors/Oncologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border cursor-pointer border-gray-300 rounded  transition-all ${
              speciality === "Oncologist" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Oncologist
          </p>
          <p
            onClick={() =>
              speciality === "Cardiologist"
                ? navigate(`/doctors`)
                : navigate("/doctors/Cardiologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border cursor-pointer border-gray-300 rounded  transition-all ${
              speciality === "Cardiologist" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Cardiologist
          </p>
          <p
            onClick={() =>
              speciality === "Otolaryngologist"
                ? navigate(`/doctors`)
                : navigate("/doctors/Otolaryngologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border cursor-pointer border-gray-300 rounded  transition-all ${
              speciality === "Otolaryngologist"
                ? "bg-indigo-100 text-black"
                : ""
            }`}
          >
            Otolaryngologist
          </p>
          <p
            onClick={() =>
              speciality === "Trichologist"
                ? navigate(`/doctors`)
                : navigate("/doctors/Trichologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border cursor-pointer border-gray-300 rounded  transition-all ${
              speciality === "Trichologist" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Trichologist
          </p>
          <p
            onClick={() =>
              speciality === "Nephrologist"
                ? navigate(`/doctors`)
                : navigate("/doctors/Nephrologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border cursor-pointer border-gray-300 rounded  transition-all ${
              speciality === "Nephrologist" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Nephrologist
          </p>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-5 px-4 md:px-0 ">
          {filterDoc && filterDoc.length > 0 ? (
            filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointments/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-300"
              key={index}
            >
              <img
                className="bg-blue-50 w-full"
                src={item.image}
                alt={item.name}
              />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500 mb-2">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Available</p>
                </div>
                <h2 className="text-base font-semibold text-gray-800">
                  {item.name}
                </h2>
                <p className="text-gray-500 text-sm mt-1">{item.speciality}</p>
              </div>
            </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">
                {doctors && doctors.length === 0 
                  ? "Loading doctors..." 
                  : "No doctors found for this speciality"
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
