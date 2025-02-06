import { useState } from "react";
import React from "react";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    clinicId: "",
  });

  const [errors, setErrors] = useState({});

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
    if (!formData.clinicId) {
      newErrors.clinicId = "Clinic ID is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form Submitted Successfully:", formData);
      alert("Login successful!");

      // Reset form
      setFormData({
        email: "",
        password: "",
        clinicId: "",
      });
      setErrors({});
    }
  };

  return (
    <div className="flex justify-center items-center h-screen my-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96 space-y-4"
      >
        <label
          htmlFor=""
          className="text-2xl text-center font-bold mb-4 block"
        >
          Let’s get started
        </label>

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
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
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
            name="clinicId"
            value={formData.clinicId}
            onChange={handleChange}
            placeholder="clinic ID"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
          {errors.clinicId && (
            <p className="text-red-500 text-sm mt-1">{errors.clinicId}</p>
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
