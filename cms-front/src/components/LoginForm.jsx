import { useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { postData } from "../API/Axios"; // Adjust the import path accordingly

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    clinic_id: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(""); // Define message state
  const navigate = useNavigate(); // Initialize navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Clinic ID validation
    if (!formData.clinic_id) {
      newErrors.clinic_id = "Clinic ID is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await postData("login", formData);
        setMessage("Login successful!"); // Update message to "Login"
        console.log("Response from backend:", response); // Removed .data
  
        // Redirect user or store tokens (example using navigation)
        // navigate("/dashboard"); 
  
        setFormData({ email: "", password: "", clinic_id: "" });
        setErrors({});
      } catch (error) {
        console.error("Error submitting form:", error);
        setMessage("Login failed. Please check your credentials.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen my-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96 space-y-4"
      >
        <label className="text-2xl text-center font-bold mb-4 block">
          Let’s get started
        </label>

        {message && <p className="text-green-500 text-center">{message}</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="password"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Clinic ID
          </label>
          <input
            type="text"
            name="clinic_id"
            value={formData.clinic_id}
            onChange={handleChange}
            placeholder="clinic ID"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
          {errors.clinic_id && (
            <p className="text-red-500 text-sm mt-1">{errors.clinic_id}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
