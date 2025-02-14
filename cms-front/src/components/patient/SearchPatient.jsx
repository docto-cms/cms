import React, { useState } from "react";
import { FcViewDetails } from "react-icons/fc";
import { MdOutlineDelete } from "react-icons/md";

export default function SearchPatient() {
  const [showFilter, setShowFilter] = useState(false);

  const handleRefresh = () => {
    window.location.reload(); // Refreshes the entire page
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Patients</h1>
        <nav className="text-sm text-gray-600">
          <span className="hover:underline cursor-pointer">Home</span> / <span>Patients</span>
        </nav>
      </div>

      {/* Appointments Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[1, 0].map((count, index) => (
          <div key={index} className="bg-white p-4 shadow rounded flex items-center">
            <div className="bg-green-500 text-white p-3 rounded-full">
              <FcViewDetails className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-lg font-medium">{count}</p>
              <p className="text-sm text-gray-500">Today Appointments</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Section */}
      {showFilter && (
        <div className="bg-white p-4 shadow rounded mb-6 relative">
          <button
            onClick={() => setShowFilter(false)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 absolute top-2 right-2"
          >
            Hide
          </button>
          <h2 className="text-lg font-medium mb-4">Filter Patients</h2>
          <div className="grid grid-cols-7 gap-4">
            <input type="date" className="border p-2 rounded focus:ring-2 focus:ring-green-500 focus:outline-none" />
            <input type="date" className="border p-2 rounded focus:ring-2 focus:ring-green-500 focus:outline-none" />
            <input type="text" className="border p-2 rounded focus:ring-2 focus:ring-green-500 focus:outline-none" placeholder="Group" />
            <select className="border p-2 rounded focus:ring-2 focus:ring-green-500 focus:outline-none">
              <option>All Doctors</option>
            </select>
            <select className="border p-2 rounded focus:ring-2 focus:ring-green-500 focus:outline-none">
              <option>Limit</option>
            </select>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Get</button>
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="bg-white p-4 shadow rounded mb-6">
        <h3 className="text-lg font-medium mb-4">List of Patients</h3>
        <div className="overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <label className="mr-2 text-gray-600">Show</label>
              <select className="border p-2 rounded focus:ring-2 focus:ring-green-500 focus:outline-none" defaultValue="">
                <option value="" disabled>Select entries</option>
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
              <span className="ml-2 text-gray-600">entries</span>
            </div>

            {/* Filter & Refresh Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={() => setShowFilter(true)}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              >
                Filter
              </button>
              <button
                onClick={handleRefresh}
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
              >
                Refresh
              </button>
            </div>
          </div>

          {/* Patient Table */}
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Basic Info</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Contact</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                      <FcViewDetails />
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2">
                      <MdOutlineDelete />
                    </button>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Patient {index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <p>Registration ID: PA1{index + 1}38</p>
                    <p>Gender: --</p>
                    <p>Age: --</p>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <p>Email: --</p>
                    <p>Phone: --</p>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">--</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
