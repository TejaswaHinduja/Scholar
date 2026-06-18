import { Badge } from "lucide-react";
import { Button } from "./button"
import { Input } from "./input";
import {Card,CardAction,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card"


export function FeedCard() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-lg">Share a Post</CardTitle>
        
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex">
            <div className="">
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
