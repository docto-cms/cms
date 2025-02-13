import React from "react";
const AppointmentForm = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 w-[500px]">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">New Appointments</h2>
        {/* Tabs */}
        <div className="flex border-b gap-4 mb-4">
        <button className="text-blue-500 font-medium border-b-2 border-blue-500">
            With Patient
          </button>
          <button className="text-gray-500 font-medium hover:text-blue-500">
            New Patient
          </button>
        </div>
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
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
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
          </div>
          {/* Doctor */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Doctor</label>
            <select
              className="mt-1 w-full border rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Dr. Muhammed Iqbal VM</option>
            </select>
          </div>
          {/* Date, Duration, Repeat */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
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
<div className="pt-4">
  <div className="grid grid-cols-1 gap-4 items-center">
    {/* Doctor Notifications */}
    <div>
      <label className="block font-medium text-gray-700">Doctor:</label>
      <div className="flex items-center space-x-4 mt-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            defaultChecked
            className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">SMS</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            defaultChecked
            className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">Email</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            defaultChecked
            className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">WhatsApp</span>
        </label>
      </div>
    </div>
    {/* Patient Notifications */}
    <div>
      <label className="block font-medium text-gray-700">Patient:</label>
      <div className="flex items-center space-x-4 mt-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            defaultChecked
            className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">SMS</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            defaultChecked
            className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">Email</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            defaultChecked
            className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">WhatsApp</span>
        </label>
      </div>
    </div>
  </div>
</div>
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
  );
};
export default AppointmentForm;