import { Button } from "@/components/ui/button";
import { Feed } from "@/components/ui/feed";
import { ProfileCard } from "@/components/ui/profilecard";


export default function MainFeed() {
  return (
    <div className="grid grid-cols-2 gap-20 p-6">
      {/* left sidebar — fixed width */}
      <div className="mt-4 mx-4">
        <ProfileCard />
      </div>

      {/* main feed — grows to fill remaining space */}
      <div>
        <Feed />
      </div>

      {/* right panel — fixed width */}
      <div>
        {/* trending topics, who to follow */}
      </div>
    </div>
  )
}