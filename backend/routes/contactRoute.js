import express from 'express';
import{Contact} from '../controllers/contactController.js';

//Route creation
const contactRouter = express.Router();
contactRouter.post("/contact", Contact)
export default contactRouter;
