import adminServ from "../services/adminService.js";
import response from "../utility/response.js";

class adminCntroller{
    async dept_faculty(req,res){
        let data = await adminServ.dept_faculty(req,res);
       res.status(200).json(response(true,'data fetched',data)) 
    }
    async create_vote(req,res){
        let data = await adminServ.create_vote(req,res);
       res.status(200).json(response(true,'vote created ',data)) 
    }    
}
export default new adminCntroller()