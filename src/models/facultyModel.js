import mongoose from 'mongoose'
const  {Schema,model} = mongoose
import  bcrypt  from 'bcryptjs'
// const { string } = require('joi')
let facultySchema= new Schema({
    faculty:{
        type:String,
        required:true
    },
},
{timestamps:true})


export default  mongoose.model('faculty', facultySchema)