import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";


export default function Home() {
  return (
    <div>
      <h1 className="text-black">Welcome to my website</h1>
      <Button className="ml-1" size="sm">Subscribe</Button>
      <UserButton/>
    </div>
  );
}
