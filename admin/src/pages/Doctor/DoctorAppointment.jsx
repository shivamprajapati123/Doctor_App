import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext';

const DoctorAppointment = () => {

  const { dToken,appointments, getAppointments } = useContext(DoctorContext);
  console.log(appointments);

  useEffect(() => {
    if (dToken) {
      getAppointments();
      console.log("Appointments fetched:", appointments);
    }
  }, [dToken]);

  return (
    <div>
      
    </div>
  )
}

export default DoctorAppointment
