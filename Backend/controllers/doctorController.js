import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });
    res.json({ success: true, message: "Availability changed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// doctor to login

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.json({ success: false, message: "Doctor doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    } else {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
      res.json({ success: true, message: "Login successful", token });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });

  }
}


// api to get list of appointment
const appointmentsDoctor = async (req, res) => {
  try {
    // accept docId from auth middleware (req.DocId), request body or query
    const docId = (req && req.DocId) || (req.body && req.body.docId) || (req.query && req.query.docId);

    console.log("appointmentsDoctor called - docId:", docId, "headers:", req.headers);

    if (!docId) {
      return res.json({ success: false, message: "Doctor id missing" });
    }

    // try matching common field names (string or ObjectId)
    let appointments = await appointmentModel.find({
      $or: [
        { doctorId: docId },
        { doctor: docId },
        { "doctor._id": docId },
        { "doctorId._id": docId },
      ],
    });

    // try ObjectId conversion if nothing found
    if (!appointments.length) {
      try {
        const mongoose = await import("mongoose");
        const oid = mongoose.Types.ObjectId(docId);
        appointments = await appointmentModel.find({
          $or: [
            { doctorId: oid },
            { doctor: oid },
            { "doctor._id": oid },
            { "doctorId._id": oid },
          ],
        });
      } catch (e) {
        console.log("appointmentsDoctor: ObjectId conversion failed:", e.message);
      }
    }

    console.log("appointments found:", appointments.length);
    return res.json({ success: true, appointments });
  } catch (error) {
    console.error("appointmentsDoctor error:", error);
    return res.json({ success: false, message: error.message });
  }
}

export { changeAvailability, doctorList, loginDoctor,appointmentsDoctor };