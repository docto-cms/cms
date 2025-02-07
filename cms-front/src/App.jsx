import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './pages/MainLayout';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import QuickEntrypage from './pages/QuickEntrypage';
import Sidebar1 from './components/sidebar/Sidebar1';
import Navbar from './components/Navbar';
import AppointmentDashboard from './pages/AppointmentDashboard';
import WebsiteAppointmentpage from './pages/WebsiteAppointmentpage';
import AddPatientPage from './pages/AddPatientPage';
import TodayPatientpage from './pages/TodayPatientpage';
import TotalAppointment from './components/Appointment/TotalAppointment';
import NewAppointment from './components/Appointment/Addappointment';
import AddAppointmentPage from './pages/AddAppointmentPage';
import SearchPatientPage from './pages/SearchPatientPage';

function App() {
  return (
    <Router>
     
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        
        {/* Protected Routes */}
        
        <Route path="/" element={<Sidebar1 />}>
          
          <Route index path='/quick-entry' element={<QuickEntrypage />} />
          <Route index path='/appointments' element={<AppointmentDashboard />} />
          <Route index path='/website-appointment' element={<WebsiteAppointmentpage />} />
          <Route index path='/add-patients' element={<AddPatientPage />} />
          <Route index path='/today-patient' element={<TodayPatientpage />} />
          <Route path='/total-appointments' element={<TotalAppointment/>}/>
          <Route path="/add-appointment" element={<AddAppointmentPage />} />
          <Route path="/search-patient" element={<SearchPatientPage />} />
          {/* Add more nested routes here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
