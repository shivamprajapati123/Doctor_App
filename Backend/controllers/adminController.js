// api to add doctor
import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js"
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";




const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;


    // console.log({name,email});
    const imageFile = req.file;
    // console.log("Received data:", { name, email, password, speciality, degree, experience, about, fees, address },image);


    // checking for the data add adoctor
    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.json({ success: false, message: "Please fill all fields" });
    }
    // validating the email formate
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email format" });
    }
    // validating the password formate
    if (password.length < 8) {
      return res.json({ success: false, message: "Weak password. It should be at least 8 characters long and contain a mix of letters, numbers, and symbols." });
    }
    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Check if imageFile is defined before accessing its properties
    if (!imageFile || !imageFile.path) {
      return res.json({ success: false, message: "Image file is missing" });
    }

    // upload image
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
    const imageUrl = imageUpload.secure_url;


    const doctorData = {
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
      image: imageUrl

    }

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();
    res.json({ success: true, message: "Doctor added successfully" });


  } catch (error) {
    console.error("Error adding doctor:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}


const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET)
      res.json({ success: true, token })

    } else {
      res.json({ success: false, message: 'Invalid Details' })
    }
  } catch (error) {
    console.log(error);
    res.json({ success: true, message: error.message })

  }
}

const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

// api to get all appointments list
const appointmentsList = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })

  }
}
// appi for cancel


const appointmentCancel = async (req, res) => {
  try {

    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    // 1️⃣ Check if appointment exists
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }



    // 3️⃣ Mark appointment as cancelled (not delete)
    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    // 4️⃣ Release doctor slot
    const { docID, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docID);
    if (doctorData && doctorData.slots_booked[slotDate]) {
      let slots_booked = doctorData.slots_booked;
      slots_booked[slotDate] = slots_booked[slotDate].filter(time => time !== slotTime);
      await doctorModel.findByIdAndUpdate(docID, { slots_booked });
    }

    return res.json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// api to get dashboard data for admion panel

const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({})
    const users = await userModel.find({})
    const appointments = await appointmentModel.find({})

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse().slice(0,7)
    }
    res.json({ success: true, dashData })



  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });

  }
}
export { addDoctor, loginAdmin, allDoctors, appointmentsList, appointmentCancel, adminDashboard };


