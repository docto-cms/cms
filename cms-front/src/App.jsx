import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar1 from "./components/sidebar/Sidebar1";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import QuickEntrypage from "./pages/QuickEntrypage";
import AppointmentDashboard from "./pages/AppointmentDashboard";
import WebsiteAppointmentpage from "./pages/WebsiteAppointmentpage";
import AddPatientPage from "./pages/AddPatientPage";
import TodayPatientpage from "./pages/TodayPatientpage";
import TotalAppointment from "./components/Appointment/TotalAppointment";
import AddAppointmentPage from "./pages/AddAppointmentPage";
import SearchPatientPage from "./pages/SearchPatientPage";
import DoctorProfile from "./components/DoctorProfile";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* 🔓 Public Routes (No Sidebar) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 🔒 Protected Routes (With Sidebar) */}
        <Route element={<ProtectedRoute />}>
          <Route  element={<Sidebar1 /> }>
            <Route index element={<Dashboard />} />{" "}
            {/* Default route inside Sidebar */}
            <Route path="quick-entry" element={<QuickEntrypage />} />
            <Route path="appointments" element={<AppointmentDashboard />} />
            <Route
              path="website-appointment"
              element={<WebsiteAppointmentpage />}
            />
            <Route path="add-patients" element={<AddPatientPage />} />
            <Route path="today-patient" element={<TodayPatientpage />} />
            <Route path="total-appointments" element={<TotalAppointment />} />
            <Route path="add-appointment" element={<AddAppointmentPage />} />
            <Route path="search-patient" element={<SearchPatientPage />} />
            <Route path="doctor-profile" element={<DoctorProfile />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
