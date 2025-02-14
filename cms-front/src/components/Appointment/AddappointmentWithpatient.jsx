import React from 'react'

export default function AddappointmentWithpatient() {
  return (
    <div>
       <div className="flex ">
      <div className="w-full  bg-white  p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">New Appointments</h2>
        {/* Tabs */}
       
        {/* Form */}
        <form className="space-y-4">
          {/* Patient Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Patient Name</label>
              <input
                type="text"
                placeholder="Patient name"
                className="mt-1 w-full border rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Registration ID</label>
              <input
                type="text"
                value="PAT139"
                readOnly
                className="mt-1 w-full border rounded-md px-3 py-2 shadow-sm  focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="mt-1 w-full border rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile No</label>
              <input
                type="tel"
                placeholder="Mobile No"
                className="mt-1 w-full border rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
           
            <div>
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                placeholder="Age"
                className="mt-1 w-full border rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                className="mt-1 w-full border rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                placeholder="City"
                className="mt-1 w-full border rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">Doctor</label>
            <select
              className="mt-1 w-full border rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Dr. Muhammed Iqbal VM</option>
            </select>
          </div>
          </div>
          {/* Doctor */}
         
          {/* Date, Duration, Repeat */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Appointment</label>
              <input
                type="datetime-local"
                className="mt-1 w-full border rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Duration</label>
              <select
                className="mt-1 w-full border rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option>5</option>
                <option>10</option>
                <option>15</option>
              </select>
            </div>
            <div className="flex items-center gap-2 mt-7">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="text-sm text-gray-700">Repeat</label>
            </div>
          </div>
          {/* Treatment */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Treatment</label>
            <input
              type="text"
              placeholder="Treatment"
              className="mt-1 w-full border rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Submit */}
          {/* Notification Preferences */}

{/* Action Buttons */}
<div className="flex justify-end space-x-4 mt-6">
  <button
    type="button"
    className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
  >
    Close
  </button>
  <button
    type="submit"
    className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-sm hover:bg-blue-600"
  >
    Save
  </button>
</div>
        </form>
      </div>
    </div>
    </div>
  )
}
