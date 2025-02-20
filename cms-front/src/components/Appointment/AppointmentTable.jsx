import axios from "axios";
import React, { useState, useEffect } from "react";

export default function AppointmentTable({ id }) {
  const [data, setData] = useState([]);
  const [countSetter, setCountSetter] = useState({
    Scheduled: 0,
    Waiting: 0,
    Engaged: 0,
    Done: 0,
  });
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filtersetter, setFilter] = useState("Scheduled");

  const handleClick = (tab) => {
    setFilter(tab);
  };

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/appointment/appointments/"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = data.filter(
      (appointment) =>
        appointment.Doctor === id && appointment.status === filtersetter
    );
    setFilteredAppointments(filtered);
  }, [data, filtersetter, id]);

  // Update status counts dynamically
  useEffect(() => {
    setCountSetter({
      Scheduled: data.filter((a) => a.status === "Scheduled" && a.Doctor === id)
        .length,
      Waiting: data.filter((a) => a.status === "Waiting" && a.Doctor === id)
        .length,
      Engaged: data.filter((a) => a.status === "Engaged" && a.Doctor === id)
        .length,
      Done: data.filter((a) => a.status === "Done" && a.Doctor === id).length,
    });
  }, [data, id]);

  // Handle Check-in
  const handleCheckin = async (appointmentId, newStatus) => {
    // Optimistically update the UI

    try {
      await axios.patch(
        `http://127.0.0.1:8000/appointment/appointments/${appointmentId}`,
        { status: newStatus },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Check-in successful");
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  return (
    <div className="flex justify-center items-start h-auto bg-white ">
      <div>
        <h2 className="text-center text-gray-800">TODAY (1)</h2>
        <div className="flex overflow-hidden m-auto p-5 w-[500px]">
          <div
            className="flex-1 text-center p-1 bg-blue-400 border border-gray-500 text-white cursor-pointer"
            onClick={() => handleClick("Scheduled")}
          >
            Scheduled <h1>{countSetter.Scheduled}</h1>
          </div>
          <div
            className="flex-1 text-center p-1 bg-green-500 border border-gray-500 text-white cursor-pointer"
            onClick={() => handleClick("Waiting")}
          >
            Waiting <h1>{countSetter.Waiting}</h1>
          </div>
          <div
            className="flex-1 text-center p-1 bg-yellow-500 border border-gray-500 text-white cursor-pointer"
            onClick={() => handleClick("Engaged")}
          >
            Engaged <h1>{countSetter.Engaged}</h1>
          </div>
          <div
            className="flex-1 text-center p-1 border border-gray-700 cursor-pointer"
            onClick={() => handleClick("Done")}
          >
            Done <h1>{countSetter.Done}</h1>
          </div>
        </div>

        {filteredAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="p-4 ml-5 bg-white shadow-md mt-4 flex items-center w-[470px]"
          >
            <div className="flex flex-col justify-center items-center mr-4">
              <p className="text-gray-800 flex items-center">
                <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
                <span className="text-sm">06:15</span>
              </p>
              <p className="text-gray-600 text-sm">AM</p>
            </div>

            <div className="flex-1">
              <h3 className="text-gray-800 font-bold">
                {appointment.PatientName}
              </h3>
              <p className="text-gray-600">{appointment.id}</p>
              <p className="text-gray-600">Dr. Muhammed Iqbal VM</p>
              <p className="text-gray-600">Manual Prescription</p>
            </div>

            <div>
              {appointment.status === "Scheduled" && (
                <button
                  className="rounded-lg bg-green-600 p-2 text-white"
                  onClick={() => handleCheckin(appointment.id, "Waiting")}
                >
                  CheckIn
                </button>
              )}

              {appointment.status === "Waiting" && (
                <button
                  className="rounded-lg bg-green-600 p-2 text-white"
                  onClick={() => handleCheckin(appointment.id, "Engaged")}
                >
                  Engaged
                </button>
              )}

              {appointment.status === "Engaged" && (
                <button
                  className="rounded-lg bg-green-600 p-2 text-white"
                  onClick={() => handleCheckin(appointment.id, "Engaged")}
                >
                  Done
                </button>
              )}

              {appointment.status === "Done" && (
                <button
                  className="rounded-lg bg-green-600 p-2 text-white"
                  
                >
                  Done
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
