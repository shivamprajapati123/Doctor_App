import mongoose from "mongoose";

const connectDb = async () =>{

  mongoose.connection.on('connected',()=> console.log("MongoDB connected"))
  
  await mongoose.connect(`${process.env.MONGODB_URI}/drApp`)
}

export default connectDb;
