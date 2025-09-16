// import React, { useContext, useState } from "react";
// import { assets } from "../assets/assets";
// import { AppContext } from "../context/Appcontext";

// const MyProfile = () => {
//   // const [userData, setUserData] = useState({
//   //   name: "Edward Simon",
//   //   image: assets.profile_pic,
//   //   email: "abc@email.com",
//   //   phone: "23456789",
//   //   address: {
//   //     line1: "123, Main Street",
//   //     line2: "Anytown, State, 12345",
//   //   },
//   //   gender: "Male",
//   //   dob: "2000-01-01",
//   // });

//   const { userData, setUserData, backendUrl, loadUserProfileData, token } =
//     useContext(AppContext);
//   const [isEdit, setIsEdit] = useState(true);
//   const [image, setImage] = useState(false);

//   const updateUserProfileData = async () => {
//     try {
//     } catch (error) {}
//   };

//   return (
//     userData && (
//       <div className="max-w-lg flex flex-col gap-2 text-sm">
//         <img
//           className="w-36 rounded"
//           src={userData.image || assets.profile_pic}
//           alt="user"
//         />

// {isEdit ? (
//           <label
//             htmlFor="image"
//             className="relative cursor-pointer group w-36 h-36"
//           >
//             <img
//               src={image ? URL.createObjectURL(image) : userData.image}
//               alt="profile"
//               className="w-36 h-36 object-cover rounded-full border-4 border-gray-200 shadow-md group-hover:opacity-80 transition"
//             />
//             <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition rounded-full">
//               Upload
//             </div>
//             <input
//               type="file"
//               id="image"
//               hidden
//               accept="image/*"
//               onChange={(e) => setImage(e.target.files[0])}
//             />
//           </label>
//         ) : (
//           <img
//             src={safeUserData.image}
//             alt="profile"
//             className="w-36 h-36 object-cover rounded-full border-4 border-gray-200 shadow-md"
//           />
//         )}

//         {isEdit ? (
//           <input
//             className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
//             type="text"
//             value={userData.name}
//             onChange={(e) =>
//               setUserData((prev) => ({ ...prev, name: e.target.value }))
//             }
//           />
//         ) : (
//           <p className="font-medium text-3xl text-neutral-800 mt-4">
//             {userData.name}
//           </p>
//         )}
//         <hr className="bg-zinc-400 h-[1px] border-none" />

//         <div>
//           <p className="text-neutral-500 underline mt-3">Contact Information</p>
//           <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
//             <p className="font-medium">Email id:</p>
//             <p className="text-blue-500">{userData.email}</p>
//             <p className="font-medium">Phone:</p>
//             {isEdit ? (
//               <input
//                 type="text"
//                 className="bg-gray-100 max-w-52"
//                 value={userData.phone}
//                 onChange={(e) =>
//                   setUserData((prev) => ({ ...prev, phone: e.target.value }))
//                 }
//               />
//             ) : (
//               <p className="text-blue-400">{userData.phone}</p>
//             )}

//             <p className="font-medium">Address:</p>
//             {isEdit ? (
//               <p>
//                 <input
//                   className="bg-gray-50"
//                   onChange={(e) =>
//                     setUserData((prev) => ({
//                       ...prev,
//                       address: { ...prev.address, line1: e.target.value },
//                     }))
//                   }
//                   value={userData.address.line1}
//                   type="text"
//                 />
//                 <br />
//                 <input
//                   className="bg-gray-50"
//                   onChange={(e) =>
//                     setUserData((prev) => ({
//                       ...prev,
//                       address: { ...prev.address, line2: e.target.value },
//                     }))
//                   }
//                   value={userData.address.line2}
//                   type="text"
//                 />
//               </p>
//             ) : (
//               <p className="text-gray-500">
//                 {userData.address.line1}
//                 <br />
//                 {userData.address.line2}
//               </p>
//             )}
//           </div>
//         </div>
//         <div>
//           <p className="text-neutral-500 underline mt-3">Basic Information</p>
//           <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
//             <p className="font-medium">Gender:</p>
//             {isEdit ? (
//               <select
//                 className="max-w-20 bg-gray-100"
//                 onChange={(e) => {
//                   setUserData((prev) => ({ ...prev, gender: e.target.value }));
//                 }}
//                 value={userData.gender}
//               >
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//               </select>
//             ) : (
//               <p className="text-gray-400">{userData.gender}</p>
//             )}
//             <p className="font-medium">Date of Birth:</p>
//             {isEdit ? (
//               <input
//                 className="bg-gray-100 max-w-28"
//                 type="date"
//                 value={userData.dob}
//                 onChange={(e) =>
//                   setUserData((prev) => ({ ...prev, dob: e.target.value }))
//                 }
//               />
//             ) : (
//               <p className="text-gray-400">{userData.dob}</p>
//             )}
//           </div>
//           <div className="mt-10">
//             {isEdit ? (
//               <button
//                 className="border border-[#5f6fff] px-8 py-2 rounded-full hover:bg-[#5f6fff] hover:text-white transition-all cursor-pointer"
//                 onClick={() => setIsEdit(false)}
//               >
//                 Save Information
//               </button>
//             ) : (
//               <button
//                 className="border border-[#5f6fff] px-8 py-2 rounded-full hover:bg-[#5f6fff] hover:text-white transition-all cursor-pointer"
//                 onClick={() => setIsEdit(true)}
//               >
//                 Edit
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default MyProfile;

import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/Appcontext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, backendUrl, loadUserProfileData, token } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(true);
  const [image, setImage] = useState(null);

  const safeUserData = {
    name: userData?.name || "",
    image: userData?.image || assets.profile_pic,
    email: userData?.email || "",
    phone: userData?.phone || "",
    address: {
      line1: userData?.address?.line1 || "",
      line2: userData?.address?.line2 || "",
    },
    gender: userData?.gender || "Male",
    dob: userData?.dob || "",
  };
  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();

      formData.append("name", safeUserData.name);
      formData.append("phone", safeUserData.phone);
      formData.append("gender", safeUserData.gender);
      formData.append("dob", safeUserData.dob);
      formData.append("address", JSON.stringify(safeUserData.address));
      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success("Profile updated successfully!");
        await loadUserProfileData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    userData && (
      <div className="max-w-lg flex flex-col gap-6 text-sm">
        {/* ✅ Single Profile Image */}
        <div className="flex flex-col items-center gap-3">
          {isEdit ? (
            <label
              htmlFor="image"
              className="relative cursor-pointer group w-36 h-36"
            >
              <img
                src={image ? URL.createObjectURL(image) : safeUserData.image}
                alt="profile"
                className="w-36 h-36 object-cover rounded-full border-4 border-gray-200 shadow-md group-hover:opacity-80 transition"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition rounded-full">
                Upload
              </div>
              <input
                type="file"
                id="image"
                hidden
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
          ) : (
            <img
              src={safeUserData.image}
              alt="profile"
              className="w-36 h-36 object-cover rounded-full border-4 border-gray-200 shadow-md"
            />
          )}

          {isEdit ? (
            <input
              className="bg-gray-50 text-2xl font-medium text-center mt-3 border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              type="text"
              value={safeUserData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <p className="font-medium text-2xl text-neutral-800 mt-3">
              {safeUserData.name}
            </p>
          )}
        </div>

        <hr className="bg-zinc-400 h-[1px] border-none" />

        {/* Contact Information */}
        <div>
          <p className="text-neutral-500 underline mt-3">Contact Information</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Email:</p>
            <p className="text-blue-500">{safeUserData.email}</p>

            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                type="text"
                className="bg-gray-50 border rounded-lg px-2 py-1 max-w-52 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={safeUserData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className="text-blue-400">{safeUserData.phone}</p>
            )}

            <p className="font-medium">Address:</p>
            {isEdit ? (
              <div className="flex flex-col gap-2">
                 <input
                   className="bg-gray-50 border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                   value={safeUserData.address.line1}
                   onChange={(e) =>
                     setUserData((prev) => ({
                       ...prev,
                       address: { ...prev.address, line1: e.target.value },
                     }))
                   }
                   type="text"
                   placeholder="Address Line 1"
                 />
                <input
                  className="bg-gray-50 border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  value={safeUserData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  type="text"
                  placeholder="Address Line 2"
                />
              </div>
            ) : (
              <p className="text-gray-500">
                {safeUserData.address.line1}
                <br />
                {safeUserData.address.line2}
              </p>
            )}
          </div>
        </div>

        <div>
          <p className="text-neutral-500 underline mt-3">Basic Information</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Gender:</p>
            {isEdit ? (
              <select
                className="bg-gray-50 border rounded-lg px-2 py-1 max-w-28 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={safeUserData.gender}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-400">{safeUserData.gender}</p>
            )}

            <p className="font-medium">Date of Birth:</p>
            {isEdit ? (
              <input
                className="bg-gray-50 border rounded-lg px-2 py-1 max-w-36 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                type="date"
                value={safeUserData.dob}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
              />
            ) : (
              <p className="text-gray-400">{safeUserData.dob}</p>
            )}
          </div>
        </div>

         {/* Buttons */}
         <div className="flex justify-center mt-8">
           {isEdit ? (
             <button
               className="px-6 py-2 rounded-full border border-blue-500 text-blue-500 font-medium hover:bg-blue-500 hover:text-white transition-all shadow-sm"
               onClick={updateUserProfileData}
             >
               Save Information
             </button>
           ) : (
             <button
               className="px-6 py-2 rounded-full border border-blue-500 text-blue-500 font-medium hover:bg-blue-500 hover:text-white transition-all shadow-sm"
               onClick={() => setIsEdit(true)}
             >
               Edit
             </button>
           )}
         </div>
      </div>
    )
  );
};

export default MyProfile;
