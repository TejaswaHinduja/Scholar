import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type TopStory = {
  title: string
  username: string
  likes: number
}

const topStories: TopStory[] = [
  { title: "How I cracked my first coding interview", username: "Aditi Sharma", likes: 234 },
  { title: "5 tuition tips that actually work", username: "Rahul Verma", likes: 187 },
  { title: "My journey from tuition to teaching", username: "Priya Nair", likes: 156 },
  { title: "Why group study sessions changed everything", username: "Kabir Garg", likes: 98 },
]

export function TopStoriesCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Top Stories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {topStories.map((story, i) => (
            <div key={i} className="flex items-start justify-between gap-3">
              <div className="flex flex-col">
                <span className="text-sm font-medium">{story.title}</span>
                <span className="text-xs text-muted-foreground">{story.username}</span>
              </div>
              <Badge variant="secondary" className="shrink-0">
                {story.likes} likes
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

type Suggestion = {
  name: string
  school: string
}

const suggestions: Suggestion[] = [
  { name: "Meera Iyer", school: "Delhi Public School" },
  { name: "Arjun Rao", school: "St. Xavier's College" },
  { name: "Anupam Sharma", school: "Ryan International" },
]

export function WhoToFollowCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Who to Follow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {suggestions.map((person, i) => (
            <div key={i} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={`https://avatar.vercel.sh/${person.name.replace(/\s+/g, "").toLowerCase()}`}
                  alt={person.name}
                  className="h-9 w-9 rounded-full object-cover brightness-60 grayscale dark:brightness-40"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{person.name}</span>
                  <span className="text-xs text-muted-foreground">{person.school}</span>
                </div>
              </div>
              <Button size="sm">Follow</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
