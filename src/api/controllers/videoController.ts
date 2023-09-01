
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import funnyGuys from '../../mock';
const Video = require('../../models/Video')

class video {
    public async getVideos(req: Request, res: Response){
       
        let query = 'https://www.googleapis.com/youtube/v3/search?q=sabinus&regionCode=NG&maxResults=1&key=AIzaSyCW7U3xPDBQMU6mzuAjdrLlsEfaivESoiw&type=video&part=snippet'
        
        try{
            const id = uuidv4();
            const response = await axios.get(query);
            
            const videoId = response.data.items[0].id.videoId;
            const publishedAt = response.data.items[0].snippet.publishedAt
            const channelId = response.data.items[0].snippet.channelId
            const title = response.data.items[0].snippet.title
            const description = response.data.items[0].snippet.description
            const thumbnail = response.data.items[0].snippet.thumbnails.default.url
            const channelTitle = response.data.items[0].snippet.channelTitle
            console.log({id,videoId,publishedAt,channelId,title,description,thumbnail,channelTitle});
            res.status(StatusCodes.OK).json({id,videoId,publishedAt,channelId,title,description,thumbnail,channelTitle})
            console.log('video created');   
            
        }catch(err:any){
            console.log(err.response.data);
        }
        
    }
}

export default video