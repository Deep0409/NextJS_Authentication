import mongoose from "mongoose";

const userSchema=mongoose.Schema({

    username:{
        type:String,
        required:[true,"Please Provide the username"],
        unique:true
    },

    email:{
        type:String,
        required:[true,"Please Provide the email"],
        unique:true
    },

   password:{
        type:String,
        required:[true,"Please Provide the password"],
    },

    isVerified:{
        type:Boolean,
        default:false
    },

    isAdmin:{
        type:Boolean,
        default:false
    },

    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date,
})

const User=mongoose.models.users || mongoose.model("user",userSchema);

export default User;