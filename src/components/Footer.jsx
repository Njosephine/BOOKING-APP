import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm'>

        <div>
          <img className='mb-5 w-14 rounded-full' src={assets.logo} alt="" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
PrimeCare General Hospital is dedicated to providing top-tier healthcare services to the community. 
With a legacy rooted in excellence, PrimeCare has become a trusted name in the medical field. 
From routine check-ups to specialized treatments, we offer comprehensive care tailored to each patient’s needs. 
Our experienced medical professionals and state-of-the-art facilities ensure that you receive the highest standard of care, every time.
          </p>
          
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+256 75161 2501</li>
            <li>rogerskalema0@gmail.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024 @ PrimeCare General Hospital.com - All Right Reserved.</p>
      </div>

    </div>
  )
}

export default Footer
