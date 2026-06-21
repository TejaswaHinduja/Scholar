"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {useParams,useRouter} from "next/navigation"
import { useState } from "react";
import {useForm,Controller} from "react-hook-form"

export default function AuthPage(){
    const form=useForm()
    const {register,handleSubmit,formState:{errors},control}=form
    
    const Submit=async()=>{
        const res=await fetch(`http://localhost:5000/api/signup`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(values)
        })
    }
    return (
        <div>
            <Input placeholder="Name" onChange={(e)=>{setName(e.target.value)}}/>
            <Input placeholder="email" onChange={(e)=>{setEmail(e.target.value)}}/>
            <Button type="submit" onClick={Submit}>Submit</Button>

        </div>
    )
}