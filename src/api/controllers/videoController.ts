
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
const Reset = require('../../models/Reset')


class video {
    public async getVideos(req: Request, res: Response){
       
        const query = 'https://www.googleapis.com/youtube/v3/search?q=funny&regionCode=NG&maxResults=2&key=AIzaSyCW7U3xPDBQMU6mzuAjdrLlsEfaivESoiw&type=video&part=snippet'
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