import React from 'react'

export default function TodayPatient() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
    {/* Header */}
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-700">Patients</h1>
      <div className="text-sm text-gray-500 mt-1">
        <a href="#" className="text-blue-500">
          Home
        </a>{" "}
        / Patients
      </div>
    </div>
    {/* Filters Section */}
    <div className="bg-white mt-6 p-6 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row gap-4">
        <select className="w-full md:w-1/6 p-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200">
          <option>Status</option>
        </select>
        <select className="w-full md:w-1/6 p-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200">
          <option>Doctor</option>
        </select>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-md flex items-center justify-center">
          <span className="mr-2"> Get</span>
        </button>
      </div>
    </div>
    {/* Table Section */}
    <div className="bg-white mt-6 p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <label className="text-gray-700 text-sm">Show</label>
          <select className="border border-gray-300 rounded-md p-2">
            <option>10</option>
          </select>
          <span className="text-gray-700 text-sm">entries</span>
        </div>
        <div>
          <label className="text-gray-700 text-sm mr-2">Search:</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2"
            placeholder=""
          />
        </div>
      </div>
      {/* Scrollable Table and Pagination */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border border-gray-300 min-w-full outline 2">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="border p-2">Registration Id</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Doctor Name</th>
              <th className="border p-2">Referral</th>
              <th className="border p-2">Start Date</th>
              <th className="border p-2">Duration</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll">
            <tr>
              <td className="border p-2 text-center" colSpan="7" >
                No data available in table
              </td>
            </tr>
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-gray-700 text-sm">
          <span>Showing 0 to 0 of 0 entries</span>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-md bg-gray-200">
              Previous
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md bg-gray-200">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
