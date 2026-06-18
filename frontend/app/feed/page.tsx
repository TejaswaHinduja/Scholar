import { Button } from "@/components/ui/button";
import { FeedCard } from "@/components/ui/feed-posts";
import { ProfileCard } from "@/components/ui/profilecard";


export default function Feed(){

return <div className="flex gap-8 p-8">
    {/*leftside-profile view*/}
    <div className="w-80 my-15">
    <ProfileCard />
    </div>
    {/*main feed*/}
    <div>
        <FeedCard/>
    </div>

</div>

}