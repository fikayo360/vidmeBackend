
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import funnyGuys from '../../mock';
const Video = require('../../models/Video')


class video {
    public async getVideos(req: Request, res: Response){
         
        try{
            Video.map(
                async(item:String) => {
                let query = 'https://www.googleapis.com/youtube/v3/search?q='+item+'&regionCode=NG&maxResults=50&key=AIzaSyCW7U3xPDBQMU6mzuAjdrLlsEfaivESoiw&type=video&part=snippet'
                const response = await axios.get(query);
                const id = uuidv4();
                const videoId = response.data.items[0].id.videoId;
                const publishedAt = response.data.items[0].snippet.publishedAt
                const channelId = response.data.items[0].snippet.channelId
                const title = response.data.items[0].snippet.title
                const description = response.data.items[0].snippet.description
                const thumbnail = response.data.items[0].snippet.thumbnails.default.url
                const channelTitle = response.data.items[0].snippet.channelTitle
                console.log({id,videoId,publishedAt,channelId,title,description,thumbnail,channelTitle});
                const createVideo = Video.create({id,videoId,publishedAt,channelId,title,description,thumbnailUrl:thumbnail,channelTitle})
                console.log('video created'); 
            })  
            res.status(StatusCodes.OK).json('videos created') 
        }catch(err:any){
            console.log(err.response.data);
        }  
    }
}

export default video