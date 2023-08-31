const youtube = require('youtube-api');
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

const youTube =  new youtube({
    type: "key",
    key: process.env.YOUTUBE_KEY
});

class video {

    public async getVideos(req: Request, res: Response){
        try{
            const videos = await youTube.search({
                q: 'funny',maxResults:20,regionCode: 'NG'
              });
              res.status(StatusCodes.OK).json(videos)
        }catch(err:any){
            console.log(err.response.data);
        }
        
    }
}

export default video