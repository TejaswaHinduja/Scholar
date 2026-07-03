"use client"
import { Badge } from "lucide-react";
import { Button } from "./button"
import { Input } from "./input";
import {Card,CardAction,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card"
import { FeedCard } from "./feed-posts";
import { FeedPosts } from "./feed-posts";

type Post={
    title:string,
    content:string,
    user:{
        name?:string
    }
}
type FeedProps={
    posts:Post[]
}
export function Feed({posts}:FeedProps){

    return <div >
        <div className="">
        <FeedCard/>
        <div>
            {posts.map((post,i)=>(
                <FeedPosts key={i} 
                title={post.title}
                content={post.content}
                username={post.user.name ?? "Unknown user"}
                />
            ))}
        
        </div>
        </div>
    </div>
}