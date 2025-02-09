import React from 'react'
import Banner from '../components/dashboard/Banner'
import Appointment from '../components/dashboard/Appointment'
import AppointmentGraph from '../components/dashboard/AppointmentGraph'
import PatientGraph from '../components/dashboard/PatientGraph'



export default function Dashboard() {
  return (
    <div className='p-5'>
       <Banner/>
       <Appointment/>
       <PatientGraph/>
       <AppointmentGraph/>
      
    </div>
  )
}
