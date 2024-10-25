import express from 'express';
import{loginAdmin, AppointmentsAdmin, AppointmentCancel,  addDoctor, allDoctors, AdminDashboard} from '../controllers/adminController.js';
import upload from '../middleware/multer.js';
import authAdmin from '../middleware/authAdmin.js';
import { changeAvailablity } from '../controllers/doctorController.js';


//Router creation
const adminRouter = express.Router();

adminRouter.post("/change-availability", authAdmin, changeAvailablity)
adminRouter.post("/login", loginAdmin)
adminRouter.get("/appointments", authAdmin, AppointmentsAdmin)
adminRouter.post("/cancel-appointment", authAdmin, AppointmentCancel)
adminRouter.post("/add-doctor", authAdmin, upload.single('image'), addDoctor)
adminRouter.get("/all-doctors", authAdmin, allDoctors)
adminRouter.get("/dashboard", authAdmin, AdminDashboard)

export default adminRouter;