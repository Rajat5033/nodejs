import * as dotenv from 'dotenv'
dotenv.config();

const envconfig = {
    PASS_CODE : process.env.appPassword,
    SECRET_KEY :process.env.secretKey,
    EMAIL_FROM: process.env.emailFrom,
    EMAIL_USER: process.env.emailUser,
    EMAIL_HOST: process.env.emailHost,
    EMAIL_PORT: process.env.emailPort,
    API_KEY:process.env.api_Key,
    API_SECRET:process.env.api_secret,
    CLOUD_NAME:process.env.cloud_name,
}


export default envconfig;
