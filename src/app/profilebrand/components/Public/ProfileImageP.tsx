"use client";

import Image from "next/image";
import defaultProfile from "../../../../../public/defaultProfile.png";
import {  useState, useEffect } from "react";
import ProfileAvatarP from "../Public/ProfileAvatarP";
import Get from "./GetP";
export default function ProfileImage() {
  
  //const [imageSrc, setImageSrc] = useState<string | null>(null);
 const [title,setTitle]=useState<string | null>(null);
  useEffect(() => {
      const NameAvatar = localStorage.getItem("username");
setTitle(NameAvatar);
    
  //console.log(setImageSrc);   
  
  }, []);



  return (
    <div>
     
      <div className="relative w-[90%] h-[200px] object-cover mx-auto mt-6">
        <Image
          src={defaultProfile}
          alt="Profile"
          fill
          className="object-cover rounded"
        />
        <p className="text-white absolute bottom-0.5 right-4">
          0.00 $ Total count
        </p>
        <div className="absolute bottom-[-20px] left-6 z-10 flex flex-col items-center translate-y-1/2 text-white">
          <ProfileAvatarP/>

          <p className="text-xs mt-1 text-black">{title}</p>
         
        </div>
        <div className="absolute z-50 bottom-[-5px] left-25 ">
          <Get/>
        </div>
      </div>
    </div>
  );
}
