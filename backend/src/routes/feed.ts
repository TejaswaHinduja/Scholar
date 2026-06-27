import { Router } from "express";
import bcrypt from "bcrypt";
import { genToken } from "../util/jwt.js";
import {prisma} from "../db.js"
import { Protect } from "../util/protect.js";
const mainrouter=Router()

mainrouter.get("/feed", Protect , async(req , res)=>{
    const userId=req.body.userId
    if(!userId){
        return
    }
    const usr=await prisma.user.findUnique({
        where:{
            id:userId
        },
        omit:{
            password:true
        }
    })

})