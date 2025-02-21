import axios from "axios";
import React, { useState, useEffect } from "react";
import moment from "moment";

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
          "http://127.0.0.1:8000/appointment/appointmentbydate/"
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

  const todayTotal = data.filter((a) => a.Doctor === id).length;
  const formatDate = (isoString) => moment(isoString).format(" hh:mm A");

  // Handle Check-in
  const handleCheckin = async (appointmentId, newStatus) => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/appointment/appointments/${appointmentId}`,
        { status: newStatus },
        { headers: { "Content-Type": "application/json" } }
      );

      // Optimistically update state
      setData((prevData) => {
        const updatedData = prevData.map((appointment) =>
          appointment.id === appointmentId
            ? { ...appointment, status: newStatus }
            : appointment
        );

        // Update filtered appointments immediately
        setFilteredAppointments(
          updatedData.filter(
            (appointment) =>
              appointment.Doctor === id && appointment.status === filtersetter
          )
        );

        return updatedData;
      });
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  console.log("hasdhs", filteredAppointments);

  return (
    <div className="flex justify-center items-start h-auto bg-white ">
      <div>
        <h2 className="text-center text-gray-800">TODAY ({todayTotal})</h2>
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
            className="p-4 m-5 bg-white shadow-md mt-4 flex items-center w-[470px] justify-center space-x-3 "
          >
            <div className="flex flex-col-3 justify-center w-full items-center ">
              <p className="text-gray-800 flex items-center">
                <span className="text-sm">{formatDate(appointment.data)}</span>
              </p>
            </div>

            <div className="flex flex-col w-full">
  <h3 className="text-gray-800 font-bold">{appointment.PatientName}</h3>
  <p className="text-gray-600">{appointment.Treatment}</p>
</div>

            <div className="flex space-x-2 w-full justify-center">
              {appointment.status === "Scheduled" && (
                <>
                  <button
                    className="rounded-lg bg-green-600 p-2 text-white"
                    onClick={() => handleCheckin(appointment.id, "Waiting")}
                  >
                    CheckIn
                  </button>

                  <button
                    className="rounded-lg bg-green-600 p-2 text-white"
                    onClick={() => handleCheckin(appointment.id, "Canceled")}
                  >
                    Cancel
                  </button>
                </>
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
                  onClick={() => handleCheckin(appointment.id, "Done")}
                >
                  Done
                </button>
              )}

              {appointment.status === "Done" && (
                <div className="rounded-lg bg-blue-gray-400 p-2 text-white ">
                  Done
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
