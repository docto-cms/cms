import React, { useState } from "react";
import AddappointmentWithpatient from "./AddappointmentWithpatient";

const AddappointmentNewpatients = () => {
  const [switchAppointment, setSwitchAppointment] = useState(true);

  return (
    <div className="max-w-full bg-white shadow-md rounded-lg p-6 m-6">
      <div className="w-full max-w-3xl border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-700">New Appointments</h2>
        <div className="flex gap-4 mt-2">
          <button
             className={`text-blue-500 font-medium ${switchAppointment
              ? ""
              :"border-b-2 border-blue-500"
            }`}
            onClick={() => setSwitchAppointment(false)}
          >
            New Patient
          </button>
          <button
            className={`text-blue-500 font-medium ${switchAppointment
              ? "border-b-2 border-blue-500"
              :""
            }`}
            onClick={() => setSwitchAppointment(true)}
          >
            With Patient
          </button>
        </div>
      </div>
      {switchAppointment ? (
        <div className="space-y-4">
          {/* Patient Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              PATIENT
            </label>
            <input
              type="text"
              placeholder="Search Patient Name"
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Doctor Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Doctor
            </label>
            <select className="mt-1 w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500">
              <option>Dr Muhammed Iqbal VM</option>
            </select>
          </div>
          {/* Date, Duration, Repeat */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label
                className="block text-sm font-medium text-gray-700"
                name="date of appointment"
              >
                Date of Appointment
              </label>
              <input
                type="datetime-local"
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Duration
              </label>
              <select className="mt-1 w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500">
                <option>5</option>
                <option>10</option>
                <option>15</option>
              </select>
            </div>
            <div className="flex items-center gap-2 mt-5">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-500 border-gray-300 rounded"
              />
              <label className="text-sm text-gray-700">Repeat</label>
            </div>
          </div>
          {/* Treatment */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Treatment
            </label>
            <input
              type="text"
              placeholder="Treatment"
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Appointment Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Appointment Type
            </label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="appointmentType"
                  className="h-4 w-4 text-blue-500 border-gray-300"
                />
                <span className="text-sm text-gray-700">Scheduled</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="appointmentType"
                  className="h-4 w-4 text-blue-500 border-gray-300"
                />
                <span className="text-sm text-gray-700">Walkin</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="appointmentType"
                  className="h-4 w-4 text-blue-500 border-gray-300"
                />
                <span className="text-sm text-gray-700">Phone/Online</span>
              </label>
            </div>
          </div>
          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              placeholder="Notes"
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Google Meet URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Google meet url <span className="text-blue-500">Google meet</span>
            </label>
            <input
              type="text"
              placeholder="Google meet url"
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="pt-4"></div>
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
          </div>
        </div>
      ) : (
        <AddappointmentWithpatient />
      )}
    </div>
  );
};

export default AddappointmentNewpatients;
