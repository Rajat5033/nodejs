import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    fullName: { type: String, require: true },
    email: { type: String, require: false },
    password: { type: String, require: false },
    confirmPassword: { type: String, require: false },
    contactNo: { type: Number, require: false },
    address: { type: String, require: false }
})

const userData = mongoose.model('UserData', userSchema);
export default userData;
