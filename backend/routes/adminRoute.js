import express from 'express';
import{loginAdmin, AppointmentsAdmin, AppointmentCancel,  addDoctor, allDoctors, AdminDashboard, deleteDoctor} from '../controllers/adminController.js';
import upload from '../middleware/multer.js';
import authAdmin from '../middleware/authAdmin.js';
import { changeAvailablity } from '../controllers/doctorController.js';


//Router creation
const adminRouter = express.Router();

/**
 * @swagger
 * /admin/change-availability:
 *   post:
 *     summary: Change doctor availability
 *     description: Allows an admin to change the availability of a doctor.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               doctorId:
 *                 type: string
 *               available:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Availability status updated successfully.
 *       401:
 *         description: Unauthorized access.
 */

adminRouter.post("/change-availability", authAdmin, changeAvailablity)

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin login
 *     description: Logs an admin in and provides a JSON Web Token for authentication.
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Admin email
 *               password:
 *                 type: string
 *                 description: Admin password
 *     responses:
 *       200:
 *         description: Login successful, returns token.
 *       401:
 *         description: Invalid credentials.
 */
adminRouter.post("/login", loginAdmin)

/**
 * @swagger
 * /admin/appointments:
 *   get:
 *     summary: Get all appointments
 *     description: Retrieve all appointments for admin management.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all appointments.
 *       401:
 *         description: Unauthorized access.
 */

adminRouter.get("/appointments", authAdmin, AppointmentsAdmin)

/**
 * @swagger
 * /admin/cancel-appointment:
 *   post:
 *     summary: Cancel an appointment
 *     description: Allows an admin to cancel an appointment.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               appointmentId:
 *                 type: string
 *                 description: The ID of the appointment to cancel.
 *     responses:
 *       200:
 *         description: Appointment cancelled successfully.
 *       401:
 *         description: Unauthorized access.
 */
adminRouter.post("/cancel-appointment", authAdmin, AppointmentCancel)


/**
 * @swagger
 * /admin/add-doctor:
 *   post:
 *     summary: Add a new doctor
 *     description: Allows an admin to add a new doctor with required details and an image.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               speciality:
 *                 type: string
 *               degree:
 *                 type: string
 *               experience:
 *                 type: integer
 *               about:
 *                 type: string
 *               fees:
 *                 type: number
 *               address:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Doctor added successfully.
 *       400:
 *         description: Missing details or validation error.
 *       401:
 *         description: Unauthorized access.
 */
adminRouter.post("/add-doctor", authAdmin, upload.single('image'), addDoctor)

/**
 * @swagger
 * /admin/all-doctors:
 *   get:
 *     summary: Get all doctors
 *     description: Retrieve a list of all registered doctors.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all doctors.
 *       401:
 *         description: Unauthorized access.
 */
adminRouter.get("/all-doctors", authAdmin, allDoctors)

/**
 * @swagger
 * /admin/dashboard:
 *   get:
 *     summary: Get admin dashboard data
 *     description: Retrieve statistical data for the admin dashboard, including counts of doctors, patients, and appointments.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully.
 *       401:
 *         description: Unauthorized access.
 */
adminRouter.get("/dashboard", authAdmin, AdminDashboard)


adminRouter.delete("/delete-doctor", deleteDoctor)

export default adminRouter;