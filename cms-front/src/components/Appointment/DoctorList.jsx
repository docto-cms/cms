import { select } from '@material-tailwind/react';
import React, { useState, useEffect } from 'react';

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [doctorsCount, setDoctorsCount] = useState({});

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
    fetchData("http://localhost:8000/Patient/doctor/", setDoctors);
  }, []);

  // Fetching appointments and counting them per doctor
  useEffect(() => {
    // Fetching appointment data for each doctor
    doctors.forEach(doctor => {
      fetchData(`http://localhost:8000/appointment/DocterAppointmentByDocterId/${doctor.id}`, (appointments) => {
        // Count the number of appointments (length of the array)
        setDoctorsCount(prevCounts => ({
          ...prevCounts,
          [doctor.id]: appointments.length, // Store the count of appointments for each doctor
        }));
      });
    });
  }, [doctors]); // Triggered when doctors data is fetched

  return (
    <div className="w-64 p-14 bg-white shadow-lg h-[900px]">
      <button className="w-full bg-green-500 text-white py-2 px-4 mb-4">
        All Doctors
      </button>
      <ul>
        {doctors.map((doctor) => (
          <li
            key={doctor.id} // Using doctor.id as the key
            className="flex items-center justify-between mb-3 last:mb-0 cursor-pointer"
          >
            <div className="flex items-center">
              <span
                className={`w-3 h-3 rounded-full ${doctor.color} mr-3`}
              ></span>
              <span className="text-blue-500 font-medium">{doctor.firstname}</span>
            </div>
            <span className="text-gray-600">
              ({doctorsCount[doctor.id] || 0})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
