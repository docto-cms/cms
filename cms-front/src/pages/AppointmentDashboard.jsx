import AppointmentBanner from '@/components/Appointment/AppointmentBanner'
import AppointmentTable from '@/components/Appointment/AppointmentTable'
import DoctorList from '@/components/Appointment/DoctorList'
import MyCalendar from '@/components/Big-calender'
import React, { useState } from 'react'

export default function AppointmentDashboard() {

  const [id, setId] = useState(1);
  


  return (
    <div className='flex flex-col'>
      <div className='flex'>
        <AppointmentBanner />
      </div>

      <div className='flex flex-1 gap-4 p-4'>
        <DoctorList id={id} setId={setId} className='flex-1'/>
        <AppointmentTable id={id} className='flex-1'/>
        <MyCalendar id={id}/>
      </div>
    </div>
  )
}
