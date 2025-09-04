import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config ()

const connectDB = async ()=>{
    try {
       const db = await mongoose.connect (process.env.MONGODB_URI) 
       console.log ("Data is connection successfully !")
    }
    catch (err) {
       console.log (`Database error ${err}`)
       process.exit (1)
    }
}

export default connectDB