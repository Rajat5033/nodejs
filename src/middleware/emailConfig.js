import nodmailer from 'nodemailer';
// import envconfig from '../config/envConfig.js';

const transporter = nodmailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth: {
        user:'rajat.technogetics@gmail.com',
        pass:'eikfrdtqhxgjtvna',
    },
})
export default transporter;