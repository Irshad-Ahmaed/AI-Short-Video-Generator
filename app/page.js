"use client";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";


export default function Home() {
  const { user } = useUser();
  return (
    <div>
      <h1 className="text-black">Welcome to my website</h1>
      {

        user ?
          <div className="flex gap-5 ml-0.5">
            <UserButton />
            <Link href={'/dashboard'}>
              <Button className="ml-1 scale-105 transition-all hover:bg-gray-600" size="sm">Dashboard</Button>
            </Link>
          </div>
          :
          <>
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
