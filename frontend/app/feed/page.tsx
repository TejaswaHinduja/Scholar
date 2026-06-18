import { Button } from "@/components/ui/button";
import { Feed } from "@/components/ui/feed";
import { ProfileCard } from "@/components/ui/profilecard";


export default function MainFeed(){

return <div className="flex gap-8 p-8">
    {/*leftside-profile view*/}
    <div className="w-80 my-15">
    <ProfileCard />
    </div>
    {/*main feed*/}
    <div className="w-80">
        <Feed/>
    </div>

</div>

}