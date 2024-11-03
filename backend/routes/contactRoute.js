import express from 'express';
import{Contact, GetMessage} from '../controllers/contactController.js';

//Route creation
const contactRouter = express.Router();
contactRouter.post("/contact", Contact)
contactRouter.get("/message", GetMessage)
export default contactRouter;
