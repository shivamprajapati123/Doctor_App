import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import razorpay from 'razorpay'
// api to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Please fill all fields" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email format" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Weak password. It should be at least 8 characters long and contain a mix of letters, numbers, and symbols." });
    }

    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword
    }
    const newUser = new userModel(userData);
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.json({ success: true, token })
    // return res.json({ success: true, message: "User registered successfully" });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

// Api to login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.json({ success: true, token })
    }

  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
}

// api to get user details

const getProfile = async (req, res) => {
  try {
    const userId = req.userId || req.body.userId;
    if (!userId) {
      return res.json({ success: false, message: "User ID missing" });
    }
    const userData = await userModel.findById(userId).select("-password");
    return res.json({ success: true, userData });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

// update user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId || req.body.userId;
    const { name, address, gender, dob, phone } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "User ID missing" });
    }

    if (!name || !gender || !dob || !phone) {
      return res.json({ success: false, message: "Please fill all fields" });
    }

    const updateDoc = { name, gender, dob, phone };

    // Parse address only if provided and valid JSON
    if (typeof address === 'string' && address.trim().length > 0) {
      try {
        updateDoc.address = JSON.parse(address);
      } catch (_) {
        return res.json({ success: false, message: "Invalid address format. Provide valid JSON." });
      }
    }

    // If image is present, upload first to get URL
    const imageFile = req.file;
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
      updateDoc.image = imageUpload.secure_url;
    }

    await userModel.findByIdAndUpdate(userId, updateDoc);
    const userData = await userModel.findById(userId).select("-password");
    return res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
}


// api to book appointment


const bookAppointment = async (req, res) => {
  try {
    const { docId, slotDate, slotTime } = req.body;
    const userID = req.userId;

    if (!userID) {
      return res.json({ success: false, message: "User ID missing" });
    }

    if (!docId || !slotDate || !slotTime) {
      return res.json({ success: false, message: "Please provide docId, slotDate, and slotTime" });
    }

    const docData = await doctorModel.findById(docId).select("-password");
    if (!docData) {
      return res.json({ success: false, message: "Doctor not found" });
    }
    if (!docData.available) {
      return res.json({ success: false, message: "Doctor is not available" })
    }
    let slots_booked = docData.slots_booked;

    // checking slots availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot already booked" })
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }
    const userData = await userModel.findById(userID).select("-password");
    delete docData.slots_booked;
    const appointmentData = {
      userId: userID,
      docID: docId,
      userData,
      docData,
      amount: docData.fees,
      slotDate,
      slotTime,
      date: Date.now()
    }
    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();


    // save new slote iin doc slots
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    return res.json({ success: true, message: "Appointment booked successfully" })

  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message })

  }
}

// api to get user appointment 
// const listAppointments = async (req, res) => {
//   try {
//       const userId = req.body;
//       const appointments = await appointmentModel.find({userId});
//       res.json({success:true,appointments});

//   } catch (error) {
//      console.log(error);
//     return res.json({ success: false, message: error.message })
//   }
// }

const listAppointments = async (req, res) => {
  try {
    const userId = req.userId; // get userId from auth middleware
    const appointments = await appointmentModel.find({ userId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//  api to cancel  appointment

// const cancelAppointment = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const { appointmentId } = req.body;
//     const appointmentData = await appointmentModel.findById(appointmentId);
//     // verify user
//     if (appointmentData.userId !== userId) {
//       return res.json({ success: false, message: "You are not authorized to cancel this appointment" });
//     }
//     await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

//     // releasing doctor slot

//     const { docID, slotDate, slotTime } = appointmentData;


//     const doctorData = await doctorModel.findById(docId);

//     let slots_booked = doctorData.slots_booked;
//     slots_booked[slotDate] = slots_booked[slotDate].filter(time => time !== slotTime);
//     await doctorModel.findByIdAndUpdate(docId, { slots_booked });
//     return res.json({ success: true, message: "Appointment cancelled successfully" });


//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// }


const cancelAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    // 1️⃣ Check if appointment exists
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    // 2️⃣ Verify user
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "You are not authorized to cancel this appointment" });
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


// onine pay 
const razorPayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})
const paymentRazorPay = async (req, res) => {

  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData || appointmentData.cancelled) {
      return res.json({ success: false, message: "Appointment cancelled or not found" })
    }
    // option for razorpay payment
    const options = {
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    }
    // creation of an order
    const order = await razorPayInstance.orders.create(options);
    res.json({ success: true, order });

    const amount = appointmentData.amount;
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }


}


// api to verify payment
const verifyRazorPay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorPayInstance.orders.fetch(razorpay_order_id);
    // console.log(orderInfo);
    if (orderInfo.status === 'paid') {
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      return res.json({ success: true, message: "Payment successful" });
    } else {
      return res.json({ success: false, message: "Payment not successful" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointments, cancelAppointment, paymentRazorPay, verifyRazorPay };