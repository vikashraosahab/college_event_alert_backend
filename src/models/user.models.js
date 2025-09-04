import mongoose from "mongoose";
import { Schema } from "mongoose";

// SCHEMA OF THE DATABASE
const userSchema = new Schema (
    {
        username : {
            type:String,
            required : true
        },
        usermail : {
            type:String,
            required : true,
        },
        userpassword : {
            type : String,
            required : true
        },
        department : {
            type : String,
            required: true
        },
        year : {
            type : Number,
            required : true
        }
    },
    {timestamps : true}
)
// MODEL OF THE DATABASE
const User = mongoose.model ("User",userSchema)

export default User