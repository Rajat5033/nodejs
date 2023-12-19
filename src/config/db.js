import mongoose from "mongoose";
import envconfig from "./envConfig.js";

mongoose.connect(
    envconfig.DB_URL
    
)
    .then(() => {
        console.log(`Database is connected`)
    })
    .catch(() => {
        console.log("Database is not connected")
    })