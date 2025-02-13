import React from "react";
import { FaUserMd } from "react-icons/fa";
import AddMobileAppointment from "./AddMobileAppointment";
import { useState } from "react";
const WebsiteAppointment = () => {

  const[mobileAppointment, setMobileAppointment] = useState(false);
  return (
    <div className="p-4">
      <div className="text-sm text-gray-600 mb-4">
        Home / <span className="font-medium">Website Appointment</span>
      </div>
      <div className="bg-white shadow rounded p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Website Appointment List</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" 
          onClick={() => setMobileAppointment(true)}>Add Mobile Appointment</button>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <label htmlFor="entries" className="text-sm font-medium">Show</label>
            <select id="entries" className="border rounded p-1 text-sm">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span className="text-sm font-medium">entries</span>
          </div>
          <input
            type="text"
            placeholder="Search"
            className="border rounded p-1 text-sm w-40"
          />
        </div>
        <table className="w-full border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 p-2 flex items-center justify-center">
                <FaUserMd className="mr-1" /> Doctor
              </th>
              <th className="border border-gray-200 p-2">Patient Name</th>
              <th className="border border-gray-200 p-2">Duration</th>
              <th className="border border-gray-200 p-2">Date</th>
              <th className="border border-gray-200 p-2">Treatment</th>
              <th className="border border-gray-200 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="6" className="border border-gray-200 p-4 text-center text-gray-500">
                No data available in table
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <span>Showing 0 to 0 of 0 entries</span>
          <div className="flex space-x-2">
            <button className="border px-3 py-1 rounded">Previous</button>
            <button className="border px-3 py-1 rounded">Next</button>
          </div>
        </div>
      </div>
      {mobileAppointment && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center ">
            <AddMobileAppointment closeMobileAppointment={() => setMobileAppointment(false)} /> 
        </div>
      ) }
    </div>
  );
};
export default WebsiteAppointment;