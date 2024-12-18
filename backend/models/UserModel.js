import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
     name: {type: String, required: true},
     email: {type:   String,  required: true, unqiue: true},
     phone: {type: String, default: '000000000'},
     image: {type: String, default: ''},        
     

     address: {type: Object, default: { line1: '' ,line2: ''}},
     gender: {type: String, default: 'Not Selected'},
     dob: {type: String, default: 'Not Selected'},
     password: {type: String, required: true},
})

const UserModel = mongoose.models.user || mongoose.model("user", userSchema)
export default UserModel;