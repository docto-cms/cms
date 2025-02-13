import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    first_name: '',
    second_name: '',
    clinic_id: '',
    phone_number: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  console.log('Submitting Data:', JSON.stringify(formData, null, 2));

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name) newErrors.first_name = 'First name is required';
    if (!formData.clinic_id) newErrors.clinic_id = 'Clinic ID is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirm_password)
      newErrors.confirm_password = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(
          'http://127.0.0.1:8000/regester/',
          formData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        setMessage('Registration successful!');
        console.log('Response from backend:', response.data);

        // Reset form on successful submission
        setFormData({
          first_name: '',
          second_name: '',
          clinic_id: '',
          phone_number: '',
          email: '',
          password: '',
          confirm_password: '',
        });

        setTimeout(() => {
          navigate("/login");
        },2000);
      
        setErrors({});
      } catch (error) {
        console.error('Error submitting form:', error);
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  

  return (
    <div className="flex justify-center items-center h-screen my-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg w-[500px] p-8"
      >
        <h1 className="text-2xl text-center font-bold mb-4">Registration</h1>
        {message && (
          <p className="text-center text-green-500 mb-4">{message}</p>
        )}
        <div className="grid gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm">{errors.first_name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Second Name
            </label>
            <input
              type="text"
              name="second_name"
              value={formData.second_name}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
        </div>

        <div className="grid gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Clinic ID
            </label>
            <input
              type="text"
              name="clinic_id"
              value={formData.clinic_id}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {errors.clinic_id && (
              <p className="text-red-500 text-sm">{errors.clinic_id}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
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
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {errors.confirm_password && (
              <p className="text-red-500 text-sm">{errors.confirm_password}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded mt-4"
        >
          Register
        </button>
      </form>
    </div>
  );
}
