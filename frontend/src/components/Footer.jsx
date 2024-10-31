import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm bg-gray-100 p-5 rounded-lg'>

        <div>
          <img className='w-20' src={assets.logo} alt="" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
          Medic Hospital provides high-quality, patient-centered healthcare with a focus on excellence and compassion.<br/> 
          Our skilled medical team and advanced facilities deliver a full spectrum of services to meet each patient’s needs.</p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li><Link to= '/'>Home</Link></li>
            <li><Link to= '/about'>About us</Link></li>
            <li><Link to= '/doctors'>All Doctors</Link></li>
            <li><Link to= '/contact'>Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+25676123233</li>
            <li> <a href="https://mail.google.com/mail/?view=cm&fs=1&to=medic@gmail.com" target="_blank"
                          rel="noopener noreferrer" >
                         medic@gmail.com
            </a></li>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024 @Medic.com - All Right Reserved.</p>
      </div>

    </div>
  )
}

export default Footer
