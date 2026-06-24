"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {useParams,useRouter} from "next/navigation"
import { useState } from "react";
import {useForm,Controller} from "react-hook-form"

export default function AuthPage(){
    type formvalue={
        name:string,
        email:string,
        password:string
    }
    const {typeAuth}=useParams()
    const form=useForm<formvalue>({
        
    })
    const {register,handleSubmit,formState:{errors},control}=form
    
    const Submit=async(values:formvalue)=>{
        {/*const res=await fetch(`http://localhost:5000/api/signup`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(values)
        })
        console.log(res) */}
        console.log(values)
    }
    return (
        <div>
            <form className="flex flex-col w-full justify-center items-center"onSubmit={handleSubmit(Submit)}>
            <div className="max-w-3xl my-4 gap-4">
            <Input {...register("name")}placeholder="Name" />
            <Input className="my-4" {...register("email")}placeholder="email" />
            <Button className="align-center items-center"type="submit">Submit</Button>
            </div>
            </form>
            
        </div>
    )
}