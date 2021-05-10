import voteServ from "../services/VoteService.js";
import response from "../utility/response.js";

class voteCntroller{
    async generalElection(req,res){
        let data = await voteServ.generalElection(req,res);
       res.status(200).json(response(true,'vote fetched',data)) 
    }
    async facultyElection(req,res){
        let data = await voteServ.facultyElection(req,res);
       res.status(200).json(response(true,'vote fetched',data)) 
    }
    async departmentElection(req,res){
        let data = await voteServ.departmentElection(req,res);
       res.status(200).json(response(true,'vote fetched',data)) 
    }
}
export default new voteCntroller()