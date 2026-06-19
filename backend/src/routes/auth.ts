import { Router } from "express";
import bcrypt from "bcrypt";

export const authrouter=Router()

authrouter.post("/signup",async (req,res)=>{
    const {name,email,password}=req.body
    if(!name || !email || !password){
        return res.json({message:"Please fill all the fields"}).status(403)
    }

    const hashpass=await bcrypt.hash(password,10)
    const user=await 

    res.json({message:"Signed Up",user:{name,email}}).status(200)
})