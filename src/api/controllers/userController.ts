const User = require('../../models/User')
import sendResetToken from "../../utils/sendResetToken"
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import validateEmail from "../../utils/validateEmail";
import createTokenUser from "../../utils/createTokenUser";
import { createJWT } from "../../utils/jwt";
import { v4 as uuidv4 } from 'uuid';

    
 
class user {
    public async register(req: Request, res: Response){
        const id = uuidv4();
        const {email,username,password} = req.body
        if (!username || !email || !password){
        return res.status(StatusCodes.BAD_REQUEST).json('fields cant be empty')
      }
        if(validateEmail(email) === false){
          return res.status(StatusCodes.BAD_REQUEST).json('invalid mail')
      }
        const userExists = await User.findOne({where:{username:username}})
        const emailExists = await User.findOne({where:{email:email}})

        if(userExists || emailExists){
          return res.status(StatusCodes.BAD_REQUEST).json('user already exists')
        } 

        try{
          const savedUser = await User.create({
            id,email,username,password
          });
          const tokenUser = createTokenUser(savedUser)
          const cookie = createJWT(tokenUser)
          return res.status(StatusCodes.OK).json({cookie,savedUser});
        }catch(err){
          return res.status(StatusCodes.BAD_REQUEST).json('err creating user')
        } 
      }

      public async login(req: Request, res: Response){
        const {username,password} = req.body
        if (!username || !password){
            return res.status(500).json("pls ensure fields are not empty ")
          }
          try{  
            const foundUser = await User.findOne({where:{username:username}})
         
            if(!foundUser){
                return res.status(StatusCodes.BAD_REQUEST).json('that user does not exist')
            }
            
            if(!bcrypt.compareSync(password,foundUser.password)){
               return res.status(StatusCodes.BAD_REQUEST).json('wrong password')
             }
             const { password: foundUserPassword, ...others } = foundUser;
             const tokenUser = createTokenUser(others);
             const cookie = createJWT(tokenUser)
             return res.status(StatusCodes.OK).json({ user: others,cookie });
            }
            catch(err){
                return res.status(StatusCodes.BAD_REQUEST).json('error Authenticating user')
            }
       }

       public async forgotPassword(req: Request, res: Response){
        const {email} = req.body
        const sessionUser = await User.findOne({where:{email:email}})
        if(validateEmail(email) === false){
          return res.status(StatusCodes.BAD_REQUEST).json('invalid mail')
      }
        if (!sessionUser){
            return res.status(404).json('that email does not exist')
        }
        try{
        let reset = sendResetToken(sessionUser.email)
        const updateToken = await User.update({
            resettoken: reset
          }, {
            where: {
              id: sessionUser.id
            }
          });
          console.log(updateToken);
        return res.status(200).json(` Reset token sent successfully`)
        }
        catch(err){
            return res.status(StatusCodes.BAD_REQUEST).json('oops an error occured')
        }
       }
  
       public async changePassword(req: Request, res: Response){
       
        const {token,email,newPassword} = req.body
        const secretKey: Secret = process.env.JWT_SECRET || 'defaultSecretKey';
        const sessionUser = await User.findOne({where:{email:email}})
          try{
            const decoded = jwt.verify(token,secretKey) as JwtPayload;
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            if(decoded.email === sessionUser.email){
                const updated = await User.update({
                    resettoken: null,
                    password: hashedPassword
                  }, {
                    where: {
                      id: sessionUser.id
                    }
                  });
                  console.log(updated);
                return res.status(StatusCodes.OK).json('password updated successfully');
            }
            else{
                return res.status(StatusCodes.BAD_REQUEST).json('wrong user');
            }
            }
            catch(err){
                return res.status(StatusCodes.BAD_REQUEST).json('an error occurred')
            }
       }

       public async updateProfile(req: Request, res: Response){
     
        const {newProfilePic} = req.body
        const username = req.user.username
        const id = req.user.userId
        
        try{
          const userExists = await User.findOne({where:{username:username}})
          const updatepicture = await User.update({profile_pic:newProfilePic},{
            where:{
                id:id
            }
          })
          return res.status(StatusCodes.OK).json(`profile updated successfully`)
        }catch(err){
          return res.status(StatusCodes.BAD_REQUEST).json('an error occurred')
        }
      }
}

export default user