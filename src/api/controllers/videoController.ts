
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
                console.log(encodedQuery);
                // let query = `https://www.googleapis.com/youtube/v3/search?q='${encodedQuery}'&regionCode=NG&maxResults=50&key=AIzaSyCW7U3xPDBQMU6mzuAjdrLlsEfaivESoiw&type=video&part=snippet`
                // const response = await axios.get(query);
                // console.log(response.data);
                // const allitems = response.data.items.map((item:any) => {
                //     videoItems.push(item) 
                // })
            })  

            // videoItems.map((item:any)=> {
            //     const id = uuidv4();
            //     const videoId = item.id.videoId;
            //     const publishedAt = item.snippet.publishedAt
            //     const channelId = item.snippet.channelId
            //     const title = item.snippet.title
            //     const description = item.snippet.description
            //     const thumbnail = item.snippet.thumbnails.default.url
            //     const channelTitle = item.snippet.channelTitle
            //     console.log({id,videoId,publishedAt,channelId,title,description,thumbnail,channelTitle});
            //     const createVideo = Video.create({id,videoId,publishedAt,channelId,title,description,thumbnailUrl:thumbnail,channelTitle})
            //     console.log('video created');
            // })

            res.status(StatusCodes.OK).json('done') 
        }catch(err:any){
            console.log(err.response.data);
        }  
    }
}

export default video