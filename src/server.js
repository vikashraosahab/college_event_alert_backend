import dotenv from "dotenv"
dotenv.config() 

import { app } from "./routes/app.js"
import connectDB from "./db/index.js"

connectDB()
.then(()=>{
   app.listen(process.env.PORT,()=>{
    console.log (`Server is running on the port ${process.env.PORT}`)
   })
})
.catch(err=>{
    console.log ('Database failed to connect !!!')
})

