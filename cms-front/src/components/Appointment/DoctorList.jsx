import { select } from '@material-tailwind/react';
import React, { useState, useEffect } from 'react';

export default function DoctorList({id, setId ,}) {
  const [doctors, setDoctors] = useState([]);
  const [doctorsCount, setDoctorsCount] = useState({});

  async function fetchData(url, setter) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
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
        console.log(appointments);
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
          <span
            onClick={() => setId(doctor.id)} // Set the id of the selected doctor
            key={doctor.id} // Using doctor.id as the key
            className={`flex items-center justify-between mb-3  py-1 px-4 rounded-md last:mb-0 cursor-pointer ${id === doctor.id ? "bg-gray-200   " : ""}` }
          >
            <div className="flex items-center">
              <span
                className={`w-3 h-3 rounded-full ${doctor.color} mr-3`}
              ></span>
              <span className="text-blue-500 font-medium">{doctor.firstname}</span>
            </div>
            <span className="text-gray-600">
              ({doctorsCount[doctor.id] })
            </span>
          </span>
        ))}
      </ul>
    </div>
  );
}
