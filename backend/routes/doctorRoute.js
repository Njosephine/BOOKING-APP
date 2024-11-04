import express from "express";
import { loginDoctor,  appointmentsDoctor,  appointmentCancel, appointmentComplete, doctorList, changeAvailablity,doctorProfile,updateDoctorProfile,doctorDashboard} from "../controllers/doctorController.js";
import authDoctor from "../middleware/authDoctor.js";

//Route creation
const doctorRouter = express.Router();



/**
 * @swagger
 * /doctor/login:
 *   post:
 *     summary: Login doctor
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */

doctorRouter.post("/login",loginDoctor);
/**
 * @swagger
 * /doctor/appointments:
 *   get:
 *     summary: Get all appointments
 *     description: Retrieve all appointments for doctor management.
 *     tags:
 *       - Doctors
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all appointments.
 *       401:
 *         description: Unauthorized access.
 */
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor);

/**
 * @swagger
 * /doctor/cancel-appointment:
 *   post:
 *     summary: Cancel appointment
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               docId:
 *                 type: string
 *               appointmentId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Appointment cancelled
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Server error
 */
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);
/**
 * @swagger
 * /doctor/complete-appointment:
 *   post:
 *     summary: Mark appointment as completed
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               docId:
 *                 type: string
 *                 description: The ID of the doctor
 *               appointmentId:
 *                 type: string
 *                 description: The ID of the appointment to be marked as completed
 *     responses:
 *       200:
 *         description: Appointment marked as completed
 *         
 *       404:
 *         description: Appointment not found
 *         
 *       401:
 *         description: Unauthorized access
 *         
 *       500:
 *         description: Server error
 *        
 */


doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete );

/**
 * @swagger
 * /doctor/change-availability:
 *   post:
 *     summary: Change the availability status of a doctor
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               docId:
 *                 type: string
 *                 description: The ID of the doctor whose availability status is to be changed
 *             required:
 *               - docId
 *     responses:
 *       200:
 *         description: Availability status changed successfully
 *       
 *       400:
 *         description: Bad request, invalid doctor ID
 *         
 *       401:
 *         description: Unauthorized, doctor not authenticated
 *         
 *       500:
 *         description: Internal server error
 *        
 */

doctorRouter.post("/change-availability", authDoctor, changeAvailablity);

/**
 * @swagger
 * /doctor/list:
 *   get:
 *     summary: Get list of doctors
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of doctors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 doctors:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Server error
 */
doctorRouter.get("/list", doctorList);

/**
 * @swagger
 * /doctor/profile:
 *   get:
 *     summary: Get doctor's profile
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Doctor profile data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 profileData:
 *                   type: object
 *       500:
 *         description: Server error
 */
doctorRouter.get("/profile", authDoctor, doctorProfile);

/**
 * @swagger
 * /doctor/update-profile:
 *   post:
 *     summary: Update doctor's profile
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               docId:
 *                 type: string
 *               fees:
 *                 type: number
 *               address:
 *                 type: string
 *               available:
 *                 type: boolean
 *               about:
 *                 type: string
 *               name:
 *                 type: string
 *               degree:
 *                 type: string
 *               experience:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile);

/**
 * @swagger
 * /doctor/dashboard:
 *   get:
 *     summary: Get dashboard data for the doctor
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 dashData:
 *                   type: object
 *       500:
 *         description: Server error
 */
doctorRouter.get("/dashboard", authDoctor, doctorDashboard)
export default doctorRouter;