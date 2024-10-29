import express from "express"
import { registerUser, loginUser,  getProfile,updateProfile, cancelAppointment,listAppointment,bookAppointment} from "../controllers/userController.js"
import upload from '../middleware/multer.js';
import authUser from '../middleware/authUser.js';

const userRouter = express.Router();

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/get-pofile", authUser, getProfile)
userRouter.post("/update-profile",  authUser, upload.single('image'), updateProfile)
userRouter.get("/appointments",  authUser, listAppointment)
userRouter.post("/cancel-appointment",  authUser, cancelAppointment)
userRouter.post("/book-appointment",  authUser, bookAppointment)
export default userRouter;