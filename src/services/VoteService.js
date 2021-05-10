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


class voteService {
       async generalElection(req,res){
        
        const generalElectionId = (await Vote.findOne({
            vote_type: 'General'
        }))._id
        console.log(generalElectionId)
        const data = await Data.find({vote_type_id :generalElectionId})
        return data;
    }
    async facultyElection(req,res){
        
    const facultytElection = (await Vote.find({
        vote_type: 'Faculty'
    }))
    let All = [];
      
        for (const eachfacultyElection of facultytElection) {
            let EachFacultyElection = await Data.find({
                vote_type_id: eachfacultyElection._id
            })
        let fac = eachfacultyElection;
           await All.push([fac.faculty_name,...EachFacultyElection])
        console.log(fac.department_name)

        }
    return   All;
    }

async departmentElection(req,res){
        
    const departmentElection = (await Vote.find({
        vote_type: 'Department'
    }))
    let All = [];
      
        for (const eachdepartmentElection of departmentElection) {
            let EachDepartmentElection = await Data.find({
                vote_type_id: eachdepartmentElection._id
            })
        let fac = eachdepartmentElection;
           await All.push([fac.department_name,...EachDepartmentElection])
        console.log(fac.department_name)

        }
    return   All;
}


}

export default new voteService()
 