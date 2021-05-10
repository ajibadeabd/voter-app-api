import express from "express";
import user from "./user.js";
import admin from "./admin.js";
import vote from "./vote.js";
const  router = express.Router();

router.use('/user',user)
router.use('/admin',admin)
router.use('/vote',vote)
export default router