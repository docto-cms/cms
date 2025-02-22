import React, { useState, useEffect } from "react";
import apptimg from "../../assets/Dashboard images/correct.png";
import patientimg from "../../assets/Dashboard images/user.png";
import cancelledimg from "../../assets/Dashboard images/cancel-booking.png";
import tdaypatientimg from "../../assets/Dashboard images/add-user.png";

export default function Banner() {
  const [patientData, setPatientData] = useState([]);
  const [appointmentData, setAppointmentData] = useState([]);
  const [missedAppointmentData, setMissedAppointmentData] = useState([]);
  const [UpComingAppointmentsData, setUpComingAppointmentsData] = useState([]);
  const [todayPatientsData, setTodayPatientsData] = useState([]);
  const [canceledAppointmentData, setCanceledAppointmentData] = useState([]);

  async function fetchData(url, setter) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setter(data);
      } else {
        console.error(`Invalid data format from ${url}:`, data);
      }
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
    }
  }

  useEffect(() => {
    fetchData("http://localhost:8000/Patient/patients/", setPatientData);
    fetchData("http://localhost:8000/appointment/appointmentbydate/", setAppointmentData);
    fetchData("http://localhost:8000/appointment/MissedAppointments/", setMissedAppointmentData);
    fetchData("http://localhost:8000/appointment/UpComingAppointmentsToday/", setUpComingAppointmentsData);
    fetchData("http://localhost:8000/Patient/todayspatients/", setTodayPatientsData);
    fetchData("http://localhost:8000/appointment/TotalCanceledAppointments/", setCanceledAppointmentData);
  }, []);

  const [cardData, setCardData] = useState([
    {
      label: "Patients",
      count: "0",
      bgColor: "bg-white",
      icon: <img src={patientimg} alt="Patients" className="w-5 h-5" />,
    },
    {
      label: "Appointments",
      count: "0",
      bgColor: "bg-white",
      icon: <img src={apptimg} alt="Appointments" className="w-5 h-5" />,
    },
    {
      label: "Today Patients",
      count: "0",
      bgColor: "bg-white",
      icon: <img src={tdaypatientimg} alt="Today Patients" className="w-5 h-5" />,
    },
    {
      label: "Today Cancelled Appointments",
      count: "0",
      bgColor: "bg-white",
      icon: <img src={cancelledimg} alt="Cancelled Appointments" className="w-5 h-5" />,
    },
  ]);

  // Update "Patients" card count when patientData changes
  useEffect(() => {
    setCardData((prevData) =>
      prevData.map((card) =>
        card.label === "Patients" ? { ...card, count: patientData.length.toString() } : card
      )
    );
  }, [patientData]);

  // Update "Appointments" card count when appointmentData changes
  useEffect(() => {
    setCardData((prevData) =>
      prevData.map((card) =>
        card.label === "Appointments" ? { ...card, count: appointmentData.length.toString() } : card
      )
    );
  }, [appointmentData]);

  // Update "Appointments" card extra details when missed & upcoming appointments change
  useEffect(() => {
    setCardData((prevData) =>
      prevData.map((card) =>
        card.label === "Appointments"
          ? {
              ...card,
              extra: [
                { text: `Missed ${missedAppointmentData.length}`, bgColor: "bg-red-600" },
                { text: `Upcoming ${UpComingAppointmentsData.length}`, bgColor: "bg-blue-500" },
              ],
            }
          : card
      )
    );
  }, [missedAppointmentData, UpComingAppointmentsData]);

  // Update "Today Patients" card count when todayPatientsData changes
  useEffect(() => {
    setCardData((prevData) =>
      prevData.map((card) =>
        card.label === "Today Patients" ? { ...card, count: todayPatientsData.length.toString() } : card
      )
    );
  }, [todayPatientsData]);

  // Update "Today Cancelled Appointments" card count when canceledAppointmentData changes
  useEffect(() => {
    setCardData((prevData) =>
      prevData.map((card) =>
        card.label === "Today Cancelled Appointments" ? { ...card, count: canceledAppointmentData.length.toString() } : card
      )
    );
  }, [canceledAppointmentData]);

  return (
    <div className="p-6 font-poppins">
      <div className="text-left mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back</h1>
        <p className="text-gray-600">Today is {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {cardData.map((card, index) => (
          <div key={index} className={`${card.bgColor} rounded-lg p-6 border shadow-xl flex flex-col justify-between`}>
            <div className="flex items-center space-x-2">
              {card.icon}
              <h2 className="font-semibold text-sm text-black truncate">{card.label}</h2>
            </div>
            <div className="flex items-center justify-between mt-4">
              <p className="text-3xl font-bold">{card.count}</p>
              {card.extra &&
                card.extra.map((item, idx) => (
                  <span key={idx} className={`px-2 py-1 rounded text-white text-xs ${item.bgColor}`}>
                    {item.text}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
