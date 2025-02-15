import React, { useState, useEffect } from "react";
import { use } from "react";

export default function Banner() {

  const [patientData, setPatientData] = useState([]);
  const [appointmentData, setAppointmentData] = useState([]);
  const [missedAppointmentData, setMissedAppointmentData] = useState([]);
  const [UpComingAppointmentsData, setUpComingAppointmentsData] = useState([]);
  const [todayPatientsData, setTodayPatientsData] = useState([]);
  const [cancledAppointmentData, setCancledAppointmentData] = useState([]);

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
    fetchData("http://localhost:8000/Patient/patients/", setPatientData);
  }, []);
  
  useEffect(() => {
    fetchData("http://localhost:8000/appointment/appointmentbydate/", setAppointmentData);
  }, []);

  useEffect(() => {
    fetchData("http://localhost:8000/appointment/MissedAppointments/", setMissedAppointmentData);
  }, []);

  useEffect(() => {
    fetchData("http://localhost:8000/appointment/UpComingAppointments/", setUpComingAppointmentsData);
  }, []);
  
  useEffect(() => {
    fetchData("http://localhost:8000/Patient/todayspatients/", setTodayPatientsData);
  }, []);
  
  useEffect(() => {
    fetchData("http://localhost:8000/appointment/TotalCanceledAppointments/", setCancledAppointmentData);
  }, []);
  
  const [cardData, setCardData] = useState([
    {
      label: "PATIENTS",
      count: "1",
      bgColor: "bg-green-500",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="35px"
          height="35px"
        >
          <path
            fillRule="evenodd"
            d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      label: "APPOINTMENTS",
      count: "0",
      bgColor: "bg-blue-400",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35px"
          height="35px"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-calendar-check"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M11.5 21h-5.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v6" />
          <path d="M16 3v4" />
          <path d="M8 3v4" />
          <path d="M4 11h16" />
          <path d="M15 19l2 2l4 -4" />
        </svg>
      ),
      extra: [
        { text: "Missed 1", bgColor: "bg-red-600" },
        { text: "Upcoming 0", bgColor: "bg-red-400" },
      ],
    },
    {
      label: "TODAY PATIENTS",
      count: "0",
      bgColor: "bg-purple-400",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35px"
          height="35px"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-stethoscope"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M6 4h-1a2 2 0 0 0 -2 2v3.5h0a5.5 5.5 0 0 0 11 0v-3.5a2 2 0 0 0 -2 -2h-1" />
          <path d="M8 15a6 6 0 1 0 12 0v-3" />
          <path d="M11 3v2" />
          <path d="M6 3v2" />
          <path d="M20 10m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        </svg>
      ),
    },
    {
      label: "TODAY CANCELLED APPOINTMENTS",
      count: "0",
      bgColor: "bg-red-400",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35px"
          height="35px"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-calendar-cancel"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12.5 21h-6.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5" />
          <path d="M16 3v4" />
          <path d="M8 3v4" />
          <path d="M4 11h16" />
          <path d="M19 19m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M17 21l4 -4" />
        </svg>
      ),
    },
  ]);

  // Update "PATIENTS" card count when patientData changes
  useEffect(() => {
    setCardData((prevData) =>
      prevData.map((card) =>
        card.label === "PATIENTS"
          ? { ...card, count: patientData.length.toString() }
          : card
      )
    );
  }, [patientData]);

  // Update "APPOINTMENTS" card count when appointmentData changes
  useEffect(() => {
    setCardData((prevData) =>
      prevData.map((card) =>
        card.label === "APPOINTMENTS"
          ? { ...card, count: appointmentData.length.toString() }
          : card
      )
    );
  }, [appointmentData]);

  // Update "APPOINTMENTS" card extra count when missedAppointmentData changes 
  useEffect(() => {
    setCardData((prevData) =>
      prevData.map((card) =>
        card.label === "APPOINTMENTS"
          ? {
              ...card,
              extra: [
                { text: "Missed " + missedAppointmentData.length.toString(), bgColor: "bg-red-600" },
                { text: "Upcoming " + UpComingAppointmentsData.length.toString(), bgColor: "bg-red-400" },
              ],
            }
          : card
      )
    );
  }, [missedAppointmentData]);

  // Update "TODAY PATIENTS" card count when patientData changes
  useEffect(() => {
    setCardData((prevData) =>
      prevData.map((card) =>
        card.label === "TODAY PATIENTS"
          ? { ...card, count: todayPatientsData.length.toString() }
          : card
      )
    );
  }, [todayPatientsData]);

  // Update "TODAY CANCELLED APPOINTMENTS" card count when cancledAppointmentData changes
  useEffect(() => {
    setCardData((prevData) =>
      prevData.map((card) =>
        card.label === "TODAY CANCELLED APPOINTMENTS"
          ? { ...card, count: cancledAppointmentData.length.toString() }
          : card
      )
    );
  }, [cancledAppointmentData]);
  

  return (
    <div className="p-6 font-poppins">
      <div className="text-left mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back, Craft Medical Clinic!
        </h1>
        <p className="text-gray-600">Today is Wednesday, 22 January 2025</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`${card.bgColor} text-white rounded-lg shadow-md p-6`}
          >
            <div className="flex items-center justify-between h-full">
              <div>
                <h2 className="text-base font-semibold">{card.label}</h2>
                <p className="text-3xl font-bold">{card.count}</p>
              </div>
              <div>{card.icon}</div>
            </div>
            {card.extra && (
              <div className="flex mt-2 space-x-2">
                {card.extra.map((item, extraIndex) => (
                  <span
                    key={extraIndex}
                    className={`${item.bgColor} px-2 py-1 rounded`}
                  >
                    {item.text}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
