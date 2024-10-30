import express from "express"
import { registerUser, loginUser,  getProfile,updateProfile, cancelAppointment,listAppointment,bookAppointment} from "../controllers/userController.js"
import upload from '../middleware/multer.js';
import authUser from '../middleware/authUser.js';

const userRouter = express.Router();



/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Missing details or invalid email format
 */

userRouter.post("/register", registerUser)

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid credentials
 */
userRouter.post("/login", loginUser)
/**
 * @swagger
 * /user/get-profile:
 *   get:
 *     summary: Get user profile data
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data retrieved successfully
 *       401:
 *         description: Unauthorized action
 */
userRouter.get("/get-pofile", authUser, getProfile)

/**
 * @swagger
 * /user/update-profile:
 *   post:
 *     summary: Update user profile
 *     tags: [Users]
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
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               dob:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Data missing
 */
userRouter.post("/update-profile",  authUser, upload.single('image'), updateProfile)

/**
 * @swagger
 * /user/appointments:
 *   get:
 *     summary: List user appointments
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Appointments retrieved successfully
 *       401:
 *         description: Unauthorized action
 */
userRouter.get("/appointments",  authUser, listAppointment)

/**
 * @swagger
 * /user/cancel-appointment:
 *   post:
 *     summary: Cancel an appointment
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               appointmentId:
 *                 type: string
 *             required:
 *               - userId
 *               - appointmentId
 *     responses:
 *       200:
 *         description: Appointment cancelled successfully
 *       400:
 *         description: Unauthorized action
 */
userRouter.post("/cancel-appointment",  authUser, cancelAppointment)

/**
 * @swagger
 * /user/book-appointment:
 *   post:
 *     summary: Book an appointment
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               docId:
 *                 type: string
 *               slotDate:
 *                 type: string
 *               slotTime:
 *                 type: string
 *             required:
 *               - userId
 *               - docId
 *               - slotDate
 *               - slotTime
 *     responses:
 *       200:
 *         description: Appointment booked successfully
 *       400:
 *         description: Error booking appointment
 */
userRouter.post("/book-appointment",  authUser, bookAppointment)
export default userRouter;