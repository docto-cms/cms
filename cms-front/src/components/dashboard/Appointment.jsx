import React from 'react'

export default function Appointment() {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 m-5">
      <div className="flex space-x-6">
        <div className="flex-1">
          <div className="flex justify-between">
            <h2 className="text-blue-500 text-lg font-bold">Queue</h2>
            <h1 className="text-blue-500 font-bold text-3xl text-right">0</h1>
          </div>
          <p className="text-gray-500 mt-2">Appointments</p>
          <div className="mt-4 w-full bg-gray-200 h-2 rounded-full">
            <div className="bg-gray-200 h-2 rounded-full"></div>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500 text-sm mt-2">Queue</p>
            <p className="text-gray-500 text-sm mt-2">0%</p>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between">
            <h2 className="text-green-500 text-lg font-bold">Waiting</h2>
            <h1 className="text-blue-500 font-bold text-3xl text-right">0</h1>
          </div>
          <p className="text-gray-500 mt-2">Appointments</p>
          <div className="mt-4 w-full bg-gray-200 h-2 rounded-full">
            <div className="bg-gray-200 h-2 rounded-full"></div>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500 text-sm mt-2">Waiting</p>
            <p className="text-gray-500 text-sm mt-2">0%</p>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between">
            <h2 className="text-yellow-500 text-lg font-bold">Engaged</h2>
            <h1 className="text-blue-500 font-bold text-3xl text-right">0</h1>
          </div>
          <p className="text-gray-500 mt-2">Appointments</p>
          <div className="mt-4 w-full bg-gray-200 h-2 rounded-full">
            <div className="bg-gray-200 h-2 rounded-full"></div>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500 text-sm mt-2">Engaged</p>
            <p className="text-gray-500 text-sm mt-2">0%</p>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between">
            <h2 className="text-black text-lg font-bold">Done</h2>
            <h1 className="text-blue-500 font-bold text-3xl text-right">0</h1>
          </div>
          <p className="text-gray-500 mt-2">Appointments</p>
          <div className="mt-4 w-full bg-gray-200 h-2 rounded-full">
            <div className="bg-gray-200 h-2 rounded-full"></div>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500 text-sm mt-2">Done</p>
            <p className="text-gray-500 text-sm mt-2">0%</p>
          </div>
        </div>
      </div>
    </div>

  )
}
