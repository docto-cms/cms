import React, { useState, useEffect } from "react";
import { postData } from "@/API/Axios";
import axios from "axios";

const QuickentryForm = () => {
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [errors, setErrors] = useState({}); // State to store validation errors

  const [formData, setFormData] = useState({
    RegistrationId: "",
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    Age: "",
    Gender: "",
    Doctor: "",
  });

  console.log("formData:", formData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear the error for the field being edited
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};

    // Validate FirstName
    if (!formData.FirstName.match(/^[A-Za-z]+$/)) {
      newErrors.FirstName = "Please enter a valid first name";
    }

    // Validate LastName
    if (!formData.LastName.match(/^[A-Za-z]+$/)) {
      newErrors.LastName = "Please enter a valid last name";
    }

    // Validate PhoneNumber
    if (!formData.PhoneNumber.match(/^\d{10}$/)) {
      newErrors.PhoneNumber = "Phone number must be 10 digits";
    }

    // Validate Age
    if (!formData.Age || isNaN(formData.Age) || formData.Age <= 0) {
      newErrors.Age = "Please enter a valid age";
    }

    // Validate Gender
    if (!formData.Gender) {
      newErrors.Gender = "Please select a gender";
    }

    // Validate Doctor
    if (!formData.Doctor) {
      newErrors.Doctor = "Please select a doctor";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Please fix the errors before submitting.");
      return;
    }

    try {
      const response = await postData("Patient/basicinfo/", formData);
      console.log("response:", response.data);
      alert("Patient Added Successfully");
    } catch (error) {
      console.error("Error Adding Patient:", error);
      alert("Error Adding Patient");
    }
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/Patient/doctor/");
        setDoctors(res.data);
        setLoadingDoctors(false);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setFetchError("Failed to fetch doctors");
        setLoadingDoctors(false);
      }
    };
    fetchDoctors();
  }, []);

  console.log(doctors);

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
        <div className="grid grid-cols-3 gap-4 mb-6">
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
            {errors.FirstName && <p className="text-red-500 text-sm">{errors.FirstName}</p>}
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
            {errors.LastName && <p className="text-red-500 text-sm">{errors.LastName}</p>}
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
            {errors.PhoneNumber && <p className="text-red-500 text-sm">{errors.PhoneNumber}</p>}
          </div>
        </div>
        {/* Second Row Inputs */}
        <div className="grid grid-cols-3 gap-4 mb-6">
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
            {errors.Age && <p className="text-red-500 text-sm">{errors.Age}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              className="w-full p-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 placeholder-gray-400"
              name="Gender"
              value={formData.Gender}
              onChange={handleInputChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
            {errors.Gender && <p className="text-red-500 text-sm">{errors.Gender}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Doctor
            </label>
            <select
              className="w-full p-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 placeholder-gray-400"
              onChange={handleInputChange}
              name="Doctor"
              value={formData.Doctor}
            >
              <option value="">Select Doctor</option>
              {loadingDoctors && <option>Loading doctors...</option>}
              {fetchError && <option>{fetchError}</option>}
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.firstname} {doctor.lastname}
                </option>
              ))}
            </select>
            {errors.Doctor && <p className="text-red-500 text-sm">{errors.Doctor}</p>}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-sm hover:bg-blue-600"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuickentryForm;