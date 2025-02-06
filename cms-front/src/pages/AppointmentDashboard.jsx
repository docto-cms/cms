import AppointmentBanner from '@/components/Appointment/AppointmentBanner'
import AppointmentCalender from '@/components/Appointment/AppointmentCalender'
import AppointmentTable from '@/components/Appointment/AppointmentTable'
import DoctorList from '@/components/Appointment/DoctorList'
import MyCalendar from '@/components/Big-calender'
import React from 'react'

export default function AppointmentDashboard() {
  return (
    <div className='flex flex-col'>
      <div className='flex'>
        <AppointmentBanner/>
      </div>

      <div className='flex flex-1 gap-4 p-4'>
        <DoctorList className='flex-1'/>
        {/* <AppointmentCalender className='flex-1'/> */}
        <MyCalendar/>
        <AppointmentTable className='flex-1'/>
      </div>
    </div>
  )
}
