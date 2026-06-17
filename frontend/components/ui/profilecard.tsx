  import { Badge } from "@/components/ui/badge"
  import { Button } from "@/components/ui/button"
  import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  export function ProfileCard() {
    return (
      <Card className="relative  w-full max-w-sm pt-0 ">
        <div className="absolute aspect-round " />
        <img
          src="https://avatar.vercel.sh/shadcn1"
          alt="Event cover"
          className="relative aspect-round rounded-full h-16 w-16 mx-8 my-3 object-cover brightness-60 grayscale dark:brightness-40 "
        />
        <CardHeader>
          <CardAction>
            <Badge variant="secondary">Tag</Badge>
          </CardAction>
          <CardTitle>Name</CardTitle>
          <CardDescription>
            School Name, Bio ,
            Achievements
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className="w-full">View Profile</Button>
        </CardFooter>
      </Card>
    )
  }
