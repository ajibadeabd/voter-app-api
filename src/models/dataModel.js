import mongoose from 'mongoose'
const  {Schema,model} = mongoose
import  bcrypt  from 'bcryptjs'
let Responsehema= new Schema({
    name:{
        type:String,
        required:false
    },
    post:{
        type:String,
        required:false
    },
    vote_type_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Response",
      },
    
},
{timestamps:true})


export default  mongoose.model('Data', Responsehema)