import express, { Router } from 'express';
import {authUser} from '../middlewares/index'
import {user,video} from '../controllers/index'
const router:Router = express.Router()
const newVideo = new video()

router.route("/get").get(authUser,newVideo.getVideos)


module.exports = router