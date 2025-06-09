"use client";
import { useState } from "react";
import Image from "next/image";


export default function ProfileAvatar() {
  // const [title,setTitle]=useState()
 // const title = localStorage.getItem("username");
 
  const [image, setImage] = useState<string | null>(null);
 

  return (
    <div className="relative px-2.5 py-1 bg-[var(--color-primary)] rounded flex items-center justify-center">
      {image ? (
        <Image src={image} width={55} height={55} alt="Profile Image" />
      ) : (
         <span className="opacity-25 text-4xl">m</span>
      )}
    </div>
  );
}
