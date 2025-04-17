"use client";

import Image from "next/image";
import sentp from "../../../../../public/SentP.svg";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import Navbar from "@/app/components/Navbar";

function Sent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  return (
    <Suspense fallback={<div>Loading...</div>}>
     <>
     <Navbar/>
      <div className="flex flex-col justify-center items-center">
        <Image src={sentp} alt="" width={267} height={199} />
        <p className="text-3xl text-[var(--color-primary)]">
          Your link is being sent.Hang thight!
        </p>
        <p className="text-[var(--color-light-1)] mt-2">
          Weve sent the link to <span className="font-semibold text-[var(--color-black)]">{email}</span>
        </p>
        <Link href="https://mail.google.com">
          <button className="mt-4 text-[var(--color-primary)]  px-4 py-2 rounded">
            Go to your Email
          </button>
        </Link>
        <p className="text-[var(--color-light-1)] pt-16">You will be redirected from the link in the email,you can safetly close the tab.</p>
      </div>
     </>
    </Suspense>
  );
}

export default Sent;
