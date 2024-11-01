import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-[#707070]'>
        <p>ABOUT <span className='text-gray-500 font-semibold'>US</span></p>
      </div>

      <div className='flex flex-col md:flex-row items-start gap-12 md:gap-16'>
    <img className=' md:max-w-[360px]  h-[400px] object-cover' src={assets.doc3} alt="" />
    <div className='flex flex-col justify-start gap-3 md:w-2/4 text-lg text-gray-700 md:pt-2'>
        <p className='leading-relaxed'>
            Welcome to MedicHospital, your reliable partner in healthcare. We simplify appointment booking and health record management, ensuring a seamless experience for all patients.
        </p>
        <b className='text-gray-500 text-xl'>Our Mission</b>
        <p className='leading-relaxed'>
            Our mission is to bring cutting-edge healthcare solutions to your fingertips. MedicHospital is dedicated to providing an enhanced experience with top-notch support at every stage of care.
        </p>
        <b className='text-gray-500 text-xl'>Our Vision</b>
        <p className='leading-relaxed'>
            Our vision is to streamline healthcare and bridge the gap between patients and providers, offering accessible, timely, and compassionate care for everyone.
        </p>
        <p className='leading-relaxed'>
            With a team of experts and state-of-the-art technology, MedicHospital is committed to continuously improving healthcare delivery, ensuring a healthier, happier future for all.
        </p>
    </div>
</div>



      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>EFFICIENCY:</b>
          <p>Easy scheduling to fit your lifestyle.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>CONVENIENCE:</b>
          <p>Access trusted healthcare providers near you.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>PERSONALIZATION:</b>
          <p>Custom reminders and health tips to keep you on track.</p>
        </div>
      </div>

    </div>
  )
}

export default About
