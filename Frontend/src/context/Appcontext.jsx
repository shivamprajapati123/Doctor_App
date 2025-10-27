import { createContext } from "react";
import { doctors, tests } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [doctors, setDoctors] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const currencySymbol = "₹";
  const [token,setToken] = useState(localStorage.getItem("token")?localStorage.getItem("token"):false)
  const [userData,setUserData]=useState({
    name: "",
    email: "",
    phone: "",
    image: "",
    address: { line1: "", line2: "" },
    gender: "",
    dob: ""
  })



  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

const loadUserProfileData = async()=>{
  try {
    const { data } = await axios.get(
      backendUrl + '/api/user/get-profile',
      { headers: {token} }
    )
    if(data.success){
      const u = data.userData || {}
      setUserData({
        name: u.name || "",
        email: u.email || "",
        phone: u.phone || "",
        image: u.image || "",
        address: (u.address && typeof u.address === 'object') ? u.address : { line1: "", line2: "" },
        gender: u.gender || "",
        dob: u.dob || "",
        _id: u._id
      })
    }else{
      toast.error(data.message)
    }
  } catch (error) {
    console.log("Error loading user profile:", error);

    toast.error(error.message);
  }
}


  const value = {
    doctors,
    setDoctors,
    getDoctorsData,
    currencySymbol,
    tests,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,

  };
  

  useEffect(() => {
    getDoctorsData();
  }, []);

useEffect(()=>{
  if(token){
    loadUserProfileData()
  }else{
    setUserData({
      name: "",
      email: "",
      phone: "",
      image: "",
      address: { line1: "", line2: "" },
      gender: "",
      dob: ""
    })
  }
},[token])


  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
