import React from 'react';
import { FaArrowDownShortWide } from "react-icons/fa6";
import { TbArrowsDownUp } from "react-icons/tb";

export default function TotalAppointment() {
  return (
    <div className=" p-6">
    
    <nav className="flex mb-4 text-gray-600">
      <a className="text-blue-600">Home</a> /{" "}
      <span className="text-gray-800">Appointments</span>
    </nav>
    <div className="container mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Total Appointment List
      </h2>

      <div className="flex justify-between items-center mb-4">
        <div>
          <label htmlFor="showEntries" className="text-gray-600">
            Show{" "}
          </label>
          <select
            id="showEntries"
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span className="text-gray-600"> entries</span>
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="search" className="text-gray-600">
            Search:
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search"
            className="border border-gray-300 rounded px-4 py-2 w-64"
          />
        </div>
      </div>

      <div className="overflow-x-auto ">
        <table className="min-w-full bg-white border-2 border-gray-200 rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border text-left flex items-center ">
                Doctor
                <div className="ml-auto ">
                  <FaArrowDownShortWide />
                </div>
              </th>

              <th className="py-2 px-4 border border-gray-300 text-left   ">
                <div className="   flex justify-between">
                  Patient Name
                  <span className="text-gray-500  ">
                    <TbArrowsDownUp />
                  </span>
                </div>
              </th>

              <th className="py-2 px-4 border border-gray-300 text-left">
              <div className="   flex justify-between">
                  Duration
                  <span className="text-gray-500  ">
                    <TbArrowsDownUp />
                  </span>
                </div>
              </th>
              <th className="py-2 px-4 border border-gray-300 text-left">
              <div className="flex justify-between">
                Date
                <span className="text-gray-500">
                  <TbArrowsDownUp />
                </span>
                </div>
              </th>
              <th className="py-2 px-4 border border-gray-300 text-left">
              <div className="flex justify-between">
                Treatment
                <span className="text-gray-500">
                  <TbArrowsDownUp />
                </span>
                </div>
              </th>
              <th className="py-2 px-4 border border-gray-300 text-left">
              <div className="flex justify-between"> 
                Status
                <span className="text-gray-500">
                  <TbArrowsDownUp />
                </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                className="py-2 px-4 border border-gray-300 text-center"
                colSpan="6"
              >
                No data available in table
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-gray-600">Showing 0 to 0 of 0 entries</div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-gray-300 text-gray-700  border-t border-l border-gray-400 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Previous
          </button>
          <button className="px-3 py-1 bg-gray-300 text-gray-700  border-t border-r border-gray-400 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}
