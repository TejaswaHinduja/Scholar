"use client"
import { Button } from "@/components/ui/button";
import { Feed } from "@/components/ui/feed";
import { ProfileCard } from "@/components/ui/profilecard";
import { useState,useEffect } from "react";


export default function MainFeed() {
  
const[profile,setProfile]=useState([])
const[posts,setPosts]=useState([])
    async function getPosts(){
          const res=await fetch("http://localhost:5000/api/main/posts",{
            method:"GET",
            headers:{'Content-Type':'application/json'},
          })
          if(!res){
          }
          const data=await res.json()
          setPosts(data)
    }
    useEffect(()=>{
      getPosts()
    },[])
  

  return (
    <div className="grid grid-cols-3 gap-20 p-6">
      {/* left sidebar — fixed width */}
      <div className="mt-4 mx-4">
        <ProfileCard />
      </div>

      {/* main feed — grows to fill remaining space */}
      <div>
        
        <Feed posts={posts}/>
      </div>

      {/* right panel — fixed width */}
      <div>
        {/* trending topics, who to follow */}
      </div>
    </div>
  )
}