import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Appointment from './components/Appointment';
import NewAppointment from './components/NewAppointment';
import NewPatient from './components/NewPatient';
import Popup from './components/Popup';
import Quickentry from './components/Quickentry';
import Scheduled from './components/Scheduled';
import Upcoming from './components/Upcoming';



// src/index.js or src/main.js

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<NewAppointment />} />
      <Route path='/appointment' element={<Appointment />} />
      <Route path='/newpatient' element={<NewPatient />} />
      <Route path='/popup' element={<Popup />} />
      <Route path='/quickentry' element={<Quickentry />} />
      <Route path='/scheduled' element={<Scheduled/>} />
      <Route path='/upcoming' element={<Upcoming/>} />
    
      </Routes>
      </BrowserRouter>
  
  );
};

export default App;


