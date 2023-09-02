import express, { Router } from 'express';
import {authUser} from '../middlewares/index'
import {video} from '../controllers/index'
const router:Router = express.Router()
const newVideo = new video()

router.route("/get").get(authUser,newVideo.getVideos)
router.route("/getRandom").get(authUser,newVideo.getRandomVideo)

module.exports = router