import React, { useState } from "react";
import axios from "axios";

export default function AddPatient() {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    Email: "",
    Age: "",
    Gender: "",
    City: "",
    Doctor: "",
    RefferedBy: "",
    Fee: "",
    FeeType: "",
  });

  console.log(formData);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit data to backend
  const handleSavePatient = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/Patient/patients/",
        formData
      );
      console.log("Response:", response.data);//
      alert("Patient Added Successfully");
    } catch (error) {
      console.error("Error Adding Patient:", error.response?.data || error.message);
      alert(`Error: ${JSON.stringify(error.response?.data || "Something went wrong")}`);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-700 mb-6">New Patient Info</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-bold text-gray-700">First Name</label>
          <input
            type="text"
            name="FirstName"
            value={formData.FirstName}
            onChange={handleInputChange}
            placeholder="First Name"
            required
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700">Last Name</label>
          <input
            type="text"
            name="LastName"
            value={formData.LastName}
            onChange={handleInputChange}
            placeholder="Last Name"
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700">Phone Number</label>
          <input
            type="text" // Changed to text input
            name="PhoneNumber"
            value={formData.PhoneNumber}
            onChange={handleInputChange}
            placeholder="Phone No."
            required
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-bold text-gray-700">Email</label>
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleInputChange}
            placeholder="Email"
            required
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700">Age</label>
          <input
            type="number"
            name="Age"
            value={formData.Age}
            onChange={handleInputChange}
            placeholder="Age"
            required
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700">Gender</label>
          <select
            name="Gender"
            value={formData.Gender}
            onChange={handleInputChange}
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
            required
          >
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-bold text-gray-700">City</label>
          <input
            type="text"
            name="City"
            value={formData.City}
            onChange={handleInputChange}
            placeholder="City"
            required
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700">Referred by</label>
          <input
            type="text"
            name="RefferedBy"
            value={formData.RefferedBy}
            onChange={handleInputChange}
            placeholder="Referred by"
            required
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700">Doctor</label>
          <input
            type="text"
            name="Doctor"
            value={formData.Doctor}
            onChange={handleInputChange}
            placeholder="Enter Doctor"
            required
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

      <div>
          <label className="block text-sm font-bold text-gray-700">Consultation Fee</label>
          <input
            type="number"
            name="Fee"
            value={formData.Fee}
            onChange={handleInputChange}
            placeholder="ConsultationFee"
            required
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700">Fee Type</label>
          <select
            name="FeeType"
            value={formData.FeeType}
            onChange={handleInputChange}
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
            required
          >
            <option value="" disabled>Select Fee Type</option>
            <option value="Cash">Cash</option>
            <option value="Insurance">Insurance</option>
            <option value="Card">Card</option>
            <option value="G-pay">G-pay</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end mb-6">
        <button
          onClick={handleSavePatient}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Save
        </button>
      </div>
    </div>
  );
}
