import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import doctorModel from "../models/doctorModel";
import AppointmentModel from "../models/AppointmentModel";

//API for doctor login

const loginDoctor = async (req, res) => {
    try{
        const{ email, password }= req.body
        const user = await doctorModel.findOne({ email})

        if(!user) {
            return res.json({success: false, message: "Invalid Credentials"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch) {
            const token = jwt.sign( { id: user._id}, process.env.JWT_SECRET)
            res.json({ success: true, token})
        }else{
            res.json({ success: false, message: "Invalid Credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message})
    }
}


export{
    loginDoctor
}