import express from 'express'
import { userNewRegister, getAllUser, getUserById, UpdateUserById, deleteUserById, loginByEmail, sendEmail, resetPassword, changePassword} from '../controllers/userController.js';
import { authMiddleWare } from '../middleware/authMiddleWare.js';


const router =express();

//register router
router.post('/register',userNewRegister);

//login by email
router.post('/login', loginByEmail);

//get all users
router.get('/getallusers',authMiddleWare,getAllUser);

//get user by id
router.get('/getuserbyId',authMiddleWare,getUserById)

//updateuser by id
router.post('/update',authMiddleWare, UpdateUserById)

//delete user by Id
router.delete('/delete', deleteUserById)

//for send-mail
router.post('/sendEmail', sendEmail);

//reset password
router.post('/resetPassword', resetPassword) 

//change password
router.post('/changePassword/:_id',authMiddleWare, changePassword) 


export default router