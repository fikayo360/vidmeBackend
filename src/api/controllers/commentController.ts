import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
const Comment = require('../../models/Comment')
import tryCatch from '../../utils/tryCatch';

class comment {
    public  createComment = tryCatch(
        async (req: Request, res: Response) =>{
            const id = uuidv4();
            const {videoId,username,userPic,comment} = req.body
            
                const response = await Comment.create({id,videoId,username,userPic,comment})
                res.status(StatusCodes.OK).json('created')
        }
    )

    public  getCommentsByVideo = tryCatch(
        async(req: Request, res: Response) => {
            const {videoId} = req.query
            try{
                const comments = await Comment.findAll({
                    raw: true,
                    where: {
                      videoId: videoId
                    },
                    order: [
                      ['createdAt', 'DESC']
                    ]
                  });
                  res.status(StatusCodes.OK).json(comments)
                  console.log(comments);
            }catch(err:any){
                res.status(StatusCodes.BAD_REQUEST).json('error getting comments')
            }
        }
    )
}

export default comment