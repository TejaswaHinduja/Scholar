"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FeedPosts } from "@/components/ui/feed-posts"

type ProfileData = {
  name: string
  email: string
  profilepic: string | null
  bio: string | null
  school: string | null
  location: string | null
}

const myPosts = [
  { title: "How I cracked my first coding interview", content: "Practice, patience, and a lot of mock interviews.", username: "You" },
  { title: "Looking for a maths tuition partner", content: "Anyone up for weekend study sessions?", username: "You" },
]

export default function ProfilePage() {
  const [form, setForm] = useState<ProfileData | null>(null)
  const [editing, setEditing] = useState(false)

  async function getProfile() {
    const res = await fetch("http://localhost:5000/api/main/user", {
      method: "GET",
      credentials: "include",
      headers: { 'Content-Type': 'application/json' },
    })
    if (!res.ok) return
    const data = await res.json()
    setForm(data.usr)
  }

  useEffect(() => {
    getProfile()
  }, [])

  function handleChange(field: keyof ProfileData, value: string) {
    setForm((prev) => prev && { ...prev, [field]: value })
  }

  if (!form) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="w-full">
        <div className="flex grid-cols-2 h-140">
      <Card className="ml-30 my-3 w-full ">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-xl">My Profile</CardTitle>
          <Button variant="outline" onClick={() => setEditing(!editing)}>
            {editing ? "Save" : "Edit"}
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <img
            src={form.profilepic || `https://avatar.vercel.sh/${form.name}`}
            alt={form.name}
            className="h-20 w-20 rounded-full object-cover"
          />

          <div className="flex flex-col gap-1">
            <label className="text-sm text-muted-foreground">Name</label>
            <Input value={form.name} disabled={!editing} onChange={(e) => handleChange("name", e.target.value)} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-muted-foreground">Email</label>
            <Input value={form.email} disabled={!editing} onChange={(e) => handleChange("email", e.target.value)} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-muted-foreground">Bio</label>
            <Input value={form.bio ?? ""} disabled={!editing} onChange={(e) => handleChange("bio", e.target.value)} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-muted-foreground">School</label>
            <Input value={form.school ?? ""} disabled={!editing} onChange={(e) => handleChange("school", e.target.value)} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-muted-foreground">Location</label>
            <Input value={form.location ?? ""} disabled={!editing} onChange={(e) => handleChange("location", e.target.value)} />
          </div>
        </CardContent>
      </Card>
      <Card className="w-full ml-3">
        <CardContent>
            Followers
            Post Impressions
        </CardContent>
      </Card>
    </div>
      <div>
        <h2 className="text-lg font-medium mb-2">My Posts</h2>
        {myPosts.map((post, i) => (
          <FeedPosts key={i} title={post.title} content={post.content} username={post.username} />
        ))}
      </div>
    </div>
  )
}
