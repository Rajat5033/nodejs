import userData from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validateEmail } from "../utils/validation.js";
import { validatePassword } from "../utils/validation.js";
import { validateContactNo } from "../utils/validation.js";
// import envconfig from "../config/envConfig.js";
import transporter from "../middleware/emailConfig.js";


//register user
const userNewRegister = async (req, res) => {
    try {
        const { fullName, email, password, confirmPassword, contactNo, address } = req.body;

        if (!fullName || !email || !password || !confirmPassword || !contactNo || !address) {
            return res.status(404).json({ message: "All fields are required" });
        }

        const findUserEmail = await userData.findOne({ email });
        if (findUserEmail) {
            return res.status(402).json({ message: "This email is already registered,please try another one" });

        }

        const isEmailValid = validateEmail(email)
        if (!isEmailValid) {
            return res.status(404).json({ message: "Please enter valid data" })
        }

        const isPasswordValid = validatePassword(password)
        if (!isPasswordValid) {
            return res.status(404).json({ message: "please enter minimum 8 characters" })
        }

        const isContactNo = validateContactNo(contactNo)
        if (!isContactNo) {
            return res.status(404).json({ message: "please enter your 10 digit contact no" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newDoc = new userData({
            fullName,
            email,
            password: hashPassword,
            confirmPassword,
            contactNo,
            address
        });
        const saveUser = newDoc.save();
        if (saveUser) {
            return res.status(200).json({ message: "User registered succesfully" });
        } else {
            return res.status(400).json({ message: "User not register" });
        }
    } catch (error) {
        console.error("error in user registration");
        return res.status(500).json({ message: "error in user registration" });
    }
};

//login by user id

const loginByEmail = async (req, res) => {
    try {
        const { email, password } = req.body;
        const loginEmail = await userData.findOne({ email });
        if (!loginEmail) {
            return res.status(404).json({ message: "User not found" })
        }

        const passwordVerify = await bcrypt.compare(password, loginEmail.password);
        if (!passwordVerify) {
            return res.status(404).json({ message: "Wrong Password" })
        }

        const token = jwt.sign({
            _id: loginEmail._id,
            email: loginEmail.email,
            password: loginEmail.password
        }, 'a1a2s3d4f5g6hj7k8l9', {
            expiresIn: "1h"
        });
        let userInfo = {
            token: token
        }

        return res.status(201).json({ message: "Login Sucsessfully", userInfo });
    }

    catch (error) {
        return res.status(500).json({ message: "login failed", error })
    }

}

//get all users

const getAllUser = async (req, res) => {
    try {
        const getUser = await userData.find({});
        if (!getUser) {
            return res.status(404).json({ message: "Data not found" });
        }
        else {
            return res.status(200).json({ message: "Data found", getUser });
        }
    } catch (error) {
        console.error('Error in get user');
        return res.status(500).json({ message: "Error in getting data", error });

    }
}


//get user by id

//const getUserById = async (req, res) => {
// const { _id } = req.params
//     try {
//         const getUserId = await userData.findById({ _id: _id });
//         if (!getUserId) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         else {
//             return res.status(200).json({ message: "User found", getUserId });
//         }
//     } catch (error) {
//         // console.error('Error in getting Data');
//         return res.status(500).json({ message: "Error in getting data", error });
//     }
// }

const getUserById = async (req, res) => {

    try {
        const token = req.header('Authorization')?.split(' ')[1];
        // console.log(token)

        const decode = jwt.verify(token, 'a1a2s3d4f5g6hj7k8l9')
        // console.log(decode)

        const getUserId = await userData.findById(decode._id);
        console.log(getUserId);
        if (!getUserId) {
            return res.status(404).json({ message: "User not found" });
        }
        else {
            return res.status(200).json({ message: "User found", getUserId });
        }
    } catch (error) {
        // console.error('Error in getting Data');
        return res.status(500).json({ message: "Error in getting data", error });
    }
}






//update data by user id

const UpdateUserById = async (req, res) => {
    try {


        // const user = await userData.findById(_id)
        // if(!user){
        //     return res.status(404).json({ message: " user not found" });
        // }
        //Hash password
        // const hashPassword = await bcrypt.hash(password, 10);

        //         const token = req.header('Authorization')?.split('')[1];
        //         console.log(token)
        //         const { fullName, address } = req.body;
        //         const updateUserUpdate = await userData.findByIdAndUpdate({ _id: _id }, { fullName, address }, { new: true });
        //         if (!updateUserUpdate) {
        //             return res.status(404).json({ message: " not found" });
        //         }
        //         else {
        //             return res.status(200).json({ message: "id found", updateUserUpdate });
        //         }
        //     } catch (error) {
        //         // console.error('Error in updating data');
        //         return res.status(500).json({ message: "error in updating data", error });

        //     }
        // }

        // using token

        const token = req.header('Authorization')?.split(' ')[1];
        console.log(token)
        if (!token) {
            return res.status(401).json({ message: "Token is missing" })
        }
        const { fullName, address } = req.body;
        const decode = jwt.verify(token, 'a1a2s3d4f5g6hj7k8l9');
        console.log(decode)
        if (!decode) {
            return res.status(404).json({ message: "Decode not found" })
        }
        const updateUserUpdate = await userData.findByIdAndUpdate(decode._id, { fullName, address }, { new: true });
        return res.status(200).json({ message: "ID found", updateUserUpdate })
    }

    catch (error) {
        return res.status(401).json({ message: "Error in updating data" })
    }

}

// more secure

// const updateUserbyId = async (req, res) => {
//     try {
//         const userId = req.user?._id
//         const { userName, address } = req.body;
//         const updateuser = await Userdata.findByIdAndUpdate(
//             userId, { userName, address },
//             { new: true });
//         if (!updateuser) {
//             return res.status(404).json({ message: 'user cant update' });
//         } else {
//             return res.status(201).json({ message: 'user updated succesfully by id', updateuser })
//         }
//     } catch (error) {
//         console.error("Error in updating user")
//         return res.status(500).json({ message: 'user cannot update by id', error })
//     }
// }

//delete user by id  

// const deleteUserById = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const deleteUserDelete = await userData.findByIdAndDelete(id);

//         if (!deleteUserDelete) {
//             return res.status(404).json({ message: "User not found" });
//         } else {
//             return res.status(200).json({ message: "User deleted successfully", deleteUserDelete });
//         }
//     } catch (error) {
//         console.error('Error in deleting data:', error);
//         return res.status(500).json({ message: "Error in deleting data", error: error.message });
//     }
// }

const deleteUserById = async (req, res) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1];
        console.log(token)
        if (!token) {
            return res.status(404).json({ message: "Token not found" })
        }
        const decode = jwt.verify(token, 'a1a2s3d4f5g6hj7k8l9')
        const deleteUserDelete = await userData.findByIdAndDelete(decode._id)
        return res.status(200).json({ message: "data deleted", deleteUserDelete })
    }

    catch (error) {
        return res.status(401).json({ message: "Error in deleting data" })
    }
}


// get secure data
const secureData = async (req, res) => {
    try {
        const getsecuredata = await userData.find({});
        if (!getsecuredata) {
            return res.status(404).json({ message: "Users  not found" })
        } else {
            return res.status(201).json({ messgae: "Usres found", getsecuredata });
        }
    } catch (error) {
        console.error("Error in User found")
        return res.status(500).json({ message: 'Error in user find', error });
    }
}


//send mail to forget password


const sendEmail = async (req, res) => {
    try {
        const { email } = req.body;
        if (email) {
            const user = await userData.findOne({ email })
            if (!user) {
                return res.status(404).json({ message: "Email not found" });
            } else {
                const genToken = jwt.sign({ _id: user._id }, 'a1a2s3d4f5g6hj7k8l9', { expiresIn: '1h' });
                const link = `http://localhost:3000/reset-password/?token=${genToken}`;
                const sendMail = await transporter.sendMail({
                    from: 'rajat.technogetics@gmail.com',
                    to: email,
                    subject: 'Reset Password',
                    html: `Click here to reset your password <a href= ${link}>click here</a> `
                })
                return res.status(200).json({ message: "Email is sent, please check your email" });
            }
        }
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: "Error in sending email", error });
    }
}
//reset password
const resetPassword = async (req, res) => {
    const { newPassword, confirmPassword } = req.body;
    try {
        const token = req.query.token;
        const decode = jwt.verify(token, 'a1a2s3d4f5g6hj7k8l9');
        const user = await userData.findById(decode._id);
        if (!newPassword) {
            return res.status(400).json({ message: "new passoword is required" });
        }
        if (!confirmPassword) {
            return res.status(400).json({ message: "confirm passoword is required" });
        }
        if (newPassword !== confirmPassword) {
            return res
                .status(500)
                .json({ message: "new password and confirm password are not match" });
        } else {
            const salt = await bcrypt.genSalt(10);
            const newHashPassword = await bcrypt.hash(newPassword, salt);
            user.password = newHashPassword;
            await user.save();
            return res.status(500).json({ message: "Password reset successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error in reset password", error });
    }
};

//change Password

const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;
        const userId = req.user?._id
        const user = await userData.findById(userId)

        // const { _id } = req.params;
        // const user = await userData.findById({ _id: _id })
        // console.log("=====>",user)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const oldPass = await bcrypt.compare(oldPassword, user.password);
        // console.log('======>',oldPass);

        if (!oldPass) {
            return res.status(500).json({ message: "Old password is not matched" })
        }

        if (newPassword !== confirmPassword) {
            return res.status(500).json({ message: "New password is not matched with confirmpassword" })
        }

        const salt = await bcrypt.genSalt(10)
        const newHashPassword = await bcrypt.hash(newPassword, salt)
        // console.log('======>',newHashPassword);
        user.password = newHashPassword;
        const updateNewPassword = await userData.findByIdAndUpdate(_id, { password: newHashPassword }, { new: true });
        return res.status(200).json({ message: "oldPassword is updated", updateNewPassword })
    }
    catch (error) {
        return res.status(500).json({ message: "Error in changing newpassword" })

    }

}



export { userNewRegister, getAllUser, getUserById, UpdateUserById, deleteUserById, loginByEmail, secureData, sendEmail, resetPassword, changePassword }