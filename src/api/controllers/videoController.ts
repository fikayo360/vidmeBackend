
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import funnyGuys from '../../mock';
const Video = require('../../models/Video')



class video {
    public async getVideos(req: Request, res: Response){
         
        try{
            const videoItems:any = []
            Video.map(
                async(item:string|number|boolean) => {
                let q = item
                let encodedQuery = encodeURIComponent(q);
                let query = 'https://www.googleapis.com/youtube/v3/search?&regionCode=NG&maxResults=50&key=AIzaSyCW7U3xPDBQMU6mzuAjdrLlsEfaivESoiw&type=video&part=snippet'
                query += `q=${encodedQuery}`
                const response = await axios.get(query);
                videoItems.push(response.data.items) 
            })  

            videoItems.map((item:any)=> {
                const id = uuidv4();
                const videoId = item.id.videoId;
                const publishedAt = item.snippet.publishedAt
                const channelId = item.snippet.channelId
                const title = item.snippet.title
                const description = item.snippet.description
                const thumbnail = item.snippet.thumbnails.default.url
                const channelTitle = item.snippet.channelTitle
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