"use client";
import { useCallback, useRef, useState } from "react";
import Image from "next/image";


export default function ProfileAvatar() {
  const title = localStorage.getItem("username");
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  
  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file && file.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(file);
      setImage(objectUrl);
    }
  };
  


  return (
    <div className="relative px-2.5 py-1 bg-[var(--color-primary)] rounded flex items-center justify-center">
      {image ? (
        <Image src={image} width={55} height={55} alt="Profile Image" />
      ) : (
         <span className="opacity-25 text-4xl">{title.charAt(0)}</span>
      )}

      <button
        onClick={handleClick}
        className="absolute text-xs bg-[var(--color-primary-100)] opacity-80 text-white rounded px-1 py-0.5"
      >
        Edit
      </button>

      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
