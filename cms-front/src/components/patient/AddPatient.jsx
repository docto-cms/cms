import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AddPatient({ setDoctors, doctors, setisupdated, isupdated }) {
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [errors, setErrors] = useState({}); // State to store validation errors

  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    Email: "",
    Age: "",
    Gender: "",
    City: "",
    Doctor: "",
    ReferredBy: "",
    Fee: "",
    FeeType: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear the error for the field being edited
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate form fields
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

    // Validate Email
    if (!formData.Email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.Email = "Invalid email address";
    }

    // Validate Age
    if (!formData.Age || isNaN(formData.Age) || formData.Age <= 0) {
      newErrors.Age = "Please enter a valid age";
    }

    // Validate Gender
    if (!formData.Gender) {
      newErrors.Gender = "Please select a gender";
    }

    // Validate City
    if (!formData.City.trim()) {
      newErrors.City = "City is required";
    }

    // Validate Doctor
    if (!formData.Doctor) {
      newErrors.Doctor = "Please select a doctor";
    }

    // Validate ReferredBy
    if (!formData.ReferredBy.trim()) {
      newErrors.ReferredBy = "Referred by is required";
    }

    // Validate Fee
    if (!formData.Fee || isNaN(formData.Fee) || formData.Fee <= 0) {
      newErrors.Fee = "Please enter a valid fee";
    }

    // Validate FeeType
    if (!formData.FeeType) {
      newErrors.FeeType = "Please select a fee type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Submit data to backend
  const handleSavePatient = async () => {
    if (!validateForm()) {
      alert("Please fix the errors before submitting.");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/Patient/patients/",
        formData
      );
      setisupdated(!isupdated);

      console.log("Response:", response.data);
      alert("Patient Added Successfully");
    } catch (error) {
      console.error("Error Adding Patient:", error.response?.data || error.message);
      alert(`Error: ${JSON.stringify(error.response?.data || "Something went wrong")}`);
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
          {errors.FirstName && <p className="text-red-500 text-sm">{errors.FirstName}</p>}
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
          {errors.LastName && <p className="text-red-500 text-sm">{errors.LastName}</p>}
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700">Phone Number</label>
          <input
            type="text"
            name="PhoneNumber"
            value={formData.PhoneNumber}
            onChange={handleInputChange}
            placeholder="Phone No."
            required
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          />
          {errors.PhoneNumber && <p className="text-red-500 text-sm">{errors.PhoneNumber}</p>}
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
          {errors.Email && <p className="text-red-500 text-sm">{errors.Email}</p>}
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
          {errors.Age && <p className="text-red-500 text-sm">{errors.Age}</p>}
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
          {errors.Gender && <p className="text-red-500 text-sm">{errors.Gender}</p>}
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
          {errors.City && <p className="text-red-500 text-sm">{errors.City}</p>}
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700">Referred by</label>
          <input
            type="text"
            name="ReferredBy"
            value={formData.ReferredBy}
            onChange={handleInputChange}
            placeholder="Referred by"
            required
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          />
          {errors.ReferredBy && <p className="text-red-500 text-sm">{errors.ReferredBy}</p>}
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700">Doctor</label>
          <select
            name="Doctor"
            value={formData.Doctor}
            onChange={handleInputChange}
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
            required
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
          {errors.Fee && <p className="text-red-500 text-sm">{errors.Fee}</p>}
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
          {errors.FeeType && <p className="text-red-500 text-sm">{errors.FeeType}</p>}
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