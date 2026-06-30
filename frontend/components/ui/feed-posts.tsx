"use client"
import { Badge } from "lucide-react";
import { Button } from "./button"
import { Input } from "./input";
import {Card,CardAction,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card"
import { useEffect, useState } from "react";
export function FeedPosts(){
    const[name,setName]=useState('')
    const[content,setContent]=useState('')
    const[title,setTitle]=useState()
    const[posts,setPosts]=useState()
    async function getPosts(){
          const res=await fetch("http://localhost:5000/api/main/posts",{
            method:"GET",
            headers:{'Content-Type':'application.json'},
          })
          if(!res){
          }
          const data=await res.json()
          setContent(data.content)
          setTitle(data.title)
    }
    useEffect(()=>{
      getPosts()
    },[])
    return <div>
            <Card className="w-full max-w-sm my-3">
            <div className="flex" >
                        <img
                        src="https://avatar.vercel.sh/shadcn1"
                        alt="Event cover"
                        className="relative aspect-round rounded-full h-10 w-10 ml-6 my-3 object-cover brightness-60 grayscale dark:brightness-40 "
                        />
      <CardHeader>
        <CardTitle >Profile Name</CardTitle>
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
export function FeedCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg ">Share a Post</CardTitle>
        
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex">
            <div className="w-full">
              <Input
                id="email"
                type="text"
                placeholder="What's happening ?"
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
