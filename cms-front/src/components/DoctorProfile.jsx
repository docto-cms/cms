import React from 'react'

export default function DoctorProfile() {
  return (
    <div className="flex justify-center   bg-gray-100">
    <div className="bg-white shadow-lg rounded-lg p-8  w-full">
      <h2 className="text-xl font-bold mb-4">Basic Information</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            placeholder="First Name"
            className="w-full py-3 px-2 border border-gray rounded-md focus:ring focus:ring-blue-200"
            defaultValue="ABCD"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Last Name"
            className="w-full py-3 px-2 border border-gray rounded-md focus:ring focus:ring-blue-200"
            defaultValue="VM"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            className="w-full py-3 px-2 border border-gray rounded-md focus:ring focus:ring-blue-200"
            defaultValue="abcd123@gmail.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            className="w-full py-3 px-2 border border-gray rounded-md focus:ring focus:ring-blue-200"
            defaultValue="DOB"
          />
        </div>
        <div className="flex gap-6">
<div className="w-1/2">
  <label className="block text-sm font-medium text-gray-700">
    Gender
  </label>
  <select className="w-full py-3 px-2 border border-gray rounded-md focus:ring focus:ring-blue-200">
    <option>Male</option>
    <option>Female</option>
    <option>Other</option>
  </select>
</div>
<div className="w-1/2">
  <label className="block text-sm font-medium text-gray-700">
    Marital Status
  </label>
  <select className="w-full py-3 px-2 border border-gray rounded-md focus:ring focus:ring-blue-200">
    <option>Single</option>
    <option>Married</option>
  </select>
</div>
</div>
      {/* Save button aligned to the right */}
      <div className="flex justify-end mt-6">
        <button className="px-6 py-2 text-base bg-blue-500 text-white font-medium rounded shadow hover:bg-blue-600">
          Save
        </button>
      </div>
    </div>
  </div>
  </div>
  )
}
