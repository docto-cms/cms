import React from 'react'
import LoginForm from '../components/LoginForm'
import bg from '../assets/images/Doctor.jpeg'

export default function LoginPage() {
  return (
    <div className='h-screen object-fit ' style={{backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <LoginForm/>
    </div>
  )
}
