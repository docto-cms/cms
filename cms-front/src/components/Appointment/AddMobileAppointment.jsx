import React, { useState } from "react";
const AddMobileAppointment = ({closeMobileAppointment}) => {
  const [formData, setFormData] = useState({
    patientName: "",
    mobileNo: "",
    date: "",
    duration: "10",
    email: "",
    doctor: "Dr Muhammed Iqbal",
    treatment: "",
    notes: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSave = () => {
    console.log("Appointment saved:", formData);
  };
  return (
    <div className="p-6 w-3/4 mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-bold mb-4">Add Mobile Appointment</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900">
            Patient Name
          </label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            placeholder="  Patient Name"
            className="mt-1 block w-full h-12 rounded-md border  border-black-300 shadow-sm focus:border-black focus:ring- sm:text-sm placeholder-gray-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900">E-mail</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="  E-mail"
            className="mt-1 block w-full h-12 rounded-md border border-black-200 shadow-sm focus:border-black focus:ring-0 sm:text-sm placeholder-gray-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900">Mobile No</label>
          <input
            type="text"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            placeholder="  Mobile No"
            className="mt-1 block w-full h-12 rounded-md border border-black-200 shadow-sm focus:border-black focus:ring-0 sm:text-sm placeholder-gray-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900">Doctor</label>
          <select
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            className="mt-1 block w-full h-12 rounded-md border border-black-200 shadow-sm focus:border-black focus:ring-0 sm:text-sm placeholder-gray-400"
          >
            <option>  select doctors</option>
            <option>Dr.abc</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900">Date</label>
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full h-12 rounded-md border border-black-200 shadow-sm focus:border-black focus:ring-0 sm:text-sm placeholder-gray-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900">Duration</label>
          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="mt-1 block w-full h-12 rounded-md border border-black-200 shadow-sm focus:border-black focus:ring-0 sm:text-sm placeholder-gray-400"
          >
            <option>10</option>
            <option>15</option>
            <option>30</option>
          </select>
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900">Treatment</label>
            <input
              type="text"
              name="treatment"
              value={formData.treatment}
              onChange={handleChange}
              placeholder="  Treatment"
              className="mt-1 block w-full h-12 rounded-md border border-black-200 shadow-sm focus:border-black focus:ring-0 sm:text-sm placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">Notes</label>
            <input
              type="text"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="  Notes"
              className="mt-1 block w-full h-12 rounded-md border border-black-200 shadow-sm focus:border-black focus:ring-0 sm:text-sm placeholder-gray-400"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
        >
          Save
        </button>
        <button
          className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-md hover:bg-gray-400"
        onClick={closeMobileAppointment}
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default AddMobileAppointment;