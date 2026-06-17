import Image from "next/image";
import { Landing } from "./landing/page";
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Landing/>
    </div>
  );
}
