import express  from 'express'
const  router = express.Router();
import adminCtrl  from '../controller/adminCntroller.js'
import  passport from  'passport'
const auth = passport.authenticate('jwt',{session:false})

/* GET home page. */

// registeration route
router.get("/dept_faculty",adminCtrl.dept_faculty);
router.post("/vote",adminCtrl.create_vote);
//router.post("/vote",auth,adminCtrl.create_vote);

export default  router;
