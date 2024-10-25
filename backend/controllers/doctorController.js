import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import doctorModel from "../models/doctorModel.js";
import AppointmentModel from "../models/AppointmentModel.js";

//API for doctor login

const loginDoctor = async (req, res) => {
    try{
        const{ email, password }= req.body

        //finding the doctor by their email
        const user = await doctorModel.findOne({ email})

        //checking for the user existence in the database
        if(!user) {
            return res.json({success: false, message: "Invalid Credentials"})
        }
         //Password comparison with that in the database
        const passwordMatch = await bcrypt.compare(password, user.password)

        //generation of a jsonweb token if passwordMatch is true

        if(passwordMatch) {
            const token = jwt.sign( { id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h' })
            res.status(200).json({ success: true, token})
        }else{
            res.status(401).json({ success: false, message: "Invalid Credentials"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server error, please try again later"});
    }
}
// API to get doctor appointments for doctor panel

const appointmentsDoctor = async (req, res) => {
        try {
            const{ docId } = req.body
            const appointments = await AppointmentModel.find({ docId })
            res.json({success: true, appointments})
        }catch(error){
            console.log(error)
            res.json({ success: false, message: error.message})
        }
}


//API to cancel appointment for doctor panel
const appointmentCancel = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body

        const appointmentData = await AppointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId){
            await AppointmentModel.findByIdAndUpdae(appointmentId, { cancelled: true})
            return res.json({ success: true, message: 'Appointment cancelled'})
        }

        res.json({ success: false, message: 'Appointment Cancelled'})
        
        } catch (error){
            console.log(error)
            res.json({ success: false, message: error.message})
        }
    }

    // API to mark appointment completed for doctor panel
    const appointmentComplete = async (req, res) => {
        try {
    
            const { docId, appointmentId } = req.body
    
            const appointmentData = await AppointmentModel.findById(appointmentId)
            if (appointmentData && appointmentData.docId === docId) {
                await AppointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
                return res.json({ success: true, message: 'Appointment Completed' })
            }
    
            res.json({ success: false, message: 'Appointment Cancelled' })
    
        } catch (error) {
            console.log(error)
            res.json({ success: false, message: error.message })
        }
    
    }

    // API to get all doctors list for Frontend
    const doctorList = async (req, res) => {
        try {
    
            const doctors = await doctorModel.find({}).select(['-password', '-email'])
            res.json({ success: true, doctors })
    
        } catch (error) {
            console.log(error)
            res.json({ success: false, message: error.message })
        }
    
    }

    //API to change availability for Admin and Doctor Panel
    const changeAvailablity = async (req, res) => {
        try {
    
            const { docId } = req.body
    
            const docData = await doctorModel.findById(docId)
            await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
            res.json({ success: true, message: 'Availablity Changed' })
    
        } catch (error) {
            console.log(error)
            res.json({ success: false, message: error.message })
        }
    }

    // API to get doctor profile for  Doctor Panel
const doctorProfile = async (req, res) => {
    try {

        const { docId } = req.body
        const profileData = await doctorModel.findById(docId).select('-password')

        res.json({ success: true, profileData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//API to update doctor profile data from  Doctor Panel
const updateDoctorProfile = async (req, res) => {
    try {

        const { docId, fees, address, available ,about, name, degree,experience} = req.body

        await doctorModel.findByIdAndUpdate(docId, { fees, address, available,about, name, degree,experience })

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
    try {

        const { docId } = req.body

        const appointments = await AppointmentModel.find({ docId })

        let earnings = 0

        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let patients = []

        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })



        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse()
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



export{
    loginDoctor,
    appointmentsDoctor,
    appointmentCancel,
    appointmentComplete,
    doctorList,
    changeAvailablity,
    doctorProfile,
    updateDoctorProfile,
    doctorDashboard

}