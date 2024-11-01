import React, { useState } from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:4000/api/contact/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors(errorData.errors); 
      } else {
        console.log('Form submitted successfully!');
        
        setSuccessMessage('Your message has been sent successfully!'); 
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 py-10 px-6">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-5xl w-full">
        <div className="md:w-1/2">
          <img src={assets.contact_us} alt="Contact Us" className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none" />
        </div>
        <div className="p-8 md:w-1/2">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">CONTACT US</h2>
          {successMessage && <p className="text-red-500 text-sm mb-4">{successMessage}</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your Name"
                className="w-full border-b border-gray-300 focus:border-blue-300 outline-none p-2 text-sm"
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>
            <div>
              <label className="text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter a valid email address"
                className="w-full border-b border-gray-300 focus:border-blue-300 outline-none p-2 text-sm"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>
            <div>
              <label className="text-gray-600">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                className="w-full border-b border-gray-300 focus:border-blue-300 outline-none p-2 text-sm"
              />
              {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" required />
              <label className="text-gray-600">I accept the <span className="text-blue-500 cursor-pointer">Terms of Service</span></label>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full ${isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white font-semibold py-2 rounded transition duration-300`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>

      {/* Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 w-full max-w-5xl">
        <div className="flex flex-col items-center bg-blue-500 text-white py-6 rounded-lg shadow">
          <img src={assets.contact_icon} alt="Location Icon" className="w-8 h-8 mb-2" /> 
          <div className="text-1xl">CALL US</div>
          <p>+256753972571,<br /> +256761023233</p>
        </div>
        <div className="flex flex-col items-center bg-blue-500 text-white py-6 rounded-lg shadow">
          <img src={assets.location} alt="Location Icon" className="w-8 h-8 mb-2" /> 
          <div className="text-1xl">LOCATION</div>
          <p>Kampala Road,<br /> Kampala, Uganda</p>
        </div>
        <div className="flex flex-col items-center bg-blue-500 text-white py-6 rounded-lg shadow">
          <img src={assets.clock} alt="Location Icon" className="w-8 h-8 mb-2" /> 
          <div className="text-1xl">HOURS</div>
          <p>Mon - Fri .....  6 am - 8 pm,<br /> Sat, Sun ..... 8am - 8 pm</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
