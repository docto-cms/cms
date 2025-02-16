import React from 'react'
import { FaRegCalendarDays, FaRegCalendar } from "react-icons/fa6";
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';


export default function AppointmentBanner() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col justify-start items-center w-full bg-gray-100 p-6 ">
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 w-full">
        <div className="flex items-center bg-white p-6 cursor-pointer"
        onClick={() => navigate('/total-appointments')}>

          <div className="text-blue-500 text-4xl">
            <FaRegCalendarDays />
          </div>
          <div className="ml-auto text-right">
            <p className="text-3xl font-bold">1</p>
            <p className="text-gray-600">Today Total Appointments</p>
          </div>
        </div>

        <div className="flex items-center bg-white p-6">
          <div className="text-red-500 text-4xl">
            <FaRegCalendarDays />
          </div>
          <div className="ml-auto text-right">
            <p className="text-3xl font-bold">1</p>
            <p className="text-gray-600">Upcoming Appointments</p>
          </div>
        </div>

        <div className="flex items-center bg-white p-6">
          <div className="text-green-500 text-4xl">
            <FaRegCalendar />
          </div>
          <div className="ml-auto text-right">
            <p className="text-3xl font-bold">8</p>
            <p className="text-gray-600">
              Today Missed Appointments
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
