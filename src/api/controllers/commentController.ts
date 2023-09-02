import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
const Comment = require('../../models/Comment')

class comment {
    public async createComment(req: Request, res: Response){
        const id = uuidv4();
        const {videoId,username,userPic,comment} = req.body
        try{
            const response = await Comment.create({id,videoId,username,userPic,comment})
            res.status(StatusCodes.OK).json('created')
        }
        catch(err:any){
            console.log(err.response.data);
            res.status(StatusCodes.BAD_REQUEST).json('error creating comments')
        }
    }

    public async getCommentsByVideo(req: Request, res: Response){
        const {videoId} = req.query
        try{
            const comments = await Comment.findAll({
                where: {
                  videoId: videoId
                },
                order: [
                  ['createdAt', 'DESC']
                ]
              });
              res.status(StatusCodes.OK).json(comments.Comment.dataValues)
              console.log(comments);
        }catch(err:any){
            res.status(StatusCodes.BAD_REQUEST).json('error getting comments')
        }
    }
}

export default comment