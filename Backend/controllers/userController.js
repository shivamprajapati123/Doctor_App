import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
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


export { registerUser, loginUser, getProfile, updateProfile };