import React, { useContext } from 'react';
import { DoctorContext } from './context/DoctorContext';
import { AdminContext } from './context/AdminContext';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import Login from './pages/Login';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import AdminContactMessages from './pages/Admin/AdminContactMessage';

const App = () => {
  const { dToken } = useContext(DoctorContext);
  const { aToken } = useContext(AdminContext);

  return dToken || aToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Navigate to="/login" />} /> {/* Redirect to dashboard */}
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllAppointments />} />
          <Route path='/add-doctor' element={<AddDoctor />} />
          <Route path='/doctor-list' element={<DoctorsList />} />
          <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
          <Route path='/doctor-appointments' element={<DoctorAppointments />} />
          <Route path='/doctor-profile' element={<DoctorProfile />} />
          <Route path='/message' element={<AdminContactMessages />} />
          <Route path='/login' element={<Login />} /> 
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <ToastContainer />
     
    </>
  );
};

export default App;
