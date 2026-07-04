"use client"
import { Badge } from "lucide-react";
import { Button } from "./button"
import { Input } from "./input";
import {Card,CardAction,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card"
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form'

type feedPosts={
  title:string,
  content:string,
  username:string
  
}
export function FeedPosts({title,content,username}:feedPosts){
    
    return <div>
            <Card className="w-full my-3">
            <div className="flex" >
                        <img
                        src="https://avatar.vercel.sh/shadcn1"
                        alt="Event cover"
                        className="relative aspect-round rounded-full h-10 w-10 ml-6 my-3 object-cover brightness-60 grayscale dark:brightness-40 "
                        />
      <CardHeader>
        <CardTitle >{username}</CardTitle>
        <CardDescription>
          {title}
        </CardDescription>
      </CardHeader>
      </div>
      <CardContent>
    
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              {content}
            </div>
         </div>
      
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>
            Like
        </Button>
        <Button>
            Comment
        </Button>
        <Button>
            Share
        </Button>
         
      </CardFooter>
    </Card>
    </div>
}
type FormValues={
  title:string,
  content:string
}
export function FeedCard() {
  const form=useForm<FormValues>()
  const { register, handleSubmit, formState: { errors } } = form
  async function createPost(formdata:FormValues){
    const res=await fetch("http://localhost:5000/api/main/createpost",{
      method:"POST",
      credentials:"include",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(formdata)
    })
    if(!res.ok){
      throw new Error("Failed to create post")
    }

  }
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg ">Share a Post</CardTitle>
        
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(createPost)}>
          <div className="flex">
            <div className="w-full max-w-sm">
              <Input 
              id="title"
              {...register("title",{required:"Input is required"})}
              placeholder="Title"
              />
              <Input
                id="content"
                {...register("content",{required:"content is required"})}
                type="text"
                placeholder="What's happening ?"
              />
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
