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
          <UserButton />
          :
          <>
            <Link href={'/sign-in'}>
              <Button className="ml-1" size="sm">Login</Button>
            </Link>

            <Link href={'/sign-up'}>
              <Button className="ml-1" size="sm">SignUp</Button>
            </Link>
          </>

      }

    </div>
  );
}
