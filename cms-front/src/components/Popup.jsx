import React, { useState } from "react";
import { FaPhone } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { LuClock } from "react-icons/lu";
import { FaUserDoctor } from "react-icons/fa6";
import { CiHospital1 } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

const AppointmentView = ({ onClose }) => {
  const [formData, setFormData] = useState({
    doctor: "Dr Muhammed Iqbal VM",
    date: "2025-01-31T07:30",
    duration: "25",
    treatment: "consultation",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Appointment Data:", formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg transform transition-all scale-105">
        {/* Header */}
        <h2 className="text-xl font-bold text-center text-gray-700 border-b pb-3">View Appointment</h2>

        {/* Profile Section */}
        <div className="flex bg-blue-50 p-3 rounded-lg mt-4 items-center gap-3 shadow-sm">
          <CgProfile className="w-14 h-14 text-blue-500" />
          <div>
            <p className="font-semibold text-blue-600 text-lg">Mr Jithin M</p>
            <p className="text-sm text-gray-500">Registration Id:</p>
          </div>
        </div>

        {/* Contact Icons */}
        <div className="flex items-center justify-around mt-3 text-gray-600 text-lg">
          <FaPhone className="hover:text-blue-500 cursor-pointer" />
          <IoMail className="hover:text-blue-500 cursor-pointer" />
        </div>

        {/* Appointment Details */}
        <form onSubmit={handleSubmit} className="mt-5 text-gray-700 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Doctor</label>
            <select
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              className="w-full mt-1 p-2 border focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Dr Muhammed Iqbal VM">Dr Muhammed Iqbal VM</option>
              <option value="Dr Jane Doe">Dr Jane Doe</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full mt-1 p-2 border focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full mt-1 p-2 border focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="15">15</option>
              <option value="25">25</option>
              <option value="30">30</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Treatment</label>
            <input
              type="text"
              name="treatment"
              value={formData.treatment}
              onChange={handleChange}
              className="w-full mt-1 p-2 border focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 bg-gray-100 rounded-lg resize-none shadow-sm border border-gray-300 focus:outline-blue-400"
              placeholder="Additional notes..."
              rows="3"
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end gap-2">
            <button type="button" className="bg-yellow-500  text-white px-4 py-2 rounded-lg shadow">
              Cancel
            </button>
            <button type="submit" className="bg-green-500  text-white px-4 py-2 rounded-lg shadow">
              Update
            </button>
            <button type="button" onClick={onClose} className="bg-white-400  text-black px-4 py-2 rounded-lg border shadow">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentView;
