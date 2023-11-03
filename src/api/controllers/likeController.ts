import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
const Like = require('../../models/Like')
import tryCatch from '../../utils/tryCatch';

class like {
    public createLike = tryCatch(
      async (req: Request, res: Response) => {
        const id = uuidv4();
        const {videoId,username} = req.body
        
            const like = await Like.findOne({
                where: {
                  username:username,
                  videoId: videoId
                }
              });
              if(!like){
                const response = await Like.create({id,videoId,username})
                res.status(StatusCodes.OK).json('created')
              }else{
                res.status(StatusCodes.BAD_REQUEST).json('already liked')
              }
    }
    )

    public  getLikessByVideo = tryCatch(
      async (req: Request, res: Response) =>{
        const {videoId} = req.query
     
            const likes = await Like.findAll({
                raw: true,
                where: {
                  videoId: videoId
                },
                order: [
                  ['createdAt', 'DESC']
                ]
              });
              res.status(StatusCodes.OK).json(likes)
    }
    )
}

export default like