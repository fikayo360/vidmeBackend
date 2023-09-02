import express, { Router } from 'express';
import {authUser} from '../middlewares/index'
import {like} from '../controllers/index'
const router:Router = express.Router()
const newLike = new like()

router.route("/getAll").get(authUser,newLike.getLikessByVideo)
router.route("/add").post(authUser,newLike.createLike)

module.exports = router