// import express from "express";
// import cors from "cors";
// import 'dotenv/config';
// import connectDb from "./config/mongodb.js";
// import connectCloudinary from "./config/cloudinary.js";
// import adminRouter from "./routes/adminRoute.js";
// import { HfInference } from "@huggingface/inference"; // Changed import

// // app config

// const app = express()
// const port = process.env.PORT || 5000

// connectDb()
// connectCloudinary()


// // middleware
// app.use(cors())
// app.use(express.json())
// // app.use(express.urlencoded({ extended: true }))

// // api endpoints


// app.use('/api/admin',adminRouter)

// app.get("/", (req, res) => {
//   res.send("Hello World! Api Working ")
// })

// // Load environment variables
// const HUGGINGFACEHUB_API_TOKEN = process.env.HUGGINGFACEHUB_API_TOKEN;

// // Check if the API token is available
// if (!HUGGINGFACEHUB_API_TOKEN) {
//   console.error("HUGGINGFACEHUB_API_TOKEN is not set in the environment variables.");
//   process.exit(1); // Exit the process if the token is missing
// }

// const hf = new HfInference(HUGGINGFACEHUB_API_TOKEN);

// async function askDoctor(question) {
//   try {
//     const result = await hf.textGeneration({
//       model: "mistralai/Mistral-7B-Instruct-v0.2",
//       inputs: question,
//       parameters: {
//         max_new_tokens: 512,
//         temperature: 0.6,
//       },
//     });
//     return result.generated_text;
//   } catch (error) {
//     console.error("Error during text generation:", error);
//     throw error; // Re-throw the error to be caught by the route handler
//   }
// }

// app.post('/ask_doctor', async (req, res) => {
//   const { question } = req.body;

//   if (!question) {
//     return res.status(400).json({ error: 'No question provided' });
//   }

//   try {
//     const response = await askDoctor(question);
//     return res.json({ response });
//   } catch (error) {
//     console.error("Error processing the request:", error);
//     return res.status(500).json({ error: 'Failed to generate response' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`)
// })





import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDb from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/adminRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import userRouter from "./routes/userRoute.js"


// app config 

const app = express()
const port = process.env.PORT || 4000

connectDb()
connectCloudinary()


// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// api endpoints


app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)




app.get("/", (req, res) => {
  res.send("Hello World! Api Working ")
})




app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})