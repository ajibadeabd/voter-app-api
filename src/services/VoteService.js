import customError from "../utility/customError.js";
import User from "../models/userModel.js";
import Dept from "../models/departmentModel.js";
import Vote from "../models/voteModel.js";
import Data from "../models/dataModel.js";
import Voted from "../models/voteCasted.js";
import Faculty from "../models/facultyModel.js";
import otpGenerator from 'otp-generator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Email  from '../utility/mailServices.js'
// const 

class voteService {
       async generalElection(req,res){
        
        const generalElectionId = (await Vote.findOne({
            vote_type: 'General'
        }))?._id
        const data = await Data.find({vote_type_id :generalElectionId})
        const all =[]
        all.push('General',data)
        console.log(all)

        return all;
    }
    async facultyElection(req,res){
        
    const facultytElection = (await Vote.findOne({
        vote_type: 'Faculty',
        faculty_name:req.user.faculty

    }))
    let All = [];
    let aaa = [];
      
        // for (const eachfacultyElection of facultytElection) {
            let EachFacultyElection = await Data.find({
                vote_type_id: facultytElection?._id
            })
           await All.push({name:facultytElection?.faculty_name},EachFacultyElection)
        // }
    return   All;
    }

async departmentElection(req,res){
        
    const departmentElection = (await Vote.findOne({
        vote_type: 'Department',
        department_name:req.user.department
    }))
    let All = [];
        // for (const eachdepartmentElection of departmentElection) {
            let EachDepartmentElection = await Data.find({
                vote_type_id: departmentElection?._id
            })
            console.log(EachDepartmentElection)
           await All.push({name:departmentElection?.department_name},EachDepartmentElection)
        // }
    return   All;
}
async allElection(req,res){

    let dep = await this.departmentElection(req,res) 
    let fac = await this.facultyElection(req,res) 
    let gen = await this.generalElection(req,res) 
    return [dep,fac,gen]
    // return [fac]
    }
async vote(req,res){
    // check if vote exist
    let user = req.user._id;
    // post:{
    // voter_id :{
    // vote_type_id :{
    
    let vote = await Data.findOne({_id: req.body.voter_id,
        vote_type_id: req.body.vote_type_id
    })
    
    let voted = await  Voted.findOne({
        post:vote.post,
        vote_type_id: req.body.vote_type_id
            })
            if(vote.voters.includes(user)){
                throw new customError('you have voted for this candidate before',404)
            }


            if(voted){
                throw new customError(`you cant vote more than one candidate for this post`,404)
            }
        
    
    let previousVoters =  [] || vote.voters ;
vote.score++;
previousVoters.push(user)
vote.voters = previousVoters
await vote.save()

let s = await  new Voted({
    post:vote.post,
    vote_type_id: req.body.vote_type_id,
    voter_id: req.user._id
        })
        s.save()
    return 
}
}

export default new voteService()
 