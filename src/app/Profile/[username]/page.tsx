"use client";
import React from "react";
 import ProfileImage from "../components/ProfileImage";
 import Navbar from "../../components/Navbar";
 import Contribute from "../components/Contribute";
import AddTier from "../components/AddTier";
import Get from "../components/Get";
export default function page() {
  return (
    <div className="flex flex-col">
   <Navbar />
  <ProfileImage />
 <div className="mt-20 z-20">
  <Contribute/> 
   <AddTier/> 
  
  <Get/>
  </div>
 </div>

  );
}