import React, { useState, useEffect } from 'react';
import { FaRegCalendarDays, FaRegCalendar } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

export default function AppointmentBanner() {
  const [appointmentData, setAppointmentData] = useState([]);
  const [upComingAppointmentsData, setUpComingAppointmentsData] = useState([]);
  const [missedAppointmentData, setMissedAppointmentData] = useState([]);

  const navigate = useNavigate();

  const appointment = () => {
    navigate('/today-patient', { state: { selectedStatus: 'appointment' } });
  };

  const UpComingAppointments =()=>{
    navigate('/today-patient', { state: { selectedStatus: 'UpComingAppointmentsWeek' } });
  };

  const missedAppointments =()=>{
    navigate('/today-patient', { state: { selectedStatus: 'missedAppointment' } });
  };

  async function fetchData(url, setter) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setter(data);
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
    }
  }

  useEffect(() => {
    fetchData('http://localhost:8000/appointment/appointmentbydate/', setAppointmentData);
    fetchData('http://localhost:8000/appointment/upcomingappointmentsWeek/', setUpComingAppointmentsData);
    fetchData('http://localhost:8000/appointment/MissedAppointments/', setMissedAppointmentData);
  }, []);

  return (
    <div className="flex flex-col justify-start items-center w-full bg-gray-100 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 w-full">
        {/* Today's Appointments */}
        <div
          className="flex items-center bg-white p-6 cursor-pointer hover:shadow-md"
          onClick={appointment}
        >
          <div className="text-blue-500 text-4xl">
            <FaRegCalendarDays />
          </div>
          <div className="ml-auto text-right">
            <p className="text-3xl font-bold">{appointmentData.length}</p>
            <p className="text-gray-600">Today Total Appointments</p>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="flex items-center bg-white p-6 hover:shadow-md">
          <div className="text-red-500 text-4xl">
            <FaRegCalendarDays />
          </div>
          <div className="ml-auto text-right"
          onClick={UpComingAppointments}
          >
            <p className="text-3xl font-bold">{upComingAppointmentsData.length}</p>
            <p className="text-gray-600">Upcoming Appointments this week</p>
          </div>
        </div>

        {/* Missed Appointments */}
        <div className="flex items-center bg-white p-6 hover:shadow-md">
          <div className="text-green-500 text-4xl">
            <FaRegCalendar />
          </div>
          <div className="ml-auto text-right"
          onClick={missedAppointments}
          >
            <p className="text-3xl font-bold">{missedAppointmentData.length}</p>
            <p className="text-gray-600">Today Missed Appointments</p>
          </div>
        </div>
      </div>
    </div>
  );
}
