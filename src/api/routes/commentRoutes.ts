import express, { Router } from 'express';
import {authUser} from '../middlewares/index'
import {comment} from '../controllers/index'
const router:Router = express.Router()
const newComment = new comment()

router.route("/getAll").get(authUser,newComment.getCommentsByVideo)
router.route("/add").post(authUser,newComment.createComment)

module.exports = router