"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FeedPosts } from "@/components/ui/feed-posts"
import { ImageUpload } from "@/lib/upload"
import { useForm } from "react-hook-form"

type ProfileData = {
  name: string
  email: string
  profilepic: string | null
  bio: string | null
  school: string | null
  location: string | null
}

const fields = [
  { name: "name", label: "Name" },
  { name: "email", label: "Email" },
  { name: "bio", label: "Bio" },
  { name: "school", label: "School" },
  { name: "location", label: "Location" },
] as const

const myPosts = [
  { title: "How I cracked my first coding interview", content: "Practice, patience, and a lot of mock interviews.", username: "You" },
  { title: "Looking for a maths tuition partner", content: "Anyone up for weekend study sessions?", username: "You" },
]

export default function ProfilePage() {
  const { register, handleSubmit, reset, setValue, watch } = useForm<ProfileData>()
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(true)

  const name = watch("name")
  const profilepic = watch("profilepic")

  useEffect(() => {
    async function getProfile() {
      const res = await fetch("http://localhost:5000/api/main/user", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      })
      if (!res.ok) return
      const data = await res.json()
      reset(data.usr)
      setLoading(false)
    }
    getProfile()
  }, [reset])

  async function onSubmit(values: ProfileData) {
    const res = await fetch("http://localhost:5000/api/main/user", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
    if (!res.ok) return
    const data = await res.json()
    reset(data.usr)
    setEditing(false)
  }

  if (loading) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="w-full">
      <div className="flex grid-cols-2 h-140">
        <Card className="ml-30 my-3 w-full ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-xl">My Profile</CardTitle>
              {editing ? (
                <Button type="submit">Save</Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault()
                    setEditing(true)
                  }}
                >
                  Edit
                </Button>
              )}
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <img
                src={profilepic || `https://avatar.vercel.sh/${name}`}
                alt={name}
                className="h-20 w-20 rounded-full object-cover"
              />
              {editing && (
                <ImageUpload onUploadSuccess={(url) => setValue("profilepic", url)} />
              )}

              {fields.map((field) => (
                <div key={field.name} className="flex flex-col gap-1">
                  <label className="text-sm text-muted-foreground">{field.label}</label>
                  <Input disabled={!editing} {...register(field.name)} />
                </div>
              ))}
            </CardContent>
          </form>
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
