// import React, { useState } from "react";
// import axios from "axios";

// const QuickEntryForm = () => {
//   const [formData, setFormData] = useState({
//     RegistrationId: "PAT137",
//     FirstName: "",
//     LastName: "",
//     PhoneNumber: "",
//     Email: "",
//     Age: "",
//     Gender: "",
//     RefferedBy: "",
//      Doctor: "",
//   });

//   // Handle form input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     const response = await axios.post("http://127.0.0.1:8000/basic-info/", formData);
//   //     alert(response.data.message);
//   //   } catch (error) {
//   //     console.error("Error:", error.response.data);
//   //     alert("Submission failed!");
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://127.0.0.1:8000/Patient/basic-info/" ,formData);
//       alert(response.data.message);
//     } catch (error) {
//       console.error("Error:", error.response?.data || error.message);
//       alert("Submission failed!");
//     }
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen w-full p-6">
//       <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full mx-auto">
//         <h2 className="text-xl font-bold mb-4">Quick Entry</h2>
//         <p className="text-sm text-gray-500 mb-6">
//           <span className="text-blue-600">Home</span> / Quick Entry
//         </p>
//         <div className="border-t border-gray-300 mb-6"></div>
//         <h3 className="text-lg font-semibold mb-4">Basic Info</h3>

//         {/* Row for Registration ID, First Name, Last Name, Mobile, Email */}
//         <div className="grid grid-cols-5 gap-4 mb-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Registration ID</label>
//             <input
//               type="text"
//               name="registration_id"
//               value={formData.registration_id}
//               onChange={handleChange}
//               className="w-full p-1 border border-gray-300 rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">First Name</label>
//             <input
//               type="text"
//               name="first_name"
//               value={formData.first_name}
//               onChange={handleChange}
//               className="w-full p-1 border border-gray-300 rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Last Name</label>
//             <input
//               type="text"
//               name="last_name"
//               value={formData.last_name}
//               onChange={handleChange}
//               className="w-full p-1 border border-gray-300 rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Mobile No</label>
//             <input
//               type="text"
//               name="mobile"
//               value={formData.mobile}
//               onChange={handleChange}
//               className="w-full p-1 border border-gray-300 rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-1 border border-gray-300 rounded-md"
//             />
//           </div>
//         </div>

//         {/* Second Row Inputs */}
//         <div className="grid grid-cols-5 gap-4 mb-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Age</label>
//             <input
//               type="number"
//               name="age"
//               value={formData.age}
//               onChange={handleChange}
//               className="w-full p-1 border border-gray-300 rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Gender</label>
//             <select
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               className="w-full p-1 border border-gray-300 rounded-md"
//             >
//               <option value="">Select Gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Referred By</label>
//             <input
//               type="text"
//               name="referred_by"
//               value={formData.referred_by}
//               onChange={handleChange}
//               className="w-full p-1 border border-gray-300 rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Doctor</label>
//             <select
//               name="doctor"
//               value={formData.doctor}
//               onChange={handleChange}
//               className="w-full p-1 border border-gray-300 rounded-md"
//             >
//               <option value="">Select Doctor</option>
//               <option value="Doctor 1">Doctor 1</option>
//               <option value="Doctor 2">Doctor 2</option>
//             </select>
//           </div>
//         </div>

//         <button type="submit" className="bg-blue-600 text-white p-2 rounded-md">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default QuickEntryForm;

import React, { useState } from "react";
import axios from "axios";

const QuickEntryForm = () => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    Email: "",
    Age: "",
    Gender: "",
    RefferedBy: "",
    Doctor: "",
  });

  console.log(formData);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/Patient/basic-info/",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Submission failed! ");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen w-full p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full mx-auto">
        <h2 className="text-xl font-bold mb-4">Quick Entry</h2>
        <p className="text-sm text-gray-500 mb-6">
          <span className="text-blue-600">Home</span> / Quick Entry
        </p>
        <div className="border-t border-gray-300 mb-6"></div>
        <h3 className="text-lg font-semibold mb-4">Basic Info</h3>

        {/* First Row */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="FirstName"
              value={formData.FirstName}
              onChange={handleChange}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="LastName"
              value={formData.LastName}
              onChange={handleChange}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile No</label>
            <input
              type="text"
              name="PhoneNumber"
              value={formData.PhoneNumber}
              onChange={handleChange}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              name="Age"
              value={formData.Age}
              onChange={handleChange}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="Gender"
              value={formData.Gender}
              onChange={handleChange}
              className="w-full p-1 border border-gray-300 rounded-md"
            >
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Referred By</label>
            <input
              type="text"
              name="RefferedBy"
              value={formData.RefferedBy}
              onChange={handleChange}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Doctor</label>
            <input
              type="text"
              name="Doctor"
              value={formData.Doctor}
              onChange={handleChange}
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <button type="submit" className="bg-blue-600 text-white p-2 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
};

export default QuickEntryForm;


