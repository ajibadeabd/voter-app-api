import customError from "../utility/customError.js";
import User from "../models/userModel.js";
// import validator from "../helper/userValidator.js";
import otpGenerator from 'otp-generator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import Email  from '../utility/mailServices.js'

// const  {registerValidator,loginValidator,userExist,otpValidator,saveData,updateData} = validator;

// import {
//     validate,
//     validateOrReject,
//     Contains,
//     IsInt,
//     Length,
//     IsEmail,
//     IsFQDN,
//     IsDate,
//     Min,
//   } from 'class-validator';
  

class userService {
    async register(req,res){
        let {email,password,matric_number,faculty,department} = req.body;
        let otp = otpGenerator.generate(6, { upperCase: true, specialChars: false })
        let isUserExist =await User.findOne({email:email})
        if(isUserExist) throw new customError('email already exist')
        if(!password) throw new customError('provide your password')
        if(password.length<6) throw new customError('password must be more than five characters ')
        let otpExp=Date.now()+300000000000000
          let savedNewUser =await new User({otp,otpExp,
              email,password}).save()
      
        await new Email(req.body, otp).send_otp();
        return  `an otp was sent to your email and it will expire with in five minutes, use the otp to activate your account`
    // }
    }

    async login(req,res){
        let {email,password}=req.body
        if(!email) throw new customError('provide your email')

        let UserExist =await User.findOne({email:email})
        if(!UserExist) throw new customError('no user found')
        if(!UserExist.isEmailVerified) 
        throw new customError('account not activated enter the otp sent to your email or resend an otp')
        let passCorrect = await bcrypt.compare(password,UserExist.password)
        if(!passCorrect) throw new customError('password incorrect')
        let user=_.pick(UserExist,["_id"])
        console.log( user._id)
        let accessToken =await jwt.sign({id: user._id},process.env.jwtSecret,{expiresIn:`2h`})
        return {user,token:`Bearer ${accessToken}`}
    }

    async getProfile(req,res){
        let UserExist =await User.findOne({email:req.user.email},{password:0})
        // let userProfile=_.pick(UserExist,["_id","isEmailVerified","email","matric_number","userType","faculty"])
        return UserExist



    }

    async verify_otp(req,res){
        let {email,Otp}=req.body
        if(!email) 
        throw new customError('please provide your email')
        // await  otpValidator(data)
        let UserExist =await User.findOne ({email})
        if(!UserExist) 
        throw new customError('no user found')   
        if(UserExist.isEmailVerified)
        throw new customError('account has previously been verified')
        if(UserExist.otp!==Otp) 
        throw new customError('please input the otp you recieved')   
        if(Date.now()>UserExist.otpExp)
        throw new customError('otp expired, please resend otp')
        const oldDetails = { email: email };
        const updateDetails = { isEmailVerified:true };
        let Update = await User.findOneAndUpdate(oldDetails, updateDetails);

        // let isUpdated = await updateData(User,oldDetails, updateDetails)
        return 
    }
    async resend_otp(req,res){
        let {email}=req.body
        let UserExist =await User.findOne ({email})

        if(!UserExist) 
        throw new customError('no user found')
        if(UserExist.isEmailVerified)
        throw new customError('account has previously been verified, no need for otp')
        let otp = otpGenerator.generate(6, { upperCase: true, specialChars: false })
        let otpexp=Date.now()+3000000000000000
        const oldDetails = { email: email };
        let updateDetails = {otp: otp,otpExp:otpexp};
        let Update = await User.findOneAndUpdate(oldDetails, updateDetails);
        await new Email(req.body, otp).resend_otp();
        return
    }

}

export default new userService()
 