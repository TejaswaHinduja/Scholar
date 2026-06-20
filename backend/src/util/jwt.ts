import  jwt  from "jsonwebtoken";
import { Response } from "express";

const secret="123"
export function genToken(userId:string,res:Response){
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