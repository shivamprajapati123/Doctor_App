import express from "express";
import { bookAppointment, cancelAppointment, getProfile, listAppointments, loginUser, paymentRazorPay, registerUser, updateProfile, verifyRazorPay } from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/get-profile",authUser,getProfile)
userRouter.post("/update-profile",upload.single('image'),authUser,updateProfile)
userRouter.post("/book-appointment",authUser,bookAppointment)
userRouter.get("/appointments",authUser,listAppointments);
userRouter.post("/cancel-appointment",authUser,cancelAppointment);
userRouter.post("/payment-razorpay",authUser,paymentRazorPay);
userRouter.post("/verifyRazorpay",authUser,verifyRazorPay);





export default userRouter;