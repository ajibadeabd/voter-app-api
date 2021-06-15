import express  from 'express'
const  router = express.Router();
import voteCtrl  from '../controller/voteCntroller.js'
import  passport from  'passport'
const auth = passport.authenticate('jwt',{session:false})

/* GET home page. */

// registeration route
router.get("/generalElection",voteCtrl.generalElection);
router.get("/facultyElection",voteCtrl.facultyElection);
router.get("/departmentElection",voteCtrl.departmentElection);
router.get("/allElection",auth,voteCtrl.allElection);




export default  router;
