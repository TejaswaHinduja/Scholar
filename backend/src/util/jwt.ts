import  jwt  from "jsonwebtoken";
import { Response } from "express";
import dotenv from "dotenv"
dotenv.config()

export function genToken(userId:string,res:Response){
    const secret=process.env.JWT_SECRET
    if(!secret){
        return res.status(500)
    }
    const token=jwt.sign({userId},secret,{
        expiresIn:"7d"
    })
    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        sameSite:"none",
        secure:process.env.NODE_ENV!=="development"
    })
    return token
}