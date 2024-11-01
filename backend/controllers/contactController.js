import contactModel from "../models/contactModel.js"; 
import validator from "validator";


const Contact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Checking for all required data to submit the contact form
    if (!name || !email || !message) {
      return res.json({ success: false, message: 'Missing Details' });
    }

    // Validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Please enter a valid email' });
    }

    // Validating message length
    if (message.length < 10) {
      return res.json({ success: false, message: 'Message must be at least 10 characters long' });
    }

    // Create a new contact entry
    const newContact = new contactModel({ name, email, message });

    // Save to the database
    await newContact.save();

    return res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error saving contact:', error);
    return res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
};


export { Contact };
