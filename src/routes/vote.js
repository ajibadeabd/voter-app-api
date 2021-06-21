import express  from 'express'
const  router = express.Router();
import voteCtrl  from '../controller/voteCntroller.js'
import  passport from  'passport'
const auth = passport.authenticate('jwt',{session:false})

/* GET home page. */

// registeration route
router.post("/",auth,voteCtrl.vote);
router.get("/generalElection",voteCtrl.generalElection);
router.get("/facultyElection",voteCtrl.facultyElection);
router.get("/departmentElection",voteCtrl.departmentElection);
router.get("/allElection",auth,voteCtrl.allElection);
router.get("/getCastedVote",auth,voteCtrl.getCastedVote);




export default  router;
