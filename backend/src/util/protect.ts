import { Request,Response,NextFunction } from "express";
import {User} from "@prisma/client"

import {prisma} from "../db.js"
import  jwt  from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

interface MyTokenPayload {
    userId: string;
}
export interface AuthRequest extends Request {
  user?: Omit<User, 'password'>
}
export async function Protect(req:AuthRequest,res:Response,next:NextFunction){
    
    try{
        const token=req.cookies.jwt;
        if(!token){
            return res.status(403).json({message:"not authenticated"})
        }
        const secret=process.env.JWT_SECRET as string
        const check=jwt.verify(token,secret) as MyTokenPayload
        if(!check || !check.userId){
            return res.status(403).json({message:"login again"})
        }
        const user=await prisma.user.findUnique({
            where:{
                id:check.userId
            },
            omit:{
                password:true
            }
        })
        if(!user){
            return res.status(500).json({message:"please sign up"})
        }
        req.user=user
        next()

}
    catch(e){
        return res.status(500)
    }
}