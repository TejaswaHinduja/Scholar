import { Router } from "express";
import bcrypt from "bcrypt";
import { genToken } from "../util/jwt.js";
import {prisma} from "../db.js"
export const authrouter=Router()

authrouter.post("/signup",async (req,res)=>{
    try{const {name,email,password}=req.body
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
    
    res.status(200).json({message:"Signed Up",user:{name,email}})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"error during sign up , try again"})
    }
})
authrouter.post("/login",async(req,res)=>{
    
    try{const {email,password}=req.body
    if(!email || !password){
        return res.status(403).json({message:"fill all"})
    }
    const user=await prisma.user.findUnique({
        where:{
            email
        },
        select:{
            id:true,
            password:true
        }
    })
    if(!user){
        return res.status(403).json({message:"Please sign up"})
    }
    const checkpass=await bcrypt.compare(password,user.password)
    if(!checkpass){
        return res.status(403).json({message:"incorrect creds"})
    }
    genToken(user.id,res)

    res.status(200).json({
        message:"signed up",
        email:email
    })
}
    catch(error){
        console.log(error)
        res.status(500).json({message:"error during login, please try again"})
    }
})