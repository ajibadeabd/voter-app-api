import mongoose from 'mongoose'
const  {Schema,model} = mongoose
import  bcrypt  from 'bcryptjs'
// const { string } = require('joi')
let Responsehema= new Schema({
    department_name:{
        type:String,
        required:false
    },
    faculty_name:{
        type:String,
        required:false
    },
    // vote_type_id :{
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "Users",
    //   },
    start_time:{
        type:Date,
        // required:true
    },
    duration:{
        type:Date,
        // required:true
    },
    vote_type:{
        type:String,
        required:true
    },

},
{timestamps:true})


export default  mongoose.model('Vote', Responsehema)