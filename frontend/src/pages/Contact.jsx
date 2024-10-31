import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-[#707070]'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-10 mb-28 text-sm'>
        {/* Image aligned to the left */}
        <div className='flex justify-start'>
          <img className='w-full md:max-w-[400px]' src={assets.contact_image} alt="Contact Us" />
        </div>

        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-gray-600'>OUR OFFICE</p>
          <p className='text-gray-500'>Buganda Road <br /> Kampala, Uganda</p>
          <p className='text-gray-500'>Tel: +256761023233 <br /> Email: <a href="mailto:medic@gmail.com" className="text-blue-500 hover:underline">medic@gmail.com</a></p>
          <p className='font-semibold text-lg text-gray-600'>CAREERS AT MedicHospital</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
