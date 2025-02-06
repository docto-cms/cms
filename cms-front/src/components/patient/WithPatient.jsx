import React from 'react';


export default function WithPatient({ newPatient, handleInputChange, handleSavePatient }) {
  return (
    <div>
    <h1 className="text-xl font-semibold text-gray-700 mb-6">
      New Patient Info
    </h1>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div>
        <label className="block text-sm font-bold text-gray-700">
          Registration ID
        </label>
        <input
          type="number"
          name="registrationId"
          value={newPatient.registrationId}
          onChange={handleInputChange}
          placeholder="ID"
          required
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
        />
      </div>
      <div className="col-span-2">
        <label className="block text-sm font-bold text-gray-700">
          Patient Name
        </label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <input
            type="text"
            name="firstName"
            value={newPatient.firstName || ""}
            onChange={handleInputChange}
            placeholder="First Name"
            required
            className="p-3 border border-gray-300 rounded-lg w-full"
          />
          <input
            type="text"
            name="lastName"
            value={newPatient.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
            className="p-3 border border-gray-300 rounded-lg w-full"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700">
          REC No
        </label>
        <input
          type="number"
          name="recNo"
          value={newPatient.recNo}
          onChange={handleInputChange}
          required
          placeholder="REC No"
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div>
        <label className="block text-sm font-bold text-gray-700">
          Age
        </label>
        <input
          type="text"
          name="age"
          value={newPatient.age}
          onChange={handleInputChange}
          required
          placeholder="Age"
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700">
          Phone Number
        </label>
        <input
          type="text"
          name="phone"
          value={newPatient.phone}
          onChange={handleInputChange}
          placeholder="Phone No."
          required
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700">
          Gender
        </label>
        <select
          name="gender"
          value={newPatient.gender}
          onChange={handleInputChange}
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          required
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Others</option>
        </select>
      </div>
    </div>

    <h2 className="text-lg font-semibold text-gray-700 mb-4">
      Fee Details
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div>
        <label className="block text-sm font-bold text-gray-700">
          Fee Type
        </label>
        <select
          name="feeType"
          value={newPatient.feeType}
          onChange={handleInputChange}
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          required
        >
          <option value="" disabled>
            Select Fee Type
          </option>
          <option value="consultation">Consultation Fee</option>
          <option value="deduction">Deduction Fee</option>
          <option value="copay">Co-pay</option>
          <option value="followup">Follow Up</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700">
          Consultation Fee
        </label>
        <input
          type="number"
          name="fee"
          value={newPatient.fee}
          onChange={handleInputChange}
          placeholder="Enter Fee"
          required
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700">
          Payment Type
        </label>
        <select
          name="paymentType"
          value={newPatient.paymentType}
          onChange={handleInputChange}
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          required
        >
          <option value="" disabled>
            Select Payment Type
          </option>
          <option value="cash">Cash</option>
          <option value="insurance">Insurance</option>
          <option value="card">Card</option>
          <option value="gpay">G-pay</option>
        </select>
      </div>
    </div>

    <div className="flex justify-end mb-6">
      <button onClick={handleSavePatient}
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Save
      </button>
    </div>
  </div>
  )
}
