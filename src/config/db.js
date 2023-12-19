import mongoose from "mongoose";

mongoose.connect(
    `mongodb+srv://rajattechnogetic:rajattechnogetic@cluster0.avm2you.mongodb.net/?retryWrites=true&w=majority`
)
    .then(() => {
        console.log(`Database is connected`)
    })
    .catch((error) => {
        console.log("Database is not connected", error)
    })