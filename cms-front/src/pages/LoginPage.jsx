import React from 'react'
import LoginForm from '../components/LoginForm'
import bg from '../assets/images/Doctor.png'

export default function LoginPage() {
  return (
    <div className='h-screen  max-w-full ' style={{backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <LoginForm/>
    </div>
  )
}
