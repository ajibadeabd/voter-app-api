import mongoose from 'mongoose'
const  {Schema,model} = mongoose
import  bcrypt  from 'bcryptjs'
// const { string } = require('joi')
let Castedsehema= new Schema({
    post:{
        type:String,
        required:true
    },
    voter_id :{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users",
      },
    
    vote_type_id :{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users",
      },
},
{timestamps:true})


export default  mongoose.model('Votecasted', Castedsehema)