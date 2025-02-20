import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPassport } from "react-icons/fa";

const AddMobileAppointment = ({ closeMobileAppointment }) => {
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [errors, setErrors] = useState({}); // State to store validation errors

  const [formData, setFormData] = useState({
    patientName: "",
    mobile_number: "",
    date: "",
    duration: "10",
    email: "",
    doctor: "",
    treatment: "",
    notes: "",
  });

  console.log("formData:", formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear the error for the field being edited
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let newErrors = {};

    // Validate Patient Name
    if (!formData.patientName.trim()) {
      newErrors.patientName = "Patient name is required";
    }

    // Validate Mobile Number
    if (!formData.mobile_number.match(/^\d{10}$/)) {
      newErrors.mobile_number = "Mobile number must be 10 digits";
    }

    // Validate Email
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Invalid email address";
    }

    // Validate Doctor
    if (!formData.doctor) {
      newErrors.doctor = "Please select a doctor";
    }

    // Validate Date
    if (!formData.date) {
      newErrors.date = "Please select a date";
    }

    // Validate Duration
    if (!formData.duration) {
      newErrors.duration = "Please select a duration";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSave = async () => {
    if (!validateForm()) {
      alert("Please fix the errors before submitting.");
      return;
    }

    try {
      const nameParts = formData.patientName.trim().split(" ");
      const first_name = nameParts[0] || "";
      const last_name = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
      const payload = {
        first_name,
        last_name,
        mobile_number: formData.mobile_number,
        email: formData.email,
        doctor: formData.doctor,
        date: formData.date,
        duration: Number(formData.duration),
        treatment: formData.treatment,
        notes: formData.notes,
      };
      console.log("Sending Data:", payload);
      const response = await axios.post(
        "http://127.0.0.1:8000/appointment/mobileappointments",
        payload
      );
      console.log("Appointment saved:", response.data);
      alert("Appointment saved successfully!");
      closeMobileAppointment(); // Close the modal after saving
    } catch (error) {
      console.error("Error saving appointment:", error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.message || error.message}`);
      
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
    <div className="p-6 w-3/4 mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-bold mb-4">Add Mobile Appointment</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900">
            Patient Name
          </label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            placeholder="Ex : John Doe"
            className="mt-1 block w-full h-12 rounded-md border border-gray-300 shadow-sm focus:border-black focus:ring-0 sm:text-sm placeholder-gray-400"
          />
          {errors.patientName && <p className="text-red-500 text-sm">{errors.patientName}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900">E-mail</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-mail"
            className="mt-1 block w-full h-12 rounded-md border border-gray-300 shadow-sm focus:border-black focus:ring-0 sm:text-sm placeholder-gray-400"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900">Mobile No</label>
          <input
            type="text"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleChange}
            placeholder="Mobile No"
            className="mt-1 block w-full h-12 rounded-md border border-gray-300 shadow-sm focus:border-black focus:ring-0 sm:text-sm placeholder-gray-400"
          />
          {errors.mobile_number && <p className="text-red-500 text-sm">{errors.mobile_number}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900">Doctor</label>
          <select
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            className="mt-1 block w-full h-12 rounded-md border border-gray-300 shadow-sm focus:border-black focus:ring-0 sm:text-sm placeholder-gray-400"
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
          {errors.doctor && <p className="text-red-500 text-sm">{errors.doctor}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900">Date</label>
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full h-12 rounded-md border border-gray-300 shadow-sm focus:border-black focus:ring-0 sm:text-sm placeholder-gray-400"
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900">Duration</label>
          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="mt-1 block w-full h-12 rounded-md border border-gray-300 shadow-sm focus:border-black focus:ring-0 sm:text-sm placeholder-gray-400"
          >
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="30">30</option>
          </select>
          {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900">Treatment</label>
            <input
              type="text"
              name="treatment"
              value={formData.treatment}
              onChange={handleChange}
              placeholder="Treatment"
              className="mt-1 block w-full h-12 rounded-md border border-gray-300 shadow-sm focus:border-black focus:ring-0 sm:text-sm placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">Notes</label>
            <input
              type="text"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Notes"
              className="mt-1 block w-full h-12 rounded-md border border-gray-300 shadow-sm focus:border-black focus:ring-0 sm:text-sm placeholder-gray-400"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
        >
          Save
        </button>
        <button
          className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-md hover:bg-gray-400"
          onClick={closeMobileAppointment}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AddMobileAppointment;