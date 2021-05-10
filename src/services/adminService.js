import customError from "../utility/customError.js";
import User from "../models/userModel.js";
import Dept from "../models/departmentModel.js";
import Vote from "../models/voteModel.js";
import Data from "../models/dataModel.js";
import Faculty from "../models/facultyModel.js";
import otpGenerator from 'otp-generator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Email  from '../utility/mailServices.js'


class adminService {
       async dept_faculty(req,res){
        const allDepartment = await Dept.find();
        const allFaculty = await Faculty.find();
        return {
            department: allDepartment,
            faculty: allFaculty

        }
    }
    async create_vote(req,res){
        let { vote_type, department_name, faculty_name, votingDetails } = req.body;
        let voteId=''
        if(!votingDetails || votingDetails.length === 0){
            throw new customError(' provide votingDetails')

        }
        if(!['General', 'Faculty', 'Department'].includes(vote_type) ){
            throw new customError(' specify vote type be it [General, Faculty, Department]')
        }
        if(vote_type === 'Faculty'){
            
            if(!faculty_name){
            throw new customError(' please provide faculty name ')
            }
            
        const isExist = await Vote.findOne({
            vote_type,faculty_name
        })
        if (isExist)
        throw new customError(`${vote_type} election  for ${faculty_name} already exist`)

            let save= await Vote.create({
                faculty_name,vote_type
            })
            voteId=save._id
        }
        // general vote
        if(vote_type === 'General'){
            const isExist = await Vote.findOne({
                vote_type
            })
            if (isExist)
            throw new customError(`${vote_type} election  already exist`)


            let save= await Vote.create({
                vote_type 
            })
            voteId=save._id
        }
            if(vote_type === 'Department'){
            if(!department_name){
            throw new customError(' please provide department name ')
            }
            const isExist = await Vote.findOne({
                vote_type,department_name
            })
            if (isExist)
            throw new customError(`${vote_type} election for  ${department_name} already exist`)
    
            let save= await Vote.create({
                department_name,vote_type
            })
            voteId=save._id
        }
        
         let aa=[]
        for (const eachPost of req.body.votingDetails) {

            for(let key in eachPost){
                if(eachPost.hasOwnProperty(key)){
                    // if(eachPost.hasOwnProperty(key)){
                    if(key == undefined){
                        throw new customError('wrong data format')
                    }
                    for (const each of eachPost[key]) {
await Data.create({
    vote_type_id: voteId,
    name: each,
    post: key

})
                    } }

            }
        }
        return {
            succes:true,
        }
        // const saveVote = new Vote({...req.body})
        // saveVote.save()
       
    }
    async generalElection(req,res){
        
        const generalElectionId = await Vote.findOne({
            vote_type: 'General'
        })._id
        const data = await Data.findOne({vote_type_id :generalElectionId})
        return data;
    }


}

export default new adminService()
 