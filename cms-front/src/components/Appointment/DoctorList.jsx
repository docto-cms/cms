import React from 'react'

export default function DoctorList() {
  const doctors = [
    { name: "DrMuhammed Iqbal", count: 1, color: "bg-green-500" },
    { name: "Dr Krishna", count: 0, color: "bg-blue-500" },
    { name: "Dr Babu", count: 0, color: "bg-purple-500" },
    { name: "Dr Bijeesh", count: 0, color: "bg-yellow-500" },
    { name: "Dr Neethu", count: 0, color: "bg-pink-500" },
  ];
  return (
    <div className="w-64 p-14 bg-white shadow-lg h-[900px] ">
      <button className="w-full bg-green-500 text-white py-2 px-4 mb-4">
        All Doctors
      </button>
      <ul>
        {doctors.map((doctor, index) => (
          <li
            key={index}
            className="flex items-center justify-between mb-3 last:mb-0"
          >
            <div className="flex items-center">
              <span
                className={`w-3 h-3 rounded-full ${doctor.color} mr-3`}
              ></span>
              <span className="text-blue-500 font-medium">{doctor.name}</span>
            </div>
            <span className="text-gray-600">({doctor.count})</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
