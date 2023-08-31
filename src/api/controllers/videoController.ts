
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import axios from 'axios';

const baseUrl = "https://www.googleapis.com/youtube/v3"
const apikey = process.env.YOUTUBE_KEY

class video {
    public async getVideos(req: Request, res: Response){
        console.log(apikey);
        const query = `${baseUrl}/search?q=funny&regionCode=NG&maxResults=20&key=${apikey}`
        try{
             const response = await axios.get(query);
              res.status(StatusCodes.OK).json(response)
        }catch(err:any){
            console.log(err.response.data);
        }
        
    }
}

export default video