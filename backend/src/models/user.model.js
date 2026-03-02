import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        username:{
                type: String,
                required: true,
                unique:[true,"username already exists"]
        },
        email:{
                type: String,
                required: true,
                unique:[true,"account already exists with this email"]
        },
        password:{
                type: String,
                required: true,
                minLength:[6,"password should be at least 6 characters long"]  
        }
},{
        timestamps:true
})

const userModel = mongoose.model("User",userSchema)

export default userModel