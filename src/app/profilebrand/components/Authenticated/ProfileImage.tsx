"use client";

import Image from "next/image";
import defaultProfile from "../../../../../public/defaultProfile.png";
import { useCallback, useRef, useState, useEffect } from "react";
import ProfileAvatar from "../Authenticated/ProfileAvatar";
import Get from "../Authenticated/Get";
import imageCompression from 'browser-image-compression';

export default function ProfileImage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
const [title,setTitle]=useState<string | null>(null);
  useEffect(() => {
      const NameAvatar = localStorage.getItem("username");
setTitle(NameAvatar);
      setIsClient(true);
      // const brandId = localStorage.getItem("brandId");
      

      
  }, []);


  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

const compressImage = async (file : File): Promise<File> =>{
  const options = {
    maxSizeMb : 1,
    useWebWorker : true,
  };
  try {
    const compressedFile = await imageCompression(file,options);
     console.log("before:", (file.size / 1024 / 1024).toFixed(2), "MB");
    console.log("after:", (compressedFile.size / 1024 / 1024).toFixed(2), "MB");
    return compressedFile;
  } catch (error) {
   console.error("missed compressing",error);
   throw error; 
  }
}

const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};


  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // if (file && file.type.startsWith("image/")) {
    //   const objectUrl = URL.createObjectURL(file);
    //   setImageSrc(objectUrl);
    // }
    try {
      const compressedFile = await compressImage(file );
      const base64 = await convertToBase64(compressedFile);
      setImageSrc(base64);
      // console.log(base64);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
     
      <div className="relative w-[90%] h-[200px] object-cover mx-auto mt-6">
        <Image
          src={imageSrc || defaultProfile}
          alt="Profile"
          fill
          className="object-cover rounded"
        />

        <button
          onClick={handleClick}
          className="absolute top-2 right-4 bg-[var(--color-primary-75)] text-[var(--color-primary)] px-4 py-1 rounded text-sm flex  justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
          Edit
        </button>
        <p className="text-white absolute bottom-0.5 right-4">
          0.00 $ Total count
        </p>
        <div className="absolute bottom-[-30px] left-6 z-10 flex flex-col items-center translate-y-1/2 text-white">
          <ProfileAvatar/>

          <p className="text-xs mt-1 text-black">{title}</p>
         
        </div>
        <div className="absolute z-50 bottom-[-5px] left-30 ">
          <Get/>
        </div>
      </div>

      {isClient && (
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      )}
    </div>
  );
}
