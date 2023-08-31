import express, { Router } from 'express';
import {authUser} from '../middlewares/index'
import {user} from '../controllers/index'
const router:Router = express.Router()
const newUser = new user()
router.route("/signup").post(newUser.register)
router.route("/login").post(newUser.login)
router.route("/forgotPassword").post(newUser.forgotPassword)
router.route("/changePassword").post(newUser.changePassword)
router.route("/updateProfilePic").post(authUser,newUser.updateProfile)

module.exports = router