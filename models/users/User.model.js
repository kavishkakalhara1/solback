import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    
    
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
   
    email: {
        type: String,
        required: true
    },
    
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", UserSchema);

export default User;