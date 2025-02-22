import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import React Icons
import axios from "axios";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    clinic_id: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setMessage(""); // Clear messages when user types
    setIsError(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.clinic_id) {
      newErrors.clinic_id = "Clinic ID is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
        return; // Stop if the form is invalid
    }

    try {
        // Send login request to the backend
        const response = await axios.post("http://127.0.0.1:8000/login/", formData);

        // Handle successful login
        setMessage("Login successful! Redirecting...");
        setIsError(false);
        console.log("Response from backend:", response);

        // Store tokens in localStorage (or secure storage)
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);

        // Optionally, store tokens in memory (if using state)
      

        // Redirect to the dashboard after a short delay
          setTimeout(() => {
              navigate("/"); // Redirect to the dashboard
              setFormData({ email: "", password: "", clinic_id: "" }); // Reset form fields
          }, 1000);

        // Clear any previous errors
        setErrors({});
    } catch (error) {
        console.error("Error submitting form:", error);

        // Handle error messages from the backend
        const errorMsg =
            error.response?.data?.detail ||
            error.response?.data?.message ||
            "Login failed. Please check your credentials.";
        setMessage(errorMsg);
        setIsError(true);

        // Optionally, handle specific error cases (e.g., invalid credentials, network errors)
        if (error.response?.status === 401) {
            setErrors({ password: "Invalid email or password." });
        } else if (error.response?.status === 400) {
            setErrors({ clinic_id: "Invalid Clinic ID." });
        } else {
            setErrors({ general: "An unexpected error occurred. Please try again." });
        }
    }
};
  return (
    <div className="flex ml-36 items-center h-screen ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-96 space-y-4"
      >
        <label className="text-bold text-center font-bold mb-4 block font-poppins">
          Let’s get started
        </label>

        {message && (
          <p className={`text-center ${isError ? "text-red-500" : "text-green-500"}`}>
            {message}
          </p>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="password"
              className="mt-1 p-2 border border-gray-300 rounded w-full pr-12"
              required
            />
            {/* React Icons Toggle Button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 px-2 py-1 mt-1 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Clinic ID</label>
          <input
            type="text"
            name="clinic_id"
            value={formData.clinic_id}
            onChange={handleChange}
            placeholder="clinic ID"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
          {errors.clinic_id && <p className="text-red-500 text-sm mt-1">{errors.clinic_id}</p>}
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
