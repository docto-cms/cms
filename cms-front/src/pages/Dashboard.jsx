import React from 'react'
import Banner from '../components/dashboard/Banner'
import Appointment from '../components/dashboard/Appointment'
import AppointmentGraph from '../components/dashboard/AppointmentGraph'
import PatientGraph from '../components/dashboard/PatientGraph'
import Rechart from "../components/dashboard/Rechart"
import AppointmentChart from "../components/dashboard/AppointmentChart"
import AppointmentAreaChart from '@/components/dashboard/AppointmentAreaChart'


export default function Dashboard() {
  
  return (
    <div className=' w-full'>
       <Banner/>
       {/* <Appointment/> */}
       {/* <div className='flex'><Rechart/>
       <AppointmentChart/></div> */}
       <div className='flex space-x-2 '><PatientGraph/>
       <AppointmentAreaChart/>
      </div>
       
       {/* <AppointmentGraph/>   */}
    </div>
  )
}
