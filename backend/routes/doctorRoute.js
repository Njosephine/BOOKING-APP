import express from "express";
import { loginDoctor,  appointmentsDoctor,  appointmentCancel, appointmentComplete, doctorList, changeAvailablity,doctorProfile,updateDoctorProfile,doctorDashboard} from "../controllers/doctorController.js";
import authDoctor from "../middleware/authDoctor.js";

//Route creation
const doctorRouter = express.Router();

doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor);
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete );
doctorRouter.post("/change-availability", authDoctor, changeAvailablity);
doctorRouter.get("/list", authDoctor, doctorList);
doctorRouter.get("/profile", authDoctor, doctorProfile);
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile);
doctorRouter.get("/dashboard", authDoctor, doctorDashboard)
export default doctorRouter;