
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import funnyGuys from '../../mock';
import { Sequelize } from 'sequelize';
const Video = require('../../models/Video')
import tryCatch from '../../utils/tryCatch';

class video {
    public  getVideos = tryCatch(
        async(req: Request, res: Response) =>{
            const videoItems:any = []
                funnyGuys.map(
                    async(item:string) => {
                    let q = item
                    let encodedQuery = encodeURIComponent(q);
                    let query = `https://www.googleapis.com/youtube/v3/search?q=${encodedQuery}&regionCode=NG&maxResults=50&key=AIzaSyCW7U3xPDBQMU6mzuAjdrLlsEfaivESoiw&type=video&part=snippet`
                    const response = await axios.get(query);
                    console.log(response.data);
                    response.data.items.map(async(item:any) => {
                    const id = uuidv4();
                    const videoId = item.id.videoId;
                    const publishedAt = item.snippet.publishedAt
                    const channelId = item.snippet.channelId
                    const title = item.snippet.title
                    const description = item.snippet.description
                    const thumbnail = item.snippet.thumbnails.default.url
                    const channelTitle = item.snippet.channelTitle
                    console.log({id,videoId,publishedAt,channelId,title,description,thumbnail,channelTitle});
                    const createVideo = await Video.create({id,videoId,publishedAt,channelId,title,description,thumbnailUrl:thumbnail,channelTitle})
                    console.log('video created');
                    })
                })  
    
                res.status(StatusCodes.OK).json('done') 
        
        }
    )

    public getRandomVideo = tryCatch(
        async(req:Request,res:Response) => {

            const randomVideo = await Video.findAll({
                   order: Sequelize.literal('RANDOM()'),
                   limit: 1    
                 });
               res.status(StatusCodes.OK).json(randomVideo)
           }
    )
}

export default video