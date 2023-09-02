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
            const response = await Like.create({id,videoId,username})
            res.status(StatusCodes.OK).json('created')
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
                where: {
                  videoId: videoId
                },
                order: [
                  ['createdAt', 'DESC']
                ]
              });
              res.status(StatusCodes.OK).json(likes.Like.dataValues)
        }catch(err:any){
            res.status(StatusCodes.BAD_REQUEST).json('error getting likes')
        }
    }
}

export default like