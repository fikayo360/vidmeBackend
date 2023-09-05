import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
const Like = require('../../models/Like')

class like {
    public async createLike(req: Request, res: Response){
        const id = uuidv4();
        const {videoId,username} = req.body
        try{
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
        catch(err:any){
            console.log(err.response.data);
            res.status(StatusCodes.BAD_REQUEST).json('error adding like')
        }
    }

    public async getLikessByVideo(req: Request, res: Response){
        const {videoId} = req.query
        try{
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
        }catch(err:any){
            res.status(StatusCodes.BAD_REQUEST).json('error getting likes')
        }
    }
}

export default like