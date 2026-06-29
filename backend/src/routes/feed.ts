import { Router } from "express";
import bcrypt from "bcrypt";
import { genToken } from "../util/jwt.js";
import {prisma }  from "../db.js"
import { AuthRequest, Protect } from "../util/protect.js";

export const mainrouter=Router()

mainrouter.get("/posts", Protect , async(req:AuthRequest , res)=>{
    try{
    const usrId=req.user?.id
    if(!usrId){
        return
    }
    const posts=await prisma.post.findMany({
        where:{
            userId:{
                not : usrId
            }
        }
    })
    if(!posts){
        return
    }
    return res.status(200).json({posts})
}
catch(e){
    return res.status(500).json({message:"internal error"})
}
})

mainrouter.get("/user",Protect,async(req:AuthRequest,res)=>{
    try{
    
    const userId=req.user?.id
    if(!userId){
        return
    }
    const usr=await prisma.user.findUnique({
        where:{
            id:userId
        },
        omit:{
            password:true,
            
        }
    })
    if(!usr){
        return
    }
    return res.status(200).json({usr})
}
catch(e){
    return res.status(500).json({message:"internal error"})
}
})

mainrouter.get("/tuition",Protect,async(req , res)=>{
    try{
    const userId=req.body.userId
    if(!userId){
        return
    }
    const usr=await prisma.tuitions.findUnique({
        where:{
            id:userId
        },
    })
    if(!usr){
        return
    }
    return res.status(200).json({usr})
}
catch(e){
    return res.status(500).json({message:"internal error"})
}
})