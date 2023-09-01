
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
const Reset = require('../../models/Reset')

const apikey = process.env.YOUTUBE_KEY
const max = 2
const queryValue = 'funny'
class video {
    public async getVideos(req: Request, res: Response){
        console.log(apikey);
        const query = `'https://www.googleapis.com/youtube/v3/search?q=${queryValue}&regionCode=NG&maxResults=${max}&key=${apikey}&type=video&part=snippet'`
        try{
             const response = await axios.get(query);
             const nextPageToken = response.data.nextPageToken
             const id = uuidv4();
             const createReset = await Reset.create({
                id,token:nextPageToken
              });
               console.log(response.data);
               console.log('token created');
              return res.status(StatusCodes.OK).json(response.data)
        }catch(err:any){
            console.log(err.response.data);
        }
        
    }
}

export default video