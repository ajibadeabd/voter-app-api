import express  from 'express'
const  router = express.Router();
import userCtrl  from '../controller/userCntroller.js'
import  passport from  'passport'
const auth = passport.authenticate('jwt',{session:false})

/* GET home page. */

// registeration route
router.post("/register",userCtrl.register);

// login route
router.post("/login",userCtrl.login);

// verify account
router.post("/verify_otp",userCtrl.verify_otp);
// resend otp
router.post("/resend_otp",userCtrl.resend_otp);
// fetch user profile
router.get("/get_profile",auth,userCtrl.getProfile);


export default  router;
