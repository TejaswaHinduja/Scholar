import { Router } from "express";
import bcrypt from "bcrypt";
import { genToken } from "../util/jwt.js";
import {prisma} from "../db.js"
export const authrouter=Router()

authrouter.post("/signup",async (req,res)=>{
    const {name,email,password}=req.body
    if(!name || !email || !password){
        return res.status(403).json({message:"Please fill all the fields"})
    }
    const hashpass=await bcrypt.hash(password,10)
    const user=await prisma.user.create({
        data:{
            name,
            email,
            password:hashpass
        }
    })
    genToken(user.id,res)
    
    res.json({message:"Signed Up",user:{name,email}}).status(200)
})
authrouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(403).json({message:"fill all"})
    }
    const user=await prisma.user.findUnique({
        where:{
            email
        },
        select:{
            password:true
        }
    })
    if(user){
        const checkpass=await bcrypt.compare(password,user.password)
    }
})