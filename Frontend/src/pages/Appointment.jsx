// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { AppContext } from "../context/Appcontext";
// import { assets } from "../assets/assets";
// import RelatedDoctors from "../components/RelatedDoctors";
// import { toast } from "react-toastify";
// import axios from "axios";

// const Appointment = () => {
//   const { docId } = useParams();
//   const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
//     useContext(AppContext);

//   const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

//   const [docInfo, setDocInfo] = useState(null);
//   const [docSlots, setDocSlots] = useState([]);
//   const [slotIndex, setSlotIndex] = useState(0);
//   const [slotTime, setSlotTime] = useState("");

//   const navigate = useNavigate();

//   const fetchDocInfo = async () => {
//     const docInfo = doctors.find((doc) => doc._id === docId);
//     setDocInfo(docInfo);
//   };

//   const getAvailiableSlots = async () => {
//     if (!docInfo) return;
    
//     let today = new Date();
//     let allSlots = [];

//     for (let i = 0; i < 7; i++) {
//       // Clone today's date and shift by i days
//       let currentDate = new Date(today);
//       currentDate.setDate(today.getDate() + i);

//       // Set end time for the day (9:00 PM)
//       let endTime = new Date(currentDate);
//       endTime.setHours(21, 0, 0, 0);

//       // Always start at 10:00 AM for consistency
//       currentDate.setHours(10, 0, 0, 0);

//       let timeSlots = [];

//       // while (currentDate < endTime) {
//       //   timeSlots.push({
//       //     datetime: new Date(currentDate),
//       //     time: currentDate.toLocaleTimeString([], {
//       //       hour: "2-digit",
//       //       minute: "2-digit",
//       //     }),
//       //   });

//       //   let day = currentDate.getDay();
//       //   let month = currentDate.getMonth() + 1;
//       //   let year = currentDate.getFullYear();
//       //   const slotDate = day + "-" + month + "-" + year;
//       //   const slotTime = for

//       //   // Increment by 30 minutes
//       //   currentDate.setMinutes(currentDate.getMinutes() + 30);
//       // }
//       while (currentDate < endTime) {
//         let formattedTime = currentDate.toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         });

//         let day = currentDate.getDate(); // day of month (1–31)
//         let month = currentDate.getMonth() + 1;
//         let year = currentDate.getFullYear();

//         const slotDate = day + "-" + month + "-" + year;
//         const slotTime = formattedTime;

//         const isSlotBooked =
//           docInfo.slots_booked && 
//           docInfo.slots_booked[slotDate] &&
//           docInfo.slots_booked[slotDate].includes(slotTime);

//         // For today (i === 0), check if slot is in the past
//         const isPastSlot = i === 0 && currentDate < new Date();

//         timeSlots.push({
//           datetime: new Date(currentDate),
//           time: formattedTime,
//           isBooked: isSlotBooked || false,
//           isPast: isPastSlot || false,
//         });

//         // add slot to array

//         // Increment by 30 minutes
//         currentDate.setMinutes(currentDate.getMinutes() + 30);
//       }

//       allSlots.push(timeSlots);
//     }

//     // Update state once with all slots
//     setDocSlots(allSlots);
//   };

//   const bookAppointment = async () => {
//     if (!token) {
//       toast.warn("Please login to book an appointment");
//       return navigate("/login");
//     }
    
//     if (!slotTime) {
//       toast.warn("Please select a time slot");
//       return;
//     }
    
//     if (!docSlots[slotIndex] || docSlots[slotIndex].length === 0) {
//       toast.warn("No slots available for this day");
//       return;
//     }
    
//     // Check if selected slot is already booked or in the past
//     const selectedSlot = docSlots[slotIndex].find(slot => slot.time === slotTime);
//     if (selectedSlot && selectedSlot.isBooked) {
//       toast.warn("This slot is already booked. Please select another slot.");
//       return;
//     }
//     if (selectedSlot && selectedSlot.isPast) {
//       toast.warn("This time slot has passed. Please select a future slot.");
//       return;
//     }
    
//     try {
//       const date = docSlots[slotIndex][0].datetime;

//       let day = date.getDate();
//       let month = date.getMonth() + 1;
//       let year = date.getFullYear();

//       const slotDate = day + "-" + month + "-" + year;

//       const { data } = await axios.post(
//         backendUrl + "/api/user/book-appointment",
//         { docId, slotDate, slotTime },
//         {
//           headers: { token },
//         }
//       );

//       if (data.success) {
//         toast.success(data.message);
//         getDoctorsData();
//         navigate("/my-appointments");
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     getAvailiableSlots();
//   }, [docInfo]);

//   useEffect(() => {
//     fetchDocInfo();
//   }, [doctors, docId]);

//   useEffect(() => {
//     // console.log(docSlots);
//   }, [docSlots]);

//   return (
//     docInfo && (
//       <div>
//         {/* doctor details */}
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div>
//             <img
//               className="bg-[#5f6fff] w-full sm:max-w-72 rounded-lg"
//               src={docInfo.image}
//               alt=""
//             />
//           </div>
//           <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
//             {/* doctors - name, degree  */}
//             <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
//               {docInfo.name}{" "}
//               <img className="w-5" src={assets.verified_icon} alt="" />
//             </p>
//             <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
//               <p>
//                 {docInfo.degree} - {docInfo.speciality}
//               </p>
//               <button className="py-0.5 px-2 border text-xs rounded-full">
//                 {docInfo.experience}
//               </button>
//             </div>

//             {/* doctors - about */}

//             <div>
//               <p className="flex items-center gap-1 text-s, font-medium text-gray-900 mt-3">
//                 About <img src={assets.info_icon} alt="" />{" "}
//               </p>
//               <p className="text-sm text-gray-500 max-w-[700px] mt-1">
//                 {docInfo.about}
//               </p>
//             </div>
//             <p className="text-gray-500 font-medium mt-4">
//               Appointment Fee:{" "}
//               <span className="text-gray-600">
//                 {currencySymbol}
//                 {docInfo.fees}
//               </span>
//             </p>
//           </div>
//         </div>

//         {/* booking Slots */}

//         <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700 ">
//           <p>Booking slots</p>
//           {docSlots.length > 0 ? (
//             <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
//               {docSlots.map((item, index) => {
//                 const availableSlots = item.filter(slot => !slot.isBooked && !slot.isPast).length;
//                 const totalSlots = item.length;
//                 const hasAvailableSlots = availableSlots > 0;
//                 return (
//                   <div
//                     onClick={() => {
//                       setSlotIndex(index);
//                       // setSlotTime(item[0].time);
//                     }}
//                     className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
//                       slotIndex === index
//                         ? "bg-[#5f6fff] text-white"
//                         : hasAvailableSlots
//                         ? "border border-gray-200 hover:bg-gray-50"
//                         : "border border-gray-200 bg-gray-100 opacity-60"
//                     }`}
//                     key={index}
//                     title={hasAvailableSlots ? `${availableSlots} of ${totalSlots} slots available` : "No available slots for this day"}
//                   >
//                     <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
//                     <p>{item[0] && item[0].datetime.getDate()}</p>
//                     <p className="text-xs text-gray-500 mt-1">
//                       {hasAvailableSlots ? `${availableSlots}/${totalSlots}` : "Full"}
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>
//           ) : (
//             <div className="mt-4 p-4 bg-gray-100 rounded-lg">
//               <p className="text-gray-600">No available slots for the next 7 days</p>
//             </div>
//           )}

//           {docSlots.length > 0 && (
//             <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
//               {docSlots[slotIndex] && docSlots[slotIndex].length > 0 ?
//                 docSlots[slotIndex].map((item, index) => (
//                   <p
//                     onClick={() => {
//                       if (!item.isBooked && !item.isPast) {
//                         setSlotTime(item.time);
//                       }
//                     }}
//                     className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full ${
//                       item.isBooked
//                         ? "bg-gray-200 text-gray-500 cursor-not-allowed opacity-60"
//                         : item.isPast
//                         ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
//                         : item.time === slotTime
//                         ? "bg-[#5f6fff] text-white cursor-pointer"
//                         : "text-gray-400 border border-gray-300 cursor-pointer hover:bg-gray-50"
//                     }`}
//                     key={index}
//                     title={
//                       item.isBooked 
//                         ? "This slot is already booked" 
//                         : item.isPast 
//                         ? "This time slot has passed" 
//                         : "Click to select this slot"
//                     }
//                   >
//                     {item.time.toLowerCase()}
//                     {item.isBooked && " (Booked)"}
//                     {item.isPast && " (Past)"}
//                   </p>
//                 )) : (
//                   <p className="text-gray-500 text-sm">No slots available for this day</p>
//                 )}
//             </div>
//           )}
//           <button
//             onClick={bookAppointment}
//             className="bg-[#5f6fff] text-white text-sm font-light px-14 py-3 rounded-full my-6"
//           >
//             Book an Appointment
//           </button>
//         </div>

//         {/* Related Doctors */}
//         <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
//       </div>
//     )
//   );
// };

// export default Appointment;
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/Appcontext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    if (!docInfo) return;
    
    setIsLoading(true);
    let today = new Date();
    let allSlots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      currentDate.setHours(10, 0, 0, 0);

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "-" + month + "-" + year;
        const slotTime = formattedTime;

        const isSlotBooked =
          docInfo.slots_booked && 
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime);

        const isPastSlot = i === 0 && currentDate < new Date();

        if (!isPastSlot && !isSlotBooked) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      if (timeSlots.length > 0) {
        allSlots.push(timeSlots);
      }
    }

    setDocSlots(allSlots);
    setIsLoading(false);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Please login to book an appointment");
      return navigate("/login");
    }
    
    if (!slotTime) {
      toast.warn("Please select a time slot");
      return;
    }
    
    if (!docSlots[slotIndex] || docSlots[slotIndex].length === 0) {
      toast.warn("No slots available for this day");
      return;
    }
    
    try {
      setIsLoading(true);
      const date = docSlots[slotIndex][0].datetime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "-" + month + "-" + year;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        {
          headers: { token },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  return (
    docInfo && (
        <div>
          {/* doctor details */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <img
                className="bg-[#5f6fff] w-full sm:max-w-72 rounded-lg"
                src={docInfo.image}
                alt=""
              />
            </div>
            <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
              {/* doctors - name, degree  */}
              <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
                {docInfo.name}{" "}
                <img className="w-5" src={assets.verified_icon} alt="" />
              </p>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                <p>
                  {docInfo.degree} - {docInfo.speciality}
                </p>
                <button className="py-0.5 px-2 border text-xs rounded-full">
                  {docInfo.experience}
                </button>
              </div>

              {/* doctors - about */}

              <div>
                <p className="flex items-center gap-1 text-s, font-medium text-gray-900 mt-3">
                  About <img src={assets.info_icon} alt="" />{" "}
                </p>
                <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                  {docInfo.about}
                </p>
              </div>
              <p className="text-gray-500 font-medium mt-4">
                Appointment Fee:{" "}
                <span className="text-gray-600">
                  {currencySymbol}
                  {docInfo.fees}
                </span>
              </p>
            </div>
          </div>

        {/* booking Slots */}

        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700 ">
          <p>Booking slots</p>
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          ) : docSlots.length > 0 ? (
            <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
              {docSlots.map((item, index) => (
                <div
                  onClick={() => {
                    setSlotIndex(index);
                    setSlotTime("");
                  }}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? "bg-[#5f6fff] text-white"
                      : "border border-gray-200"
                  }`}
                  key={index}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.length} slots
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-gray-600">No available slots for the next 7 days</p>
            </div>
          )}

          {docSlots.length > 0 && (
            <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
              {docSlots[slotIndex] && docSlots[slotIndex].length > 0 ?
                docSlots[slotIndex].map((item, index) => (
                  <p
                    onClick={() => {
                      setSlotTime(item.time);
                    }}
                    className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                      item.time === slotTime
                        ? "bg-[#5f6fff] text-white"
                        : "text-gray-400 border border-gray-300"
                    }`}
                    key={index}
                  >
                    {item.time.toLowerCase()}
                  </p>
                )) : (
                  <p className="text-gray-500 text-sm">No slots available for this day</p>
                )}
            </div>
          )}
          <button
            onClick={bookAppointment}
            disabled={!slotTime || isLoading}
            className="bg-[#5f6fff] text-white text-sm font-light px-14 py-3 rounded-full my-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : "Book an Appointment"}
          </button>
        </div>

        {/* Related Doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;