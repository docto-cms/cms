import React, { useState } from "react";
import { postData } from "@/API/Axios";


const QuickentryForm = () => {
  const [formData,setFormData] = useState({
    RegistrationId : "",
    FirstName : "",
    LastName : "",
    PhoneNumber : "",
    Age : "",
    Gender : "",
    Doctor : "" ,
  })

  console.log("formData:",formData);

  const handleInputChange = (e) => {
    setFormData({ ...formData , [e.target.name] : e.target.value})
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postData("Patient/basicinfo/",formData);
      console.log("response:" ,response.data);
      alert("Patient Added Successfully");
    }catch (error) {
      console.error("Error Adding Patient:" ,error);
      alert("Error Adding Patient");
    }
  }
  return (
    <div className="bg-gray-50 min-h-screen w-full p-6">
      <form onSubmit={handlesubmit} className="bg-white shadow-md rounded-lg p-8 w-full mx-auto">
        <h2 className="text-xl font-bold mb-4">Quick Entry</h2>
        <p className="text-sm text-gray-500 mb-6">
          <span className="text-blue-600">Home</span> / Quick Entry
        </p>
        <div className="border-t border-gray-300 mb-6"></div>
        <h3 className="text-lg font-semibold mb-4">Basic Info</h3>
        {/* Row for Registration ID, First Name, Last Name, Mobile, Email */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Registration ID
            </label>
            <input
              type="text"
              defaultValue="PAT137"
              name="RegistrationId"
              value={formData.RegistrationId}
              onChange={handleInputChange}
              placeholder="Registration ID"
              className="w-full p-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 placeholder-gray-400"
            />
          </div>
          <div className="gap-1">
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="FirstName"
              value={formData.FirstName}
              onChange={handleInputChange}
              placeholder="First Name"
              className="w-full p-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              name="LastName"
              value={formData.LastName}
              onChange={handleInputChange}
              className="w-full p-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="number"
              placeholder="Phone Number"
              name="PhoneNumber"
              value={formData.PhoneNumber}
              onChange={handleInputChange}
              className="w-full p-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 placeholder-gray-400"
            />
          </div>
          
        </div>
        {/* Second Row Inputs */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              placeholder="Age"
              name="Age"
              value={formData.Age}
              onChange={handleInputChange}
              className="w-full p-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select className="w-full p-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 placeholder-gray-400"
             name="Gender"
             value={formData.Gender}
             onChange={handleInputChange}>
              <option>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>
         
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Doctor
            </label>
           <input type="text" 
           name="Doctor"
           value={formData.Doctor}
           onChange={handleInputChange}
           placeholder="doctor"/>
          </div>
         
        </div>
         <div className="flex justify-end">
            <button  className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-sm hover:bg-blue-600 "
          type="submit"
          >save</button>
          </div>
      </form>
    </div>
  );
};
export default QuickentryForm;






