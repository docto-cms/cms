import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewAppointment from "./components/NewAppointment";
import Quickentry from "./components/Quickentry"; // Adjust the path as per your folder structure
import "./index.css"; // Tailwind CSS file
import NewPatient from "./components/NewPatient";
import Appointment from "./components/Appointment";
import Scheduled from  "./components/Scheduled";
import Popup from "./components/Popup";
import Upcoming from "./components/Upcoming"



export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Routes>
          <Route path="/" element={<NewAppointment />} />
          <Route path="/quickentry" element={<Quickentry />} />
          <Route path="/newpatient" element={<NewPatient />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/scheduled" element={<Scheduled />} />
          <Route path="/popup" element={<Popup/>} />
          <Route path="/upcoming" element={<Upcoming/>} />
         
          
        </Routes>
      </div>
    </Router>
  );
}
