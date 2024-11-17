"use client";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LandingPage from "./dashboard/_components/LandingPage";


export default function Home() {
  const { user } = useUser();
  const router = useRouter();
  return (
    <div>
      <h1 className="text-black">Welcome to my website</h1>
      {

        user ?
        router.replace('/dashboard')
          :
          <>
            <LandingPage />
            <Link href={'/sign-in'}>
              <Button className="ml-1 scale-105 transition-all hover:bg-gray-600" size="sm">Login</Button>
            </Link>

            <Link href={'/sign-up'}>
              <Button className="ml-1 scale-105 transition-all hover:bg-gray-600" size="sm">SignUp</Button>
            </Link>
          </>

      }

    </div>
  );
}
