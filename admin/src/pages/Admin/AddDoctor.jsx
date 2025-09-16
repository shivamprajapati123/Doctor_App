import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("Dermatologist");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!docImg) {
        return toast.error("Image not selected");
      }
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );
      // consolelog formdata
      // formData.forEach((value, key) => {
      //   console.log(`${key}: ${value}`);
      // });

       const { data } = await axios.post(
         backendUrl + "/api/admin/add-doctor",
         formData,
         {
           headers: { atoken: aToken },
         }
       );
      if (data.success) {
        toast.success("Doctor added successfully");
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1 Year");
        setFees("");
        setAbout("");
        setSpeciality("Dermatologist");
        setDegree("");
        setAddress1("");
        setAddress2("");
      } else { 
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-screen bg-gray-100 py-8 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <h1 className="text-3xl font-semibold text-gray-800 mb-8">
            Add Doctor
          </h1>

          {/* Upload Section */}
          <div className="mb-8">
            <div className="flex items-center space-x-4">
              <label htmlFor="doc-img" className="cursor-pointer">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
                  <img
                    src={
                      docImg ? URL.createObjectURL(docImg) : assets.upload_area
                    }
                    alt="Upload"
                    className="w-16 text-gray-400"
                  />
                </div>
              </label>
              <input
                onChange={(e) => setDocImg(e.target.files[0])}
                type="file"
                id="doc-img"
                className="hidden"
                accept="image/*"
              />
              <p className="text-gray-700 font-medium">Upload doctor picture</p>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Doctor Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Doctor Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Your email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Doctor Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience
                </label>
                <select
                  onChange={(e) => setExperience(e.target.value)}
                  value={experience}
                  name="experience"
                  id="experience"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
                >
                  <option value="1 Year">1 Year</option>
                  <option value="2 Year">2 Year</option>
                  <option value="3 Year">3 Year</option>
                  <option value="4 Year">4 Year</option>
                  <option value="5 Year">5 Year</option>
                  <option value="6 Year">6 Year</option>
                  <option value="7 Year">7 Year</option>
                  <option value="8 Year">8 Year</option>
                  <option value="9 Year">9 Year</option>
                  <option value="10 Year">10 Year</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fees
                </label>
                <input
                  value={fees}
                  onChange={(e) => setFees(e.target.value)}
                  type="number"
                  placeholder="Your fees"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Speciality
                </label>
                <select
                  onChange={(e) => setSpeciality(e.target.value)}
                  value={speciality}
                  name="speciality"
                  id="speciality"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
                >
                  <option value="dermatologist">Dermatologist</option>
                  <option value="oncologist">Oncologist</option>
                  <option value="cardiologist">Cardiologist</option>
                  <option value="otolaryngologist">Otolaryngologist</option>
                  <option value="trichologist">Trichologist</option>
                  <option value="nephrologist">Nephrologist</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Education
                </label>
                <input
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  type="text"
                  placeholder="Education"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  type="text"
                  placeholder="Address 1"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all mb-3"
                />
                <input
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  type="text"
                  placeholder="Address 2"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* About Me Section */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              About me
            </label>
             <textarea
               value={about}
               onChange={(e) => setAbout(e.target.value)}
               placeholder="Write about yourself"
               rows={5}
               required
               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
             />
          </div>

          {/* Submit Button */}
          <div className="flex justify-start">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Add doctor
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;

// import React from "react";
// import { assets } from "../../assets/assets";

// const AddDoctor = () => {
//   return (
//     <form>
//       <p>Add Doctor</p>
//       <div>
//         <div>
//           <label htmlFor="doc-img">
//             <img src={assets.upload_area} alt="" />
//           </label>
//           <input type="file" id="doc-img" hidden />
//           <p>Upload doctor picture</p>
//         </div>

//         <div>
//           <div>
//             <div>
//               <p>Doctor Name</p>
//               <input type="text" placeholder="Name" required />
//             </div>

//             <div>
//               <p>Doctor Email</p>
//               <input type="email" placeholder="Email" required />
//             </div>

//             <div>
//               <p>Doctor Password</p>
//               <input type="password" placeholder="Passsword" required />
//             </div>
//             <div>
//               <p>Experience</p>
//               <select name="" id="">
//                 <option value="1 Year">1 Year</option>
//                 <option value="2 Year">2 Year</option>
//                 <option value="3 Year">3 Year</option>
//                 <option value="4 Year">4 Year</option>
//                 <option value="5 Year">5 Year</option>
//                 <option value="6 Year">6 Year</option>
//                 <option value="7 Year">7 Year</option>
//                 <option value="8 Year">8 Year</option>
//                 <option value="9 Year">9 Year</option>
//                 <option value="10 Year">10 Year</option>
//               </select>
//             </div>

//             <div>
//               <p>Fees</p>
//               <input type="number" placeholder="Fees" required />
//             </div>
//           </div>

//           <div>
//             <div>
//               <p>Speciality</p>
//               <select name="speciality" id="speciality">
//                 <option value="dermatologist">Dermatologist</option>
//                 <option value="oncologist">Oncologist</option>
//                 <option value="cardiologist">Cardiologist</option>
//                 <option value="otolaryngologist">Otolaryngologist</option>
//                 <option value="trichologist">Trichologist</option>
//                 <option value="nephrologist">Nephrologist</option>
//               </select>
//             </div>

//             <div>
//               <p>Education</p>
//               <input type="text" placeholder="Education" required />
//             </div>

//             <div>
//               <p>Address</p>
//               <input type="text" placeholder="address-1" required />
//               <input type="text" placeholder="address-2" required />
//             </div>
//           </div>
//         </div>

//         <div>
//           <p>About Doctor</p>
//           <textarea placeholder="Write about doctor" rows={5} required />
//         </div>
//         <button>Add doctor</button>
//       </div>
//     </form>
//   );
// };

// export default AddDoctor;
