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
import tryCatch from "../../utils/tryCatch";
    
 
class user {
    public register = tryCatch(
      async (req: Request, res: Response) =>{
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

        
            const hashedPassword = bcrypt.hashSync(password, 10);
          const savedUser = await User.create({
            id,email,username,password:hashedPassword
          });
          const tokenUser = createTokenUser(savedUser)
          const cookie = createJWT(tokenUser)
          return res.status(StatusCodes.OK).json({cookie,savedUser});
       
      }
    )

      public login = tryCatch (
        async (req: Request, res: Response) => {
          const {username,password} = req.body
          if (!username || !password){
              return res.status(500).json("pls ensure fields are not empty ")
            }
            
              const foundUser = await User.findOne({where:{username:username}})
              console.log(foundUser.dataValues);
           
              if(!foundUser){
                  return res.status(StatusCodes.BAD_REQUEST).json('that user does not exist')
              }
              
              if(!bcrypt.compareSync(password,foundUser.password)){
                 return res.status(StatusCodes.BAD_REQUEST).json('wrong password')
               }
               const { password: foundUserPassword, ...others } = foundUser.dataValues;
               const tokenUser = createTokenUser(others);
               const cookie = createJWT(tokenUser)
               return res.status(StatusCodes.OK).json({ user: others,cookie });
             
         }
      )

       public forgotPassword = tryCatch(
        async (req: Request, res: Response) => {
          const {email} = req.body
          const sessionUser = await User.findOne({where:{email:email}})
          if(validateEmail(email) === false){
            return res.status(StatusCodes.BAD_REQUEST).json('invalid mail')
        }
          if (!sessionUser){
              return res.status(404).json('that email does not exist')
          }
          
          let reset = sendResetToken(sessionUser.dataValues.email)
          const updateToken = await User.update({
              resettoken: reset
            }, {
              where: {
                id: sessionUser.dataValues.id
              }
            });
            console.log(updateToken);
          return res.status(200).json(` Reset token sent successfully`)
          }
       )
  
       public changePassword = tryCatch(
        async (req: Request, res: Response) =>{
          const {token,email,newPassword} = req.body
          const secretKey: Secret = process.env.JWT_SECRET || 'defaultSecretKey';
          const sessionUser = await User.findOne({where:{email:email}})
            
              const decoded = jwt.verify(token,secretKey) as JwtPayload;
              const hashedPassword = await bcrypt.hash(newPassword, 10);
              if(decoded.email === sessionUser.dataValues.email){
                  const updated = await User.update({
                      resettoken: null,
                      password: hashedPassword
                    }, {
                      where: {
                        id: sessionUser.dataValues.id
                      }
                    });
                    console.log(updated);
                  return res.status(StatusCodes.OK).json('password updated successfully');
              }
              else{
                  return res.status(StatusCodes.BAD_REQUEST).json('wrong user');
              }
             
         }
       )

       public updateProfile = tryCatch(
        async (req: Request, res: Response) =>{
     
          const {newProfilePic} = req.body
          const username = req.user.username
          const id = req.user.userId
            const userExists = await User.findOne({where:{username:username}})
            const updatepicture = await User.update({profile_pic:newProfilePic},{
              where:{
                  id:id
              }
            })
            return res.status(StatusCodes.OK).json(`profile updated successfully`)
        }
       )
}

export default user