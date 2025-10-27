import React from "react";
import { AdminContext } from "../../context/AdminContext";
import { useContext } from "react";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { aToken, dashdata, cancelAppointment, getDashData } =
    useContext(AdminContext);

  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);
  // console.log(dashdata);
  return (
    dashdata && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.doctor_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashdata.doctors}
              </p>
              <p className="text-gray-400">Doctors</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashdata.appointments}
              </p>
              <p className="text-gray-400">Appointment</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashdata.patients}
              </p>
              <p className="text-gray-400">Patient</p>
            </div>
          </div>
        </div>

        <div className="bg-white w-full rounded-lg shadow-sm">
          {/* Header */}
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 border-b">
            <img src={assets.list_icon} alt="List icon" className="w-5 h-5" />
            <p className="font-semibold text-gray-800 text-base sm:text-lg">
              Latest Bookings
            </p>
          </div>

          {/* Booking list */}
          <div className="divide-y">
            {dashdata.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-6 py-4 hover:bg-gray-50 transition-all duration-300"
              >
                {/* Doctor info */}
                <div className="flex items-center gap-3">
                  <img
                    className="rounded-full w-12 h-12 object-cover flex-shrink-0"
                    src={item.docData.image}
                    alt={item.docData.name}
                  />
                  <div className="text-sm">
                    <p className="text-gray-800 font-medium text-base sm:text-sm">
                      {item.docData.name}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {slotDateFormat(item.slotDate)} | {item.slotTime}
                    </p>
                  </div>
                </div>

                {/* Status / Cancel button */}
                <div className="flex items-center sm:justify-end">
                  {item.cancelled ? (
                    <p className="text-red-500 font-semibold text-sm sm:text-base">
                      Cancelled
                    </p>
                  ) : (
                    <img
                      src={assets.cancel_icon}
                      alt="Cancel booking"
                      className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer hover:scale-110 active:scale-95 transition-transform"
                      onClick={() => cancelAppointment(item._id)}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
