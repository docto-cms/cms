import React, { useState } from "react";
import axios from "axios";


const Addappointment = () => {
  const [formData,setFormData]=useState({
    Patient:"",
    Doctor:"",
    Date:"",
    Duration:"",
    Repeat:"",
    Treatment:"",
    AppointmentType:"",
    Notes:"",
    GoogleMeetLink:""
  });
  
  console.log(formData);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleSaveAppointment = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/appointment/appointments/",
        
        formData
      );
      console.log("Response:", response.data);//
      alert("Appointment Added Successfully");
    } catch (error) {
      console.error("Error Adding Appointment:", error.response?.data || error.message);
      alert(`Error: ${JSON.stringify(error.response?.data || "Something went wrong")}`);
    }
  };
  return (
    <div className="max-w-full  bg-white shadow-md rounded-lg p-6  m-6">
      <div className=" w-full max-w-3xl border-b pb-4 mb-4 ">
        <h2 className="text-xl font-semibold text-gray-700">New Appointments</h2>
        <div className="flex gap-4 mt-2">
          <button className="text-gray-500 font-medium hover:text-blue-500">
            With Patient
          </button>
          <button className="text-blue-500 font-medium border-b-2 border-blue-500">
            New Patient
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {/* Patient Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            PATIENT
          </label>
          <input
            type="text"
            name="Patient"
            value={formData.Patient}
            placeholder="Search Patient Name"
            onChange={handleInputChange}
            className="mt-1 w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* Doctor Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Doctor
          </label>
          <select
            className="mt-1 w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
            onChange={handleInputChange}
            name="Doctor"
            value={formData.Doctor}
          >
            <option value="" disabled>Select Doctor</option>
            <option value="">Shazna</option>
          </select>
        </div>
        {/* Date, Duration, Repeat */}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Date of Appointment
            </label>
            <input
              type="datetime-local"
              name="Date"
             value={formData.Date}
             onChange={handleInputChange}
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"

            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Duration
            </label>
            <select
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
              name="Duration"
              onChange={handleInputChange}
              value={formData.Duration}
            >
              <option>5</option>
              <option>10</option>
              <option>15</option>
            </select>
          </div>
          <div className="flex items-center gap-2 mt-5">
            <input
              type="checkbox"
              onChange={handleInputChange}
              value="repeat"
              name="Repeat"
              className="h-4 w-4 text-blue-500 border-gray-300 rounded"
            />
             <label className="text-sm text-gray-700">Repeat
           </label>
          </div>
        </div>
        {/* Treatment */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Treatment
          </label>
          <input
            type="text"
            name="Treatment"
            placeholder="Treatment"
            value={formData.Treatment}
            onChange={handleInputChange}
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
                name="AppointmentType"
                value="scheduled"
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-500 border-gray-300"
              />
              <span className="text-sm text-gray-700">Scheduled</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="AppointmentType"
                value="walkin"
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-500 border-gray-300"
              />
              <span className="text-sm text-gray-700">Walkin</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="AppointmentType"
                value="phone_online"
                onChange={handleInputChange}
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
            name="Notes"
            value={formData.Notes}
            onChange={handleInputChange}
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
            name="GoogleMeetLink"
            placeholder="Google meet url"
            value={formData.GoogleMeetLink}
            onChange={handleInputChange}
            className="mt-1 w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="pt-4">
  
</div>
{/* Action Buttons */}
<div className=" flex justify-end space-x-4 mt-6">
  <button
    type="button"
    className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
  >
    Close
  </button>
  <button
    type="submit"
    onClick={handleSaveAppointment}
    className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-sm hover:bg-blue-600"
  >
    Save
  </button>
</div>
        </div>
      </div>
    </div>
  );
};
export default Addappointment