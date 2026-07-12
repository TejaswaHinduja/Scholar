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
        return res.status(403).json({message:"please sign up/login"})
    }
    const posts=await prisma.post.findMany({
        where:{
            userId:{
                not : usrId
            }},
            include: {
                    user: {
                        select: {
                            name: true
                        }
                }
            }
        
    })
    
    return res.status(200).json({posts})
}
catch(e){
    console.error(e)
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

mainrouter.put("/user",Protect,async(req:AuthRequest,res)=>{
    try{
    const userId=req.user?.id
    if(!userId){
        return res.status(401).json({message:"unauthorized"})
    }
    const {name,email,profilepic,bio,school,location}=req.body
    const usr=await prisma.user.update({
        where:{
            id:userId
        },
        data:{name,email,profilepic,bio,school,location},
        omit:{
            password:true,
        }
    })
    return res.status(200).json({usr})
}
catch(e){
    return res.status(500).json({message:"internal error"})
}
})

mainrouter.get("/tuition",Protect,async(req:AuthRequest , res)=>{
    try{
    const userId=req.user?.id
    if(!userId){
        return
    }
    const ttn=await prisma.tuitions.findMany()
    
    return res.status(200).json({ttn})
}
catch(e){
    return res.status(500).json({message:"internal error"})
}
})

mainrouter.post("/createpost",Protect,async(req:AuthRequest,res)=>{
    
    try{
    const userId=req.user?.id
    const {title,content}=req.body
    if(!userId || !title || !content){
        return res.status(403).json({message:"Try again"})
    }
    
    const post=await prisma.post.create({
        data:{
            userId,
            title,
            content,
        },
        select:{
            title:true,
            content:true,
            user:{
                omit:{
                    password:true
                }
            }
        },
        
    })
    if(post){
        res.status(200).json({message:"Post created",post})
    }
}
catch(e){
    return res.status(500).json({message:"try again"})
}
})