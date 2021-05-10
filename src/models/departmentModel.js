import mongoose from 'mongoose'
const  {Schema,model} = mongoose
import  bcrypt  from 'bcryptjs'
// const { string } = require('joi')
let departmentSchema= new Schema({
    department:{
        type:String,
        required:true
    },
},
{timestamps:true})


export default  mongoose.model('department', departmentSchema)