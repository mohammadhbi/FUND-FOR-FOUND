"use client";
import Image from "next/image";
import Explore from "../../../../../public/Explore.png";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useState } from "react";
// import CatSub from "./CatSub";

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleClear = () => {
    setSearchValue("");
  };
  return (
    <div className="w-[90%] mx-auto">
      <div className="relative w-full h-auto">
        <Image
          className="w-full h-auto object-cover"
          src={Explore}
          alt="wallpaper"
          width={500}
          height={300}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-3/4 max-w-md bg-white rounded shadow-md overflow-hidden">
            <FaSearch className="absolute left-3 text-gray-400 text-lg mt-2.5" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search"
              className="w-full pl-10 pr-10 py-2 text-gray-700 focus:outline-none rounded-full"
            />
            {searchValue && (
              <FaTimes
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg cursor-pointer hover:text-gray-600 z-30"
                onClick={handleClear}
              />
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}
