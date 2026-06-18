import { Badge } from "lucide-react";
import { Button } from "./button"
import { Input } from "./input";
import {Card,CardAction,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card"
import { FeedCard } from "./feed-posts";
import { FeedPosts } from "./feed-posts";
export function Feed(){

    return <div >
        <div className="">
        <FeedCard/>
        <div>
        <FeedPosts/><FeedPosts/><FeedPosts/><FeedPosts/><FeedPosts/><FeedPosts/>
        </div>
        </div>
    </div>
}