"use client"

import { db } from "@/configs/db";
import { Users } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Provider = ({ children }) => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    user && isNewUser();
  }, [user]);

  const isNewUser = async() => {
    const result = await db.select().from(Users)
      .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));
    
    console.log(result);
    
    // router.replace('/dashboard')
    if(!result[0]){
      await db.insert(Users).values({
        name:user.fullName,
        email:user?.primaryEmailAddress?.emailAddress,
        imageUrl: user?.imageUrl
      });
    }
  };

  return <div>{children}</div>;
};

export default Provider;
