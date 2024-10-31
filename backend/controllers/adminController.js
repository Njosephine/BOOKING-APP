import jwt from "jsonwebtoken";
import AppointmentModel from "../models/AppointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import UserModel from "../models/UserModel.js";
import validator from "validator";


// API for Admin login

const loginAdmin = async (req, res) => {
    try{
        //Logic that checks credentials and generates the Json Web Token for Authentication
        const{ email, password} = req.body
        
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(
                {email: process.env.ADMIN_EMAIL, role: 'admin' }, 
                process.env.JWT_SECRET, 
                { expiresIn: '1h' }
            );
            res.status(200).json({ success: true, token })
        }else {
            res.status(401).json({success: false, message: "Invalid credentials"})
        }

    }catch(error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.messaage})
    }
}

//API to get all appointment lists


// Logic for fetching and retrning the appointment data for the admin
const AppointmentsAdmin = async (req, res) => {
    try {
         //await ensures that the fuction waits for all appointments to be returned before moving to the next step 
        const appointments = await AppointmentModel.find({})
        res.json({success: true, appointments})
    }catch (error) {
        //incase of any issues  the error is logged to the console for debugging
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// API for Appointment cancellation

const AppointmentCancel = async (req, res) => {
    try {
        const { appointmentId } =req.body
        await AppointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true})
        res.json({success: true, message: 'Appointments cancelled  successfully'})
    }catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//API for deleting doctors
const deleteDoctor = async (req, res) => {
    try {
        const{ doctorId } = req.params
        await doctorModel.findByIdAndDelete(doctorId)
        res.json({success: true, message: 'Doctor deleted successfully'})
    }catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//API for adding Doctors
const addDoctor = async (req, res) => {
    try{
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file
        // checking for all data to add doctor
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" })
        }
        
        // Checking for image availability

        if(!imageFile){
              return res.json({success: false, message: "Image file is required"})
        }

         // validating email format by use of the validator library 
         if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }
        
        // hashing user password
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        const doctorData ={
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            experience,
            degree,
            about,
            fees,
            address:JSON.parse(address),
            date: Date.now()

        }
        //creation of an instance of a doctorModel using the data contained in the DoctorData object 
        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()
        res.json({ success: true, message: 'Doctor Added' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//API to get all doctors

const allDoctors = async (req, res) => {
    try {
        //retrieve all fields for doctors but exclude the password
        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctors})
    }catch(error) {
        console.log(error)
        res.json({ success: false, message: error.message})
    }
}

//API to get dashboard data for the admin panel
const AdminDashboard = async (req, res) =>{
    try {
        const doctors = await doctorModel.find({})
        const users = await UserModel.find({})
        const appointments = await AppointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patints: users.length,
            //reverses the appointments array to show the latest appointments
            latestAppointments: appointments.reverse()
        }

        res.json({success: true, dashData})
    } catch(error){
        console.log(error)
        res.json({ success: false, message: error.message})
    }
}
         
    
    


export{
    loginAdmin,
    AppointmentsAdmin,
    AppointmentCancel,
    addDoctor,
    allDoctors,
    AdminDashboard,
    deleteDoctor
}

