import React, { useState, useEffect } from "react";

export default function AppointmentTable() {
    const [selectedTab, setSelectedTab] = useState("");
    const [scheduledCount, setScheduledCount] = useState(1);
    const [waitingCount, setWaitingCount] = useState(0);
    const [waitingData, setWaitingData] = useState([]);
    const [engagedData, setEngagedData] = useState([]);
    const [doneData, setDoneData] = useState([]);
    const [timer, setTimer] = useState(0);
  
    const handleClick = (tab) => {
      setSelectedTab(tab);
    };
  
    const moveToWaiting = () => {
      if (scheduledCount > 0) {
        setScheduledCount(scheduledCount - 1);
        setWaitingCount(waitingCount + 1);
        setWaitingData([
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
      return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
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
              Scheduled <h1>{scheduledCount}</h1>
            </div>
            <div
              className="flex-1 text-center p-1 bg-green-500 border border-gray-500 text-white cursor-pointer"
              onClick={() => handleClick("Waiting")}
            >
              Waiting <h1>{waitingCount}</h1>
            </div>
            <div
              className="flex-1 text-center p-1 bg-yellow-500 border border-gray-500 text-white cursor-pointer"
              onClick={() => handleClick("Engaged")}
            >
              Engaged <h1>{engagedData.length}</h1>
            </div>
            <div
              className="flex-1 text-center p-1 border border-gray-700 cursor-pointer"
              onClick={() => handleClick("Done")}
            >
              Done <h1>{doneData.length}</h1>
            </div>
          </div>
  
          {/* SCHEDULED DETAILS */}
          {selectedTab === "Scheduled" && scheduledCount > 0 && (
            <div className="p-4  ml-5  bg-white  shadow-md mt-4 flex items-center w-[470px]">
              <div className="flex flex-col justify-center items-center mr-4">
                <p className="text-gray-800 flex items-center">
                  <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
                  <span className="text-sm">06:15</span>
                </p>
                <p className="text-gray-600 text-sm">AM</p>
              </div>
              <div className="flex-1">
                <h3 className="text-gray-800 font-bold">Mr. Jithin M</h3>
                <p className="text-gray-600">Revisit</p>
                <p className="text-gray-600">Dr. Muhammed Iqbal VM</p>
                <p className="text-gray-600">Manual Prescription</p>
              </div>
              <button
                onClick={moveToWaiting}
                className="bg-cyan-400 text-white px-3 py-1 rounded"
              >
                Checkin
              </button>
            </div>
          )}
  
          {/* WAITING DETAILS */}
          {selectedTab === "Waiting" && waitingData.length > 0 ? (
            waitingData.map((patient, index) => (
              <div
                key={index}
                className="p-4 ml-5 bg-white  shadow-md mt-4 flex items-center  w-[470px]"
              >
                <div className="flex flex-col justify-center items-center mr-4">
                  <p className="text-gray-800 flex items-center">
                    <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
                    <span className="text-sm">{patient.time}</span>
                  </p>
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-800 font-bold">{patient.name}</h3>
                  <p className="text-gray-600">{patient.status}</p>
                  <p className="text-gray-600">{patient.doctor}</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center">
                    <span className="bg-blue-400 text-white p-1 rounded-l">
                      &#9194;
                    </span>
                    <button
                      className="bg-orange-500 text-white px-3 py-1 rounded"
                      onClick={() => moveToEngaged(index)}
                    >
                      Engaged
                    </button>
                  </div>
                  <p className="text-green-500 mt-2">{formatTime(timer)}</p>
                </div>
              </div>
            ))
          ) : (
            selectedTab === "Waiting" && <h2 className="text-gray-800 ml-6">No data found</h2>
          )}
  
          {/* ENGAGED DETAILS */}
          {selectedTab === "Engaged" && engagedData.length > 0 ? (
            engagedData.map((patient, index) => (
              <div
                key={index}
                className="p-4 ml-5 bg-white border rounded shadow-md mt-4 flex items-center  w-[470px]"
              >
                <div className="flex flex-col justify-center items-center mr-4">
                  <p className="text-gray-800 flex items-center">
                    <span className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></span>
                    <span className="text-sm">{patient.time}</span>
                  </p>
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-800 font-bold">{patient.name}</h3>
                  <p className="text-gray-600">{patient.status}</p>
                  <p className="text-gray-600">{patient.doctor}</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center">
                    <span className="bg-blue-400 text-white p-1 rounded-l">
                      &#9194;
                    </span>
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded"
                      onClick={() => moveToDone(index)}
                    >
                      Done
                    </button>
                  </div>
                  <p className="text-green-500 mt-2">{formatTime(timer)}</p>
                </div>
              </div>
            ))
          ) : (
            selectedTab === "Engaged" && <h2 className="text-gray-800 ml-6">No data found</h2>
          )}
  
          {/* DONE DETAILS */}
          {selectedTab === "Done" && doneData.length > 0 ? (
            doneData.map((patient, index) => (
              <div
                key={index}
                className="p-4 ml-5 bg-white border rounded shadow-md mt-4 flex items-center  w-[470px]"
              >
                <div className="flex flex-col justify-center items-center mr-4">
                  <p className="text-gray-800 flex items-center">
                    <span className="h-3 w-3 rounded-full bg-gray-500 mr-2"></span>
                    <span className="text-sm">{patient.time}</span>
                  </p>
                 
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-800 font-bold">{patient.name}</h3>
                  <p className="text-gray-600">{patient.status}</p>
                  <p className="text-gray-600">{patient.doctor}</p>
                </div>
                <button
                      className="bg-cyan-500 text-white px-3 py-1 rounded">Finished</button>
              </div>
             
            ))
          ) : (
            selectedTab === "Done" && <h2 className="text-gray-800 ml-6">No data found</h2>
          )}
        </div>
      </div>
    );
  }