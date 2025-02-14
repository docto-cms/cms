import { useState } from "react";
import { FaArrowDownShortWide } from "react-icons/fa6";
import { TbArrowsDownUp } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import React from "react";


const UpcomingAppointments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const appointments = []; // No data available as per the image

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Upcoming Appointment</h1>
      <nav className="flex mb-4 text-gray-600 gap-1">
      <div className="text-blue-600 p-1"><FaHome/></div>
        <a className="flex text-blue-600">Home</a>/{" "}
        <span className="text-gray-800">Missed Appointment</span>
      </nav>
      

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Upcoming Appointment List</h3>
        <div className="flex justify-between mb-4">
          <div>
            <label className="text-sm text-gray-600">Show</label>
            <select className="border border-gray-300 rounded px-2 py-1 ml-2">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span className="text-sm text-gray-600 ml-2">entries</span>
          </div>
          <div>
            <label className="text-sm text-gray-600 mr-2">Search:</label>
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded px-4 py-2 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto ">
          <table className="min-w-full bg-white border-2 border-gray-200 rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border border-gray-300 text-left flex items-center ">
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
  );
}
export default UpcomingAppointments;