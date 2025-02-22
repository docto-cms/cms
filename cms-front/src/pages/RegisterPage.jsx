import React from 'react'
import RegisterForm from '../components/RegisterForm'
import bg from '../assets/images/Doctor.jpeg'
export default function RegisterPage() {
  return (
    <div className='h-screen object-fit object-fill ' style={{backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <RegisterForm/>
    </div>
  )
}


