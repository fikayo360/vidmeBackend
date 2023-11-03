import express, { Router } from 'express';
import {authUser} from '../middlewares/index'
import {user} from '../controllers/index'
const rateLimiter = require('express-rate-limit')
const router:Router = express.Router()
const newUser = new user()

const LoginLimiter = rateLimiter({
    windowMs:60 * 1000,
    max:10,
    message:'pls try again later '
})

const signupLimiter = rateLimiter({
    windowMs:60 * 1000,
    max:10,
    message:'Too many accounts created from this IP, please try again after an hour"'
})

router.route("/signup").post(signupLimiter(),newUser.register)
router.route("/login").post(LoginLimiter(),newUser.login)
router.route("/forgotPassword").post(newUser.forgotPassword)
router.route("/changePassword").post(newUser.changePassword)
router.route("/updateProfilePic").post(authUser,newUser.updateProfile)

module.exports = router