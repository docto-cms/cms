import axios from "axios";

import React, { useState, useEffect } from "react";

export default function AppointmentTable({ id }) {
  const [selectedTab, setSelectedTab] = useState("");
  const [scheduledCount, setScheduledCount] = useState(1);
  const [waitingCount, setWaitingCount] = useState(0);
  const [waitingData, setWaitingData] = useState([]);
  const [engagedData, setEngagedData] = useState([]);
  const [doneData, setDoneData] = useState([]);
  const [timer, setTimer] = useState(0);

  const [data, setData] = useState([]);
  const [countSetter, setCountSetter] = useState(
    {
      Scheduled: 0,
      Waiting: 0,
      Engaged: 0,
      Done:0,
    });
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filtersetter, setFilter] = useState("Scheduled");

  const handleClick = (tab) => {
    setFilter(tab);
  };

  const moveToWaiting = () => {
    if (scheduledCount > 0) {
      setScheduledCount(scheduledCount - 1);
      setWaitingCount(waitingCount + 1);
      setFilteredAppointments([
        ...waitingData,
        {
          name: "Mr. Jithin M",
          time: "06:15 AM",
          doctor: "Dr. Muhammed Iqbal VM",
          status: "Manual Prescription",
        },
      ]);
    }
  };

  const moveToEngaged = (index) => {
    const patient = waitingData[index];
    setWaitingCount(waitingCount - 1);
    setEngagedData([...engagedData, patient]);
    const updatedWaitingData = waitingData.filter((_, i) => i !== index);
    setWaitingData(updatedWaitingData);
  };

  const moveToDone = (index) => {
    const patient = engagedData[index];
    setEngagedData(engagedData.filter((_, i) => i !== index));
    setDoneData([...doneData, patient]);
  };

  // Timer effect: Start timer when a patient is moved to engaged state
  useEffect(() => {
    if (selectedTab === "Engaged") {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer >= 10) {
            clearInterval(interval); // Stop the timer after 10 seconds
            return prevTimer;
          }
          return prevTimer + 1;
        });
      }, 1000);

      // Clean up the interval on component unmount
      return () => clearInterval(interval);
    }
  }, [selectedTab]);

  // Format time as mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          "http://127.0.0.1:8000/appointment/appointments/"
        );
        setData(response.data);
      };
      fetchData();
    } catch (error) {
      console.error(`Error fetching data:`, error);
    }
  }, []);

  const filtered = data.filter(
    (appointment) =>
      appointment.Doctor === id && appointment.status === filtersetter
  );
  console.log("filterer:", filtered);

  useEffect(() => {
    setFilteredAppointments(filtered);

  }, [data]);

  useEffect(() => {
    const countScheduled = data.filter(
      (appointment) => appointment.status === "Scheduled" && appointment.Doctor === id
    ).length;
  
    const countWaiting = data.filter(
      (appointment) => appointment.status === "Waiting" && appointment.Doctor === id
    ).length;
  
    const countEngaged = data.filter(
      (appointment) => appointment.status === "Engaged" && appointment.Doctor === id
    ).length;
  
    const countDone = data.filter(
      (appointment) => appointment.status === "Done" && appointment.Doctor === id
    ).length;
  
    // Ensure previous state values are retained
    setCountSetter((prev) => ({
      ...prev,
      Scheduled: countScheduled,
      Waiting: countWaiting,
      Engaged: countEngaged,
      Done: countDone
    }));
  }, [data, id]);
  
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

        {filtered.map((appointment) => (
          <div className="p-4  ml-5  bg-white  shadow-md mt-4 flex items-center w-[470px]">

            <div className="flex flex-col justify-center items-center mr-4">
              <p className="text-gray-800 flex items-center">
                <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
                <span className="text-sm">06:15</span>
              </p>
              <p className="text-gray-600 text-sm">AM</p>
            </div>

            <div className="flex-1">
              <h3 className="text-gray-800 font-bold">{appointment.PatientName}</h3>
              <p className="text-gray-600">Revisit</p>
              <p className="text-gray-600">Dr. Muhammed Iqbal VM</p>
              <p className="text-gray-600">Manual Prescription</p>
            </div>
            
            <div>
              <button className="">CheckIn</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
