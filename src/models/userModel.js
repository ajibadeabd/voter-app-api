
import mongoose from 'mongoose'
const  {Schema,model} = mongoose
import  bcrypt  from 'bcryptjs'
// const { string } = require('joi')
let usersSchema= new Schema({
    otp:{
        type:String,
        required:true
    },
    otpExp:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        required:true,
        enum:["user","admin"],
        default:"user"
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    department:{
        type:String,
        required:true,
    },
    matric_number:{
        type:Number,
        required:true,
    },
    faculty:{
        type:String,
        required:true,
    },
    isEmailVerified:{
        type:Boolean,
        default:false
    },
    password:{
        type:String,
        required:true
    },
},
{timestamps:true})

usersSchema.pre("save", async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  });

export default  mongoose.model('Users', usersSchema)