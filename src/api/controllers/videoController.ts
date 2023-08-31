
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import axios from 'axios';

const apikey = process.env.YOUTUBE_KEY

class video {
    public async getVideos(req: Request, res: Response){
        console.log(apikey);
        const query = 'https://www.googleapis.com/youtube/v3/search?q=funny&regionCode=NG&maxResults=20&key=AIzaSyCW7U3xPDBQMU6mzuAjdrLlsEfaivESoiw&type=video&part=snippet'
        try{
             const response = await axios.get(query);
             console.log(response.data);
              return res.status(StatusCodes.OK).json(response.data)
        }catch(err:any){
            console.log(err.response.data);
        }
        
    }
}

export default video