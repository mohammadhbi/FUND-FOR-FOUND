"use client"

import Image from "next/image"
import sentp from "../../../../../public/SentP.svg"
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function Sent() {
const searchParams =useSearchParams();
const email = searchParams.get("email")
  return (
   <Suspense fallback={<div>Loading...</div>}>
     <div>
   <Image src={sentp} alt="" width={267} height={199}/>   
   <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Check your email</h1>
      <p className="text-lg mt-2">We sent a link to: <span className="font-semibold">{email}</span></p>
      <Link href="https://mail.google.com">
      <button className="mt-4 bg-[var(--color-primary)] text-white px-4 py-2 rounded">Go to your Email</button>
      </Link>
    </div>
    </div>
   </Suspense>

  )
}

export default Sent

  